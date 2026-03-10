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
| **Understand what Mento is** | [What is Mento?](understand/getting-started/what-is-mento.md) |
| **Swap or add/remove liquidity** | [Swap & liquidity](use/swap-and-liquidity.md) |
| **Get Mento stablecoins** (USDm, EURm, GBPm) | [Getting Mento stables](use/getting-mento-stables/README.md) |
| **Borrow, repay, or use the stability pool** | [CDP operations](use/cdp-operations.md) |
| **Integrate** (quote, swap, contracts, SDK) | [Build: Integration](build/integration/README.md) |
| **Deep dive: FPMMs, oracles, rebalancing** | [Concepts overview](understand/getting-started/concepts-overview.md) |
| **Fix a failed swap or other issue** | [Troubleshooting](use/troubleshooting.md) |

[Quick start guides](understand/getting-started/quick-start-guides.md) · [Glossary](understand/getting-started/glossary.md) · [Analytics & dashboards](understand/getting-started/analytics-and-dashboards.md)

---

*Previous protocol architecture (v2) is documented in legacy docs and the [whitepaper](https://github.com/mento-protocol/whitepaper).*
