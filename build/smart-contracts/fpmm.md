# FPMM (Fixed-Price Market Maker)

The **FPMM** contract is the core pool of Mento V3. Each instance holds two ERC-20 tokens (reserves), executes swaps at the **oracle rate** (minus fees), and allows **rebalancing** only by allowlisted liquidity strategies when the reserve-implied price deviates from the oracle by at least a configured threshold.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/swap/FPMM.sol`

---

## Invariants (design)

The contract enforces:

1. **Swap** does not decrease the total value of the pool (value at oracle, after crediting fees).
2. **Rebalance** reduces the price difference and keeps the same direction (above oracle stays above, below stays below).
3. **Rebalance** keeps the post-rebalance price difference at or above the configured threshold (no overshoot past the band).
4. **Rebalance** does not decrease reserve value more than the rebalance incentive (minimum repayment / incentive cap).

---

## State (FPMMStorage)

| Field | Meaning |
|-------|--------|
| `token0`, `token1` | Pool tokens, ordered by address (token0 &lt; token1). |
| `decimals0`, `decimals1` | Scaling: `10^decimals` for each token (capped at 18). |
| `reserve0`, `reserve1` | Last known reserve balances (updated after swap/mint/burn/rebalance). |
| `oracleAdapter` | Contract used for the oracle rate; pool calls `getFXRateIfValid(referenceRateFeedID)`. |
| `referenceRateFeedID` | Rate feed ID passed to the oracle adapter (e.g. address derived from pair identifier). |
| `invertRateFeed` | If true, the adapter rate is inverted (denominator/numerator) for quoting. |
| `lpFee`, `protocolFee` | Swap fees in basis points (BPS, denominator 10,000). Combined max 200 (2%). |
| `protocolFeeRecipient` | Receives protocol fee. |
| `feeSetter` | Address (with owner) allowed to set fees. |
| `rebalanceIncentive` | Max incentive in BPS (max 100 = 1%) for rebalance; enforces minimum token-in. |
| `rebalanceThresholdAbove`, `rebalanceThresholdBelow` | Min price difference (BPS) to allow rebalance when reserve price &gt; oracle or &lt; oracle. Above max 10,000 bps; below max 5,000 bps. |
| `liquidityStrategy[addr]` | If true, `addr` may call `rebalance`. |
| `tradingLimits[token]` | Per-token TradingLimitsV2 config and state (5-min and 1-day net-flow caps). |

---

## Initialization

`initialize(token0, token1, oracleAdapter, referenceRateFeedID, invertRateFeed, initialOwner, params)` sets tokens, oracle adapter, rate feed ID, invert flag, owner, and `FPMMParams` (fees, fee recipient, fee setter, rebalance incentive, rebalance thresholds). Tokens are **not** re-sorted in `initialize`; the factory passes them already sorted. Token decimals must be ≤ 18.

---

## Oracle rate

The pool uses **oracle rate** for all swap quotes and value checks. It does **not** use a reserve-based curve.

- **Source:** `_getRateFeed()` calls `oracleAdapter.getFXRateIfValid(referenceRateFeedID)`. If the adapter reverts (e.g. `FXMarketClosed`, `TradingSuspended`, `NoRecentRate`), the pool reverts.
- **Invert:** If `invertRateFeed` is true, the rate is swapped to (denominator, numerator) so that the pool’s quote direction matches the intended token pair (e.g. token1/token0).

---

## Swap

- **Quote:** `getAmountOut(amountIn, tokenIn)` returns the amount of the other token at the **oracle rate** minus combined fee:  
  `rate × amountIn × (BPS - lpFee - protocolFee) / BPS`, with decimal scaling.  
  Reverts if the adapter’s `getFXRateIfValid` fails.

- **Execution:** `swap(amount0Out, amount1Out, to, data)` is **output-specified**: exactly one of `amount0Out` or `amount1Out` must be &gt; 0. The pool transfers the output to `to`, then, if `data.length > 0`, calls `IFPMMCallee(to).hook(...)` so the caller can supply the input tokens. The pool infers `amount0In` and `amount1In` from balance deltas.

- **Checks:**  
  1. **Value protection:** `_swapCheck`: reserve value at oracle (in token1, 1e18-scaled) after the swap must be ≥ initial value + fee value; otherwise `ReserveValueDecreased`.  
  2. **TradingLimitsV2:** After the swap, `_applyTradingLimits` is called for each token (fee is deducted from inflow before net flow). If a limit is exceeded, the swap reverts.

- **Fees:** Protocol fee is transferred to `protocolFeeRecipient`; LP fee remains in the pool (increases reserve value). Reserves are synced with `_update()`.

---

## Mint and burn

- **Mint:** `mint(to)` — Caller must have transferred token0 and token1 to the pool in the **current reserve ratio**. Liquidity is computed: first mint `sqrt(amount0*amount1) - MINIMUM_LIQUIDITY` (with `MINIMUM_LIQUIDITY` locked at `address(1)`); subsequent mints proportional to reserves. Shares are minted to `to`.

- **Burn:** `burn(to)` — Caller must have transferred LP tokens to the pool. Burn is pro-rata: amounts out = (liquidity / totalSupply) × reserves; tokens sent to `to`, reserves updated.

---

## Rebalance

- **Entrypoint:** `rebalance(amount0Out, amount1Out, data)`. Only callable by an address with `liquidityStrategy[msg.sender] == true`.

- **Preconditions:**  
  - Exactly one of `amount0Out`, `amount1Out` &gt; 0.  
  - Reserve price deviation from oracle ≥ threshold (above or below depending on direction).  
  - Pool has sufficient liquidity for the requested output.

- **Flow:**  
  1. Pool transfers the requested token(s) to `msg.sender` (the strategy).  
  2. Pool calls `ILiquidityStrategy(msg.sender).onRebalance(msg.sender, amount0Out, amount1Out, data)`.  
  3. Strategy must send back the **other** token (and optionally keep an incentive within the cap).  
  4. Pool infers `amount0In`, `amount1In` from balance deltas.  
  5. `_rebalanceCheck(swapData)` enforces: price difference **improves**, **direction preserved**, no overshoot (new difference ≥ threshold), and minimum repayment (incentive cap).

- **Rebalancing state:** `getRebalancingState()` returns oracle price, reserve price, whether reserve price is above oracle, the applicable threshold, and current price difference in BPS. Off-chain or strategy logic can use this to decide rebalance size.

---

## TradingLimitsV2

- **Config:** `configureTradingLimit(token, config)` (owner) sets the TradingLimitsV2 config for that token (e.g. 5-min and 1-day limits).  
- **Application:** After every swap, `_applyTradingLimits(token0, ...)` and `_applyTradingLimits(token1, ...)` update state and revert if a limit is exceeded. Fee is deducted from inflow before net flow.  
- **View:** `getTradingLimits(token)` returns config and state for the token.

---

## Admin

| Function | Restriction | Effect |
|----------|-------------|--------|
| `setLPFee`, `setProtocolFee` | `onlyFeeSetter` | Combined with the other fee ≤ 200 bps. |
| `setProtocolFeeRecipient` | owner | |
| `setFeeSetter` | owner | |
| `setRebalanceIncentive` | `onlyFeeSetter` | Max 100 bps. |
| `setRebalanceThresholds(above, below)` | owner | Above ≤ 10,000 bps; below ≤ 5,000 bps. |
| `setOracleAdapter`, `setReferenceRateFeedID`, `setInvertRateFeed` | owner | |
| `setLiquidityStrategy(addr, allowed)` | owner | Allowlist for `rebalance`. |
| `configureTradingLimit(token, config)` | owner | TradingLimitsV2 per token. |

---

## Key errors

- `ReserveValueDecreased` — Swap would decrease pool value at oracle after fees.  
- `NotLiquidityStrategy` — Caller of `rebalance` not allowlisted.  
- `PriceDifferenceTooSmall` — Rebalance called but deviation below threshold.  
- `PriceDifferenceNotImproved`, `PriceDifferenceMovedInWrongDirection`, `PriceDifferenceMovedTooFarFromThresholds` — Rebalance acceptance failed.  
- `InsufficientAmount0In` / `InsufficientAmount1In` — Strategy did not return enough of the other token (incentive cap).  
- `TradingSuspended`, `NoRecentRate`, `FXMarketClosed` — From oracle adapter when rate is invalid.

---

## See also

- [FPMMFactory](fpmmfactory.md) — Deployment and default params.  
- [OracleAdapter](oracleadapter.md) — How the pool gets the rate.  
- [TradingLimitsV2](tradinglimits.md) — Net-flow caps.  
- [Liquidity strategies](liquidity-strategies.md) — Who can call rebalance and how.  
- [Dive Deeper: FPMMs](../../dive-deeper/fpmm/README.md) — Design and invariant.
