# Liquidity strategies

In Mento V3, **rebalancing** is performed only by **allowlisted** contracts called **liquidity strategies**. The FPMM pool does not pull liquidity itself; it transfers one token to the strategy and calls back **onRebalance**; the strategy must return the other token (within the pool’s incentive cap). Strategies are permissionless to **trigger** (anyone can call `strategy.rebalance(pool)`), but subject to a **per-pool cooldown** and the pool’s **rebalance threshold** (deviation from oracle). Three concrete implementations exist: **ReserveLiquidityStrategy** (Reserve-backed stables), **CDPLiquidityStrategy** (CDP-backed stables; Mento’s Liquity v2 fork), and **OpenLiquidityStrategy** (caller-supplied liquidity via ERC20 transfers; no reserve or CDP).

**Contracts:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/liquidityStrategies/LiquidityStrategy.sol`, `ReserveLiquidityStrategy.sol`, `CDPLiquidityStrategy.sol`, `OpenLiquidityStrategy.sol`

---

## Interacting with liquidity strategies (code examples)

Strategies are typically triggered by **keepers** or off-chain bots when a pool is rebalanceable. Discovery (which pools a strategy serves) is usually done off-chain or via the [Mento SDK](../mento-sdk/README.md). The snippets below show how to call the strategy from Solidity.

### Checking if a pool is registered

```solidity
ILiquidityStrategy strategy = ILiquidityStrategy(strategyAddress);
bool registered = strategy.isPoolRegistered(poolAddress);
```

### Listing pools served by a strategy

```solidity
address[] memory pools = strategy.getPools();
```

### Previewing the rebalance action (view)

Use this to see whether a rebalance would run and what direction/amounts the strategy would use. Does not execute.

```solidity
(
    LiquidityStrategyTypes.Context memory ctx,
    LiquidityStrategyTypes.Action memory action
) = strategy.determineAction(poolAddress);

