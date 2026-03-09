# Glossary

Short definitions for terms used in the docs. For full context, follow the links to the concept pages.

| Term | Definition |
|------|------------|
| **FPMM** | Fixed-Price Market Maker. Swap at the oracle rate (minus fee). No reserve-based curve. See [FPMMs](../concepts/fpmm.md). |
| **Oracle** | Price feed (e.g. FX rate). Validity depends on recency, trading mode, and optional FX hours. See [Oracles](../concepts/oracles.md). |
| **Rebalance** | Pool sends one token to an allowlisted strategy; the strategy returns the other token (at the oracle rate). Not a “flash swap.” See [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md). |
| **Liquidity strategy** | Allowlisted component that can call the pool’s rebalance; the pool calls back to receive the other token. Types: **Reserve** (protocol reserve), **CDP** (e.g. GBPm). |
| **Value protection** | Rule: reserve value at oracle must not decrease after the fee is credited; otherwise the swap reverts. |
| **Trading limits** | Per-token netflow caps over time windows (e.g. 5-minute, 1-day). See [Limits & breakers](../concepts/limits-and-breakers.md). |
| **BreakerBox** | Gates the oracle (e.g. trading mode, FX market hours). Swaps revert when breakers trip. |
| **LVR** | Loss versus rebalancing. In curve-based AMMs, LPs lose to arbitrageurs when the market moves; in an FPMM, swap is at the oracle so there is no LVR from a stale curve. |
| **CFMM / reserve-only AMM** | Constant-function market maker; price comes from reserves only. Contrast with FPMM, where price comes from the oracle. |
