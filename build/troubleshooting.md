# Troubleshooting

**Who this is for:** Developers and integrators debugging quote/swap failures, SDK or RPC issues, deployment/verification problems, or rebalancing with Mento V3. For **end-user** issues (getting stables, swap failed in app), see [User troubleshooting](../other/troubleshooting.md).

---

## Quick reference: why did my swap or quote revert?

The pool (and Router) can revert for these reasons. Check your revert message or transaction trace first:

| Revert / cause | Meaning | What to do |
|----------------|---------|------------|
| **ReserveValueDecreased** | Swap would decrease pool value at oracle after fees (value-protection check failed). | Usually means quote was stale or fee/rate changed; re-quote and retry with a fresh amount. |
| **TradingSuspended** | Circuit breaker has tripped for this feed; trading is halted. | Wait until breakers are reset; check [BreakerBox](smart-contracts/breakerbox.md) / OracleAdapter for the feed’s trading mode. |
| **NoRecentRate** | Oracle report is older than the configured expiry (stale). | Wait for a new oracle update or check SortedOracles / Chainlink relay for the feed. |
| **FXMarketClosed** | FX market-hours breaker says the market is closed for this feed. | Trade during configured market hours, or use a pool that does not gate on market hours. |
| **TradingLimitsV2** (limit exceeded) | Net flow for a token in the 5-minute or 1-day window would exceed the pool’s limit. | Use a smaller amount, wait for the rolling window to expire, or try again later. |
| **Insufficient liquidity** (Router) | Router/pool has no liquidity for the requested output. | Check pool reserves and that the pool exists for the pair. |
| **Expired** (Router) | Transaction submitted after the deadline passed. | Increase `deadline` (e.g. `block.timestamp + 300`) and resubmit. |
| **Insufficient output** (Router) | Output was less than `amountOutMin` (slippage). | Re-quote and raise `amountOutMin` slightly or accept a lower minimum. |

---

## Swap and quote

### Swap reverted: value protection, limits, or oracle

Every swap is checked in this order:

1. **Oracle rate** — The pool calls `oracleAdapter.getFXRateIfValid(referenceRateFeedID)`. If the adapter reverts, the swap reverts with `TradingSuspended`, `NoRecentRate`, or `FXMarketClosed`. So: ensure the feed is recent, trading is allowed, and (if applicable) FX market is open.
2. **Value protection** — After the swap, the pool’s reserve value at the oracle must not decrease (after crediting fees). If it would, the pool reverts with `ReserveValueDecreased`. This can happen if the quote was computed with an older rate or different fee.
3. **TradingLimitsV2** — After the swap, per-token net flow in the 5-minute and 1-day windows must stay within the pool’s configured limits. If a limit would be exceeded, the swap reverts.

**Practical steps:** Re-fetch a quote immediately before sending the transaction. Use the same pool and rate feed the pool uses. If the revert is `ReserveValueDecreased`, your executed rate/fee differed from the one used for the quote. If the revert is from TradingLimitsV2, reduce size or wait. See [TradingLimitsV2](smart-contracts/tradinglimits.md) and [BreakerBox](smart-contracts/breakerbox.md).

### Quote doesn’t match execution

Quotes are valid only at the current block’s oracle rate and fee. If the user sends the tx later, the rate may have changed or the oracle may have become invalid. **Always re-fetch the quote** right before building the transaction, and use a small slippage tolerance (e.g. `amountOutMin = quote * 99 / 100`) if needed.

### getAmountOut or Router getAmountsOut fails

- **Invalid pair or pool:** Ensure the pool exists for the token pair (use [FPMMFactory](smart-contracts/fpmmfactory.md) `getPool(token0, token1)` or Router `poolFor`). Tokens must be sorted by address (`token0` < `token1`).
- **Oracle invalid:** `getAmountOut` calls the same `getFXRateIfValid` as the swap. If the oracle is suspended, stale, or market closed, the call reverts. Use `adapter.getRate(rateFeedID)` (no revert) to inspect `tradingMode`, `isRecent`, and `isFXMarketOpen` before quoting.
- **Wrong rate feed ID:** The pool’s `referenceRateFeedID` must match a feed that the OracleAdapter and BreakerBox know. Check [OracleAdapter](smart-contracts/oracleadapter.md) and [Addresses](deployments/addresses.md) for the correct adapter and feed setup per chain.

---

## Router vs direct pool calls

- **Router:** Use the Router for **exact-input** swaps and for **mint/burn** so it handles transfers and pool calls. Approve the Router for the input token(s). The Router reverts if the pool reverts (oracle, limits, value protection) or if output &lt; `amountOutMin` or `deadline` has passed.
- **Direct pool:** The pool’s `swap(amount0Out, amount1Out, to, data)` is **output-specified** and requires the caller to supply the input tokens (e.g. via `IFPMMCallee` hook). Prefer the Router for simple flows. See [FPMM](smart-contracts/fpmm.md) and [Router](smart-contracts/router.md).

