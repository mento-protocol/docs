# Architecture

Mento v3: pools (FPMM), factory, router, oracle adapter, breakers, trading limits, liquidity strategies. Diagram + one line per component.

---

## High-level

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
         └──────────▶│ Trading limits     │
                     │ (per-token caps)   │
                     └───────────────────┘
         │
         │    Rebalance
         ▼
┌─────────────────────┐
│ Liquidity strategies│  (Reserve, CDP)
└─────────────────────┘
```

- **Router:** Swap (and mint/burn) entry; sorts tokens, routes to pool.
- **FPMM:** Pool. Reserves, LP shares; swap at oracle (minus fee), value protection, mint/burn at pool ratio, rebalance via strategies.
- **OracleAdapter:** Rate to pool; recency, trading mode, FX hours; consults BreakerBox.
- **BreakerBox:** Gates oracle; invalid → revert.
- **Trading limits:** Per-token netflow caps (5-min, 1-day) after each swap.
- **Liquidity strategies:** Allowlisted; call rebalance; pool sends one token, strategy returns other. Reserve and CDP.

---

## Components

| Component | Role |
|-----------|------|
| FPMMFactory | Deploys pools (tokens, oracle, strategies, limits). |
| FPMM | Pool: swap, mint, burn, rebalance checks, value protection, limits. |
| Router | User swap (and mint/burn); routes to pool. |
| OracleAdapter | Rate if valid; pool uses for quote and value check. |
| BreakerBox | Aggregates breakers; adapter checks “can we trade?” |
| TradingLimitsV2 | Netflow caps per token per window. |
| Liquidity strategies | Reserve, CDP; allowlisted, rebalance callback. |

Paths and refs: [Contracts](contracts.md). Addresses: [Deployments](deployments.md).