// action.direction  => Expand or Contract
// action.amount0Out, action.amount1Out => what the strategy would request from the pool
// ctx.priceDifference, ctx.rebalanceThreshold => eligibility
```

### Triggering a rebalance

Anyone can call this. The call will revert if the pool is not registered, cooldown has not elapsed, or the pool’s price difference is below threshold. The strategy then calls `pool.rebalance(...)` and implements `onRebalance` to source/sink the other token.

```solidity
strategy.rebalance(poolAddress);
// Reverts with LS_COOLDOWN_ACTIVE or LS_POOL_NOT_REBALANCEABLE if not eligible
```

---

## Base: LiquidityStrategy

The base contract maintains **per-pool configuration** and implements the **rebalance(pool)** entrypoint and the **onRebalance** callback interface expected by the FPMM.

### Pool configuration (PoolConfig)

For each registered pool, the strategy stores:

- **isToken0Debt** — Whether token0 is the “debt” token (the one the strategy sources for **expansion**: pool price above oracle) and token1 is “collateral,” or the reverse. This determines which token the strategy gives to the pool and which it takes.
- **lastRebalance** — Timestamp of the last rebalance for this pool.
- **rebalanceCooldown** — Minimum seconds between rebalances (enforced in `rebalance(pool)`).
- **protocolFeeRecipient** — Receives the protocol share of the rebalance incentive.
- **liquiditySourceIncentiveExpansion**, **protocolIncentiveExpansion** — Incentive split (expansion: strategy gives debt token to pool, takes collateral).
- **liquiditySourceIncentiveContraction**, **protocolIncentiveContraction** — Incentive split (contraction: strategy gives collateral to pool, takes debt token).

Incentives are in 18-decimal fixed-point (denominator 1e18). The **combined** incentive per direction must stay within the pool’s **rebalanceIncentive** cap (pool enforces minimum token-in via `_rebalanceCheck`).

### Rebalance flow

1. **Anyone** calls `LiquidityStrategy.rebalance(pool)`.
2. Strategy checks **cooldown** (`block.timestamp >= lastRebalance + rebalanceCooldown`); else `LS_COOLDOWN_ACTIVE`.
3. Strategy builds a **context** (oracle rate, pool state, thresholds, pool config) and computes the desired **action**: direction (expand/contract) and **target boundary** (e.g. move reserve-implied price to the threshold boundary, not 50/50). Logic uses the pool’s `getRebalancingState()` and the configured thresholds.
4. Strategy calls **IFPMM(pool).rebalance(amount0Out, amount1Out, data)**. So the **strategy** is the only caller of `pool.rebalance`; the pool’s allowlist must include the strategy’s address.
5. Pool transfers one token out to the strategy and calls **strategy.onRebalance(strategy, amount0Out, amount1Out, data)**.
6. Strategy’s **onRebalance** validates that the caller is the pool and that the sender is the strategy itself (transient storage / reentrancy guard). Then it calls an internal **\_handleCallback** (implemented per strategy):
   - **ReserveLiquidityStrategy:** Sources or sinks the other token via the **Reserve** (mint/burn stable, move collateral).
   - **CDPLiquidityStrategy:** Sources debt token from the **Stability Pool** (expansion) or returns debt and receives collateral via **redemptions** (contraction).
   - **OpenLiquidityStrategy:** Pulls the required token from the **rebalancer** (the address that called `rebalance`) via `transferFrom`; no reserve or CDP.
7. Strategy transfers the required token **to the pool** so that the pool’s balance delta satisfies the minimum repayment (incentive cap). Strategy may keep the remainder as protocol and liquidity-source incentive.
8. Pool’s **\_rebalanceCheck** runs: price difference improved, direction preserved, no overshoot, minimum amount in satisfied.

### Target boundary

The base strategy does **not** target 50/50 reserve value; it targets the **threshold boundary** (e.g. if reserve price is above oracle, it rebalances until the reserve-implied price is at `oracle × (1 + thresholdAbove)` in value terms). This avoids overshooting and keeps the pool within the allowed band. See `LiquidityStrategy.sol` (e.g. `targetNumerator = oracleNum * (1 + threshold)` for the above-oracle case).

### Fee composition

Incentives are **combined** from liquidity-source and protocol components (e.g. `combineFees` in LiquidityStrategyTypes). The composed fee is used to compute how much of the other token the strategy must return (minimum) and how much it can keep. Pool enforces only the **cap** (minimum in); strategy splits the rest.

---

## ReserveLiquidityStrategy

- **Backing:** Uses the **Reserve** contract. For Reserve-backed Mento stables (e.g. USDm, EURm), the Reserve holds the collateral (e.g. USDC, EUROC); the strategy **mints** the Mento stable to give to the pool (expansion) or **burns** it when taking it from the pool (contraction) and moves collateral accordingly.
- **Contraction clamp:** `_clampContraction` can limit how much the strategy will take from the pool in a single rebalance (e.g. to avoid over-burning or to respect Reserve capacity). Callback flow and incentive handling: `ReserveLiquidityStrategy.sol` (e.g. L125–L169).
- **Use case:** Pools that pair USDm or EURm with an external stable (e.g. USDC/USDm, axlEUROC/EURm).

---

## CDPLiquidityStrategy

- **Backing:** Uses the Mento **Liquity v2** fork (CDP system). Expansion: strategy pulls **debt** token (e.g. GBPm) from the **Stability Pool** and gives it to the pool, receiving **collateral** (e.g. USDm) from the pool. Contraction: strategy **redeems** debt (pays GBPm, receives USDm from troves) and gives USDm to the pool, taking GBPm from the pool. See [Liquity v2 documentation](https://docs.liquity.org/) for Trove, Stability Pool, and redemptions.
- **Expansion clamp:** `_clampExpansion` limits how much debt can be taken from the Stability Pool in one rebalance (e.g. percentage of SP balance, minimum BOLD left in SP). Contraction uses redemption logic with iteration bounds and shortfall tolerance. `CDPLiquidityStrategy.sol` (e.g. L89–L112, L138–L190).
- **Use case:** Pools that pair a CDP-backed stable (e.g. GBPm) with USDm (e.g. GBPm/USDm).

---

## OpenLiquidityStrategy

- **Backing:** No reserve or CDP. The **caller** of `rebalance(pool)` acts as the liquidity source: they must have approved the strategy to spend the required token and transfer it in before/during the rebalance. The strategy uses **ERC20 transfers** only (no minting or burning). Introduced in [mento-protocol/mento-core#711](https://github.com/mento-protocol/mento-core/pull/711).
- **Mechanics:** The strategy uses **EIP-1153 transient storage** (`tstore`/`tload`) to record the rebalancer address for the duration of the transaction, so that `onRebalance` can pull tokens from the correct account and send the protocol incentive to `protocolFeeRecipient` and the remainder (liquidity-source incentive) back to the rebalancer.
- **Clamps:** `_clampExpansion` and `_clampContraction` overrides check the rebalancer’s token balance and cap the rebalance amounts so the strategy never attempts to transfer more than the caller holds.
- **Use case:** Deployments where there is no Reserve or CDP (e.g. GBPm/USDm on Monad). A keeper or relayer holds the tokens and calls `rebalance`; the strategy pulls from the caller and returns the other side to the pool. Deployed parameters (e.g. Monad address) are in [Parameters](../deployments/parameters.md).

---

## Pool registration

- **addPool(params)** — Adds a pool with `AddPoolParams`: pool address, debt token, cooldown, protocol fee recipient, and the four incentive values. Sets `isToken0Debt` from the debt token. Reverts if pool already exists, debt token not in pool, or protocol fee recipient zero. The **pool owner** must then call `FPMM.setLiquidityStrategy(strategy, true)` to allowlist the strategy.
- **removePool(pool)** — Removes the pool from the strategy’s registry. Does not automatically remove the strategy from the pool’s allowlist (owner must do that on the pool).

---

## View

- **determineAction(pool)** — Returns the current **context** and the **action** (direction, amounts) the strategy would take if `rebalance(pool)` were called. Useful for off-chain or UI to preview rebalance.
- **isPoolRegistered(pool)**, **getPools()** — Registry queries.

---

## Errors (selection)

- `LS_COOLDOWN_ACTIVE` — Rebalance called before cooldown elapsed.
- `LS_POOL_NOT_FOUND` — Pool not in strategy registry.
- `LS_HOOK_NOT_CALLED` — `onRebalance` invoked outside a rebalance from the FPMM.
- `LS_CAN_ONLY_REBALANCE_ONCE(pool)` — Same pool rebalanced twice in one transaction (transient storage guard).

---

## See also

- [FPMM](fpmm.md) — `rebalance`, allowlist, `getRebalancingState`, `_rebalanceCheck`.  
- [Reserve](reserve.md) — Used by ReserveLiquidityStrategy.  
- [The Reserve](../../dive-deeper/the-reserve.md) — Protocol role.  
- [Liquity v2 docs](https://docs.liquity.org/) — CDP mechanism for CDPLiquidityStrategy.  
- [Parameters](../deployments/parameters.md) — Deployed strategy addresses (e.g. OpenLiquidityStrategy on Monad).  
- [Rebalancing & strategies](../../dive-deeper/fpmm/rebalancing-and-strategies.md).