---

## Mint and burn (liquidity)

| Symptom | Cause | Fix |
|---------|--------|-----|
| Mint reverted | Wrong ratio or approval | You must transfer **both** tokens to the pool in the **current reserve ratio**. Use `pool.quoteMint(amount0, amount1)` or Router `quoteAddLiquidity` to get the required amounts. Approve the pool (or Router) for both tokens. |
| Burn reverted | Wrong LP amount or approval | Transfer the **LP tokens** to the pool first, then call `burn(to)`. Approve the pool (or Router) for the LP tokens. Ensure you are not burning more than the pool’s total supply. |
| “Insufficient liquidity” on mint | First mint must meet minimum | The first mint uses `sqrt(amount0*amount1) - MINIMUM_LIQUIDITY`; ensure amounts are large enough. |

See [FPMM — Mint and burn](smart-contracts/fpmm.md#mint-and-burn) and [Router](smart-contracts/router.md) for exact signatures.

---

## Rebalancing (keepers / strategies)

If you are calling `rebalance` on a pool or a liquidity strategy:

| Revert | Meaning | Fix |
|--------|--------|-----|
| **NotLiquidityStrategy** | Caller is not allowlisted on the pool. | Only addresses set via `setLiquidityStrategy(addr, true)` can call `rebalance`. |
| **PriceDifferenceTooSmall** | Reserve price deviation from oracle is below the pool’s threshold. | Check `getRebalancingState()`; only rebalance when `priceDifference >= rebalanceThreshold`. |
| **PriceDifferenceNotImproved** / **PriceDifferenceMovedInWrongDirection** / **PriceDifferenceMovedTooFarFromThresholds** | Rebalance did not meet post-rebalance checks (direction preserved, no overshoot). | Strategy must return the other token in the right amount so the new deviation is still ≥ threshold and in the same direction. |
| **InsufficientAmount0In** / **InsufficientAmount1In** | Strategy did not send back enough of the other token (minimum repayment / incentive cap). | Strategy must return at least the minimum required by the pool’s rebalance incentive cap. |

Use `pool.getRebalancingState()` to decide if and how much to rebalance. See [Liquidity strategies](smart-contracts/liquidity-strategies.md) and [FPMM — Rebalance](smart-contracts/fpmm.md#rebalance).

---

## Oracle and circuit breakers

- **TradingSuspended:** The BreakerBox has set the feed’s trading mode to suspended (e.g. MedianDeltaBreaker or ValueDeltaBreaker tripped). No swaps or quotes using that feed succeed until the breaker is reset and the cooldown has passed.
- **NoRecentRate:** The median report timestamp for the rate feed is older than `reportExpiry`. Relayers must submit a fresh price; check SortedOracles or the Chainlink relayer for that feed.
- **FXMarketClosed:** The pool uses `getFXRateIfValid`, which checks FX market hours. Use a feed without market-hours gating or wait until the market is open.

To **inspect** without reverting: call `oracleAdapter.getRate(rateFeedID)` and check `tradingMode`, `isRecent`, `isFXMarketOpen`. See [OracleAdapter](smart-contracts/oracleadapter.md) and [BreakerBox](smart-contracts/breakerbox.md).

---

## SDK and integration

| Symptom | Cause | Fix |
|---------|--------|-----|
| SDK returns wrong network or pairs | Using V2 Broker instead of V3 FPMM | V3 uses **FPMM pools** and the Router for quotes and swaps, not the legacy Broker. Point the SDK at the V3 factory, Router, and pool addresses; see [Mento SDK](mento-sdk/README.md) and [Deployments](deployments/addresses.md). |
| Wrong or stale quote | Caching or wrong pool | Ensure you are querying the correct pool for the token pair and re-fetch quotes before sending a transaction. |
| RPC or provider errors | Wrong RPC URL or chain | Use a supported chain (e.g. Celo, Monad) and a valid RPC endpoint. See [Deployments](deployments/README.md) and [Addresses](deployments/addresses.md). |

---

## Contracts and deployments

| Symptom | Cause | Fix |
|---------|--------|-----|
| Wrong pool or router address | Outdated or wrong chain | Use [Deployments → Addresses](deployments/addresses.md) for the chain you are on; verify factory, Router, and pool on a block explorer. |
| Pool not found for pair | Pool not deployed or wrong token order | Factory returns `getPool(token0, token1)` with tokens sorted by address. Ensure the pool is deployed for that pair on the correct factory. |
| Verification failed on explorer | Source or constructor args | Follow [Verification](deployments/verification.md) for the correct compiler settings and constructor arguments. |

---

## More

- [Integration](integration/README.md) — How to integrate stables and oracles.
- [Smart contracts](smart-contracts/README.md) — FPMM, Router, OracleAdapter, TradingLimitsV2, BreakerBox.
- [Deployments](deployments/README.md) — Addresses, verification, parameters.
- [User troubleshooting](../other/troubleshooting.md) — End-user issues (getting stables, swap in app, CDP).
