# What's new in v3

Mento v3 is a **DEX for onchain FX** (foreign exchange). This page summarizes how v3 differs from the previous (v2) architecture.

---

## v3 in short

- **FPMM (Fixed-Price Market Maker)** — Swaps execute at the **oracle rate** (minus fee). No reserve-based curve, no curve slippage, no LVR from a stale pool price.
- **Oracle as price source** — Each pool uses an external price feed; the pool does not derive price from its own reserves.
- **Rebalancing** — When inventory drifts, **allowlisted liquidity strategies** (Reserve, CDP) rebalance to a **threshold boundary** (not exact 50/50). Capped rebalance incentive.
- **Safety** — Value protection, trading limits (5-min and 1-day per-token caps), and circuit breakers (BreakerBox, OracleAdapter).
- **Mento stables** — USDm, EURm, GBPm (and others) are **one use case** of the DEX: pools with USDC, USDT, EUROC, etc., plus CDP-backed stables like GBPm.

---

## v2 → v3: what changed

| Aspect | v2 | v3 |
|--------|-----|-----|
| **Exchange core** | Broker, BiPoolManager, constant-sum / constant-product pricing | FPMM pools; swap at oracle rate |
| **Price source** | Reserve-derived or curve-derived | Oracle (price feed) per pool |
| **Slippage / LVR** | Curve-based slippage; LPs exposed to LVR | No curve; execution at oracle (minus fee); no LVR from stale curve |
| **Rebalancing** | Different mechanics | Allowlisted strategies; rebalance to threshold; capped incentive |
| **Contracts** | Broker, BiPoolManager, pricing modules | FPMM, FPMMFactory, OracleAdapter, BreakerBox, TradingLimitsV2, LiquidityStrategy |

v2 contracts (Broker, BiPoolManager, etc.) are **legacy**. See [Legacy (v2)](../legacy-v2.md) for reference only.

---

## Where to go next

- [What is Mento?](what-is-mento.md) — Full v3 overview.
- [Swap & liquidity](../../use-mento/swap-and-liquidity.md) — How to swap and add/remove liquidity.
- [Getting Mento stables](../../use-mento/getting-mento-stables/README.md) — Get USDm, EURm, GBPm.
- [Core concepts](../core-concepts/README.md) — FPMMs, oracles, rebalancing, limits.
