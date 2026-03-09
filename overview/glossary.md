# Glossary

Short definitions. Full context: concept pages (links below).

| Term | Definition |
|------|------------|
| **FPMM** | Fixed-price market maker. Swap at oracle rate (minus fee); no curve. [FPMMs](../concepts/fpmm.md). |
| **Oracle** | Price feed (e.g. FX). Valid = recency + trading mode + optional FX hours. [Oracles](../concepts/oracles.md). |
| **Rebalance** | Pool → one token to allowlisted strategy; strategy returns other at oracle rate. [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md). |
| **Liquidity strategy** | Allowlisted; pool calls back for other token. Types: **Reserve**, **CDP** (e.g. GBPm). |
| **Value protection** | Reserve value at oracle must not decrease after fee; else revert. |
| **Trading limits** | Per-token netflow caps (5-min, 1-day). [Limits & breakers](../concepts/limits-and-breakers.md). |
| **BreakerBox** | Gates oracle (trading mode, FX hours). Trip → revert. |
| **LVR** | Loss vs rebalancing. Curve AMMs: LPs lose to arbs when market moves. FPMM: swap at oracle → no LVR. |
| **CFMM** | Constant-function market maker; price from reserves only. Contrast FPMM. |
| **token0 / token1** | Pool tokens by address. Debt/collateral = strategy-side. |
| **Peg** | Target price (e.g. 1 USD per USDm). Redemption, CDP keep market at peg. |
| **Slippage** | Curve pools: execution price vs expected along curve. FPMM: no curve slippage. |
