# What Is Mento? (v3)

Mento v3 is a **decentralized exchange (DEX) for onchain foreign exchange (FX)**. It uses **Fixed-Price Market Makers (FPMMs)** so that swaps execute at **oracle rates** (minus fees)—no reserve-based curve, no curve slippage, no LVR from a stale pool price. Pools pair assets with an oracle; when inventory drifts, allowlisted **liquidity strategies** rebalance. The same infrastructure supports **Mento stablecoins** (USDm, EURm, GBPm): pools with USDC, USDT, EUROC, and others, plus CDP-based stables like GBPm.

You can **swap** at the oracle rate, **add or remove liquidity** to FPMM pools, or **obtain Mento stables** via swap or borrow. Governance and safety (trading limits, circuit breakers, value protection) are managed by the protocol and MENTO token holders.

## DEX for FX, not just stablecoins

In v3 the focus is **onchain FX infrastructure**. The protocol provides:

- **Swap at oracle rate** — Execution at the external price feed (e.g. FX or stablecoin rate), minus a small fee. No curve; no slippage from reserves.
- **LP liquidity** — Anyone can add/remove liquidity; value per share at oracle (\(I = V/S\)) is preserved across swap, mint, burn, and rebalance.
- **Rebalancing** — When the pool’s reserve ratio drifts from the oracle, allowlisted strategies (Reserve or CDP) rebalance to a **threshold boundary** (not 50/50). Permissionless keepers can trigger rebalances and earn a capped incentive.
- **Safety** — Value protection (reserve value at oracle cannot decrease after fees), trading limits (per-token caps over 5-min and 1-day windows), and circuit breakers (oracle validity, trading mode, FX hours).

Mento stablecoins (USDm, EURm, GBPm) are **one use case**: they are paired in FPMM pools with external stables (USDC, USDT, EUROC, etc.) or supported via CDP (e.g. GBPm). The **primary product** is the DEX; the stables are assets you can get and use on that DEX.

## Where to go next

- **Use the DEX:** [Swap & liquidity](../../use-mento/README.md) (FPMM operations), [Getting Mento stables](../../use-mento/getting-mento-stables/README.md)
- **How it works:** [Fixed-Price Market Makers (FPMMs)](../../overview/core-concepts/fixed-price-market-makers-fpmms.md), [Oracles & price feeds](../../overview/core-concepts/oracles-and-price-feeds.md), [Trading limits & circuit breakers](../../overview/core-concepts/trading-limits-and-circuit-breakers.md)
- **Build:** [Integration overview](../../build-on-mento/integration-overview.md), [Smart contracts](../../build-on-mento/smart-contracts/README.md)

*For the previous (v2) architecture, see legacy docs or the v2 section if available.*
