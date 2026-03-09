# Contracts

Reference for the main Mento v3 contracts. One-line summary per contract; details (parameters, return values) in the codebase. Paths and line refs come from the implementation note (`notes/fpmm-mento-v3-implementation.tex`); re-check after updates.

---

## Swap (pools and routing)

| Contract | Path | Summary |
|----------|------|---------|
| **FPMM** | `vendor/mento-core/contracts/swap/FPMM.sol` | Single pool. Swap at oracle (minus fee), value protection, mint/burn at pool ratio, rebalance from allowlisted strategies. Quote: `getAmountOut`. |
| **FPMMFactory** | `contracts/swap/FPMMFactory.sol` | Deploys FPMM pools (tokens, oracle, strategies, trading limits). Sorts tokens by address. |
| **Router** | `contracts/swap/router/Router.sol` | User-facing swap (and mint/burn). Sorts tokens, routes to pool. |

---

## Oracles and breakers

| Contract | Path | Summary |
|----------|------|---------|
| **OracleAdapter** | `vendor/mento-core/contracts/oracles/OracleAdapter.sol` | Supplies rate to pool. `getRateIfValid` / `getFXRateIfValid`; combines recency, trading mode, FX hours. Consults BreakerBox. |
| **BreakerBox** | `contracts/oracles/BreakerBox.sol` | Aggregates breakers (trading mode, FX hours). Adapter gates rate with it; invalid ⇒ swap reverts. |

---

## Trading limits

| Contract | Path | Summary |
|----------|------|---------|
| **TradingLimitsV2** | `vendor/mento-core/contracts/libraries/TradingLimitsV2.sol` | Per-token netflow caps (5-min, 1-day). Pool calls `applyTradingLimits` after swap. |

---

## Liquidity strategies

| Contract | Path | Summary |
|----------|------|---------|
| **LiquidityStrategy** | `contracts/liquidityStrategies/LiquidityStrategy.sol` | Interface: pool calls `onRebalance`, strategy returns the other token. |
| **ReserveLiquidityStrategy** | `contracts/liquidityStrategies/ReserveLiquidityStrategy.sol` | Reserve-backed strategy for pools (e.g. cUSD, EURm). |
| **CDPLiquidityStrategy** | `contracts/liquidityStrategies/CDPLiquidityStrategy.sol` | CDP-backed strategy (e.g. GBPm). |

---

## Key functions (FPMM)

- **Quote:** `getAmountOut(amountIn, tokenIn)` — output amount at oracle rate minus fee.
- **Swap:** Router or direct: transfer in, callback; pool computes amounts, checks value protection and limits, transfers out.
- **Mint/burn:** Proportional at current reserve ratio; see implementation note for mint/burn flow.
- **Rebalance:** Only allowlisted strategy; pool transfers out, calls strategy, strategy returns other token; `_rebalanceCheck` (deviation, direction, boundary, minimum repayment).

Line-level refs: see `notes/fpmm-mento-v3-implementation.tex` (and `vendor/mento-core`). For deployment addresses and parameters, see [Deployments](deployments.md).
