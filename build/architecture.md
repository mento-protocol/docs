# Architecture

Mento v3 is built from a small set of components: pools (FPMM), factory, router, oracle adapter, breakers, trading limits, and liquidity strategies. This page gives a diagram-style overview and short text per component.

---

## High-level picture

```
User / App
    │
    ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Router    │────▶│  FPMM (pool) │────▶│ OracleAdapter   │
└─────────────┘     └──────────────┘     └────────┬────────┘
         │                   │                    │
         │                   │                    ▼
         │                   │            ┌──────────────┐
         │                   │            │  BreakerBox   │
         │                   │            └──────────────┘
         │                   │
         │                   ▼
         │           ┌───────────────────┐
         └──────────▶│ Trading limits    │
                     │ (per-token caps)  │
                     └───────────────────┘
         │
         │    Rebalance
         ▼
┌─────────────────────┐
│ Liquidity strategies│  (Reserve, CDP)
└─────────────────────┘
```

- **Router:** Entry point for swap (and optionally mint/burn). Sorts tokens, routes to the correct pool.
- **FPMM:** The pool. Holds reserves, LP shares; swap at oracle (minus fee), value protection, mint/burn at pool ratio, rebalance via strategies.
- **OracleAdapter:** Provides the rate to the pool; combines recency, trading mode, FX hours. Calls BreakerBox.
- **BreakerBox:** Gates the oracle (e.g. trading mode, FX hours). Invalid ⇒ swap reverts.
- **Trading limits:** Per-token netflow caps (5-min, 1-day). Enforced after each swap.
- **Liquidity strategies:** Allowlisted; call `rebalance` on the pool; pool sends one token, strategy returns the other. Reserve and CDP are the two types.

---

## Components (short)

| Component | Role |
|-----------|------|
| **FPMMFactory** | Deploys and configures FPMM pools (tokens, oracle, strategies, limits). |
| **FPMM** | Single pool: swap, mint, burn, rebalance checks, value protection, trading limits. |
| **Router** | User-facing swap (and mint/burn) entry; sorts tokens, routes to pool. |
| **OracleAdapter** | Returns rate if valid (recency, breakers); pool uses it for quote and value check. |
| **BreakerBox** | Aggregates breakers; adapter consults it for “can we trade?” |
| **TradingLimitsV2** | Library/contract for netflow caps per token per window. |
| **Liquidity strategies** | Reserve, CDP; allowlisted, implement callback for rebalance. |

For contract paths and line references, see [Contracts](contracts.md). For deployments and addresses, see [Deployments](deployments.md).
