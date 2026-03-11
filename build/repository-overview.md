---
description: Overview of the main Mento GitHub repositories.
---

# Repository Overview

Overview of the main [Mento GitHub repositories](https://github.com/mento-protocol), in order of importance.

---

## [mento-core](https://github.com/mento-protocol/mento-core)

Core smart contracts for Mento V3: FPMM (Fixed-Price Market Maker) pools, OracleAdapter, liquidity strategies (Reserve, CDP, OpenLiquidityStrategy), TradingLimitsV2, BreakerBox integration, and related tooling. Built with [Foundry](https://book.getfoundry.sh/) for compilation and testing. This is the primary repo for the on-chain exchange and rebalancing logic.

---

## [bold](https://github.com/mento-protocol/bold) — CDP (Liquity v2 fork)

Fork of [Liquity v2](https://www.liquity.org/) used for Mento’s **CDP-backed stablecoins** (e.g. GBPm). Contains the contracts, subgraph, and frontend for the CDP system. Key differences from upstream: **USDm** as collateral (instead of WETH/LSTs), **FX-pegged stables** (e.g. mGBP) as debt tokens, **FX rate feeds** via Mento’s OracleAdapter, and **one independent instance per FX currency**. See the repo README for Mento-specific risks and architecture.

---

## [frontend-monorepo](https://github.com/mento-protocol/frontend-monorepo)

Monorepo for all Mento frontends. Built with **Turborepo**, **PNPM**, **Next.js**, and **Tailwind**; shared UI and web3 packages live under `packages/`. Main apps:

| App | Purpose |
|-----|--------|
| **app.mento.org** | Mento Exchange UI (swap, liquidity, CDP) |
| **governance.mento.org** | Governance UI |
| **reserve.mento.org** | Reserve dashboard |
| **minipay.mento.org** | MiniPay DApp |
| **ui.mento.org** | Component library showcase |

See the repo README for setup, scripts, and development workflow.
