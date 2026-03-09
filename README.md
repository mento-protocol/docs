---
description: >-
  These docs describe Mento v3. New to Mento? Start here to understand the
  protocol and find the right guide for swapping, adding liquidity, or
  getting Mento stablecoins.
---

# Mento v3

**These docs describe Mento v3.** Mento v3 is a **DEX** (decentralized exchange) for **onchain FX** (foreign exchange): you swap two assets at a rate set by an external **oracle** (a price feed), not by the pool’s reserves. The core building block is the **FPMM** (Fixed-Price Market Maker): each pool quotes the oracle rate, so there is no curve-based slippage and no **LVR** (loss to arbitrageurs from a stale pool price). You can **swap** at the oracle rate, **add or remove liquidity** to pools, or **obtain Mento stablecoins** (USDm, EURm, GBPm) via those pools or via borrowing (CDP).

---

## Start here

| I want to… | Go to |
|------------|--------|
| **Understand what Mento is** | [What is Mento?](overview/getting-started/what-is-mento.md) |
| **Swap or add/remove liquidity** | [Swap & liquidity (FPMM operations)](use-mento/swap-and-liquidity.md) |
| **Get Mento stablecoins** (USDm, EURm, GBPm) | [Getting Mento stables](use-mento/getting-mento-stables/README.md) |
| **Borrow, repay, or use the stability pool** | [CDP operations](use-mento/cdp-operations.md) (when available) |
| **Integrate** (quote, swap, contracts, SDK) | [Build on Mento](build-on-mento/integration-overview/README.md) |
| **Deep dive: FPMMs, oracles, rebalancing** | [Core concepts](overview/core-concepts/README.md) |
| **Something went wrong** (swap failed, etc.) | [Troubleshooting](use-mento/troubleshooting.md) |

[Quick start guides](overview/getting-started/quick-start-guides.md) · [What's new in v3](overview/getting-started/whats-new-v3.md) · [Glossary](overview/glossary.md) · [Analytics & dashboards](overview/getting-started/analytics-and-dashboards.md)

---

*Previous protocol architecture (v2) is documented only for reference: [Legacy (v2)](overview/legacy-v2.md).*
