# Contracts

Main Mento v3 contracts. One-line each; details in code. Paths under `vendor/mento-core/`. Line refs: `notes/fpmm-mento-v3-implementation.tex`.

---

## Swap

| Contract | Path | Summary |
|----------|------|---------|
| **FPMM** | `contracts/swap/FPMM.sol` | Pool. Swap at oracle (minus fee), value protection, mint/burn at pool ratio, rebalance from allowlisted strategies. Quote: `getAmountOut`. |
| **FPMMFactory** | `contracts/swap/FPMMFactory.sol` | Deploys pools (tokens, oracle, strategies, limits). Sorts tokens by address. |
| **Router** | `contracts/swap/router/Router.sol` | User swap (and mint/burn). Routes to pool. |

---

## Oracles and breakers

| Contract | Path | Summary |
|----------|------|---------|
| **OracleAdapter** | `contracts/oracles/OracleAdapter.sol` | Rate to pool. `getRateIfValid` / `getFXRateIfValid`; recency, trading mode, FX hours. Consults BreakerBox. |
| **BreakerBox** | `contracts/oracles/BreakerBox.sol` | Aggregates breakers. Adapter gates rate; invalid → revert. |

---

## Trading limits

| Contract | Path | Summary |
|----------|------|---------|
| **TradingLimitsV2** | `contracts/libraries/TradingLimitsV2.sol` | Per-token netflow caps (5-min, 1-day). Pool calls after swap. |

---

## Liquidity strategies

| Contract | Path | Summary |
|----------|------|---------|
| **LiquidityStrategy** | `contracts/liquidityStrategies/LiquidityStrategy.sol` | Pool calls `onRebalance`; strategy returns other token. |
| **ReserveLiquidityStrategy** | `contracts/liquidityStrategies/ReserveLiquidityStrategy.sol` | Reserve-backed (USDm, EURm). |
| **CDPLiquidityStrategy** | `contracts/liquidityStrategies/CDPLiquidityStrategy.sol` | CDP-backed (e.g. GBPm). |

---

## FPMM key functions

- **Quote:** `getAmountOut(amountIn, tokenIn)` — output at oracle rate minus fee.
- **Swap:** Transfer in, callback; pool checks value protection + limits, transfers out.
- **Mint/burn:** Proportional at current reserve ratio.
- **Rebalance:** Allowlisted strategy only; transfer out → strategy callback → other token; `_rebalanceCheck` (deviation, direction, boundary, min repayment).

Addresses and parameters: [Deployments](deployments.md).
