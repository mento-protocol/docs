---
description: >-
  Overview of Mento V3 and how these docs are organized. Start here to understand
  the protocol and find the right section for your goal.
---

# Overview

---

## What is Mento V3?

**A DEX for onchain foreign exchange (FX).** Users swap stablecoins at **FX rates** — e.g. USDC ↔ GBPm at USD/GBP, or USDC ↔ EURm at USD/EUR — so onchain execution can compete with off-chain spot FX.

### Why a different design?

Most DEXs use **curve-based AMMs**: the swap price comes from the pool’s reserves and only changes when someone trades. That causes **slippage** (traders miss the true rate) and **LVR** (arbitrageurs profit when the quote is stale).

For FX, the fair rate is already known off-chain. We don’t need the pool to *discover* the price — we need it to **use** it.

### Fixed-Price Market Makers (FPMMs)

Each pool is tied to an **oracle** (external price feed) and **always quotes that rate** (minus a fee).

- No reserve-based curve → no curve-based slippage, no LVR from a stale pool price.
- When the oracle is accurate, traders get the FX rate and LPs aren’t drained by arbitrage.

### How the protocol is structured

| Piece | Role |
|-------|------|
| **Trading limits & circuit breakers** | Protect when the oracle is wrong, stale, or manipulated. Limits cap flow per token over time; the breaker can halt trading when the oracle is invalid or thresholds are breached. |
| **Fees & incentives** | **Swap spread** (gap between buy/sell around the oracle) creates a band where arbitrage is unprofitable even if the oracle is slightly off. Fees fund the protocol and reward LPs. Incentives align roles: LPs earn swap fees, keepers/strategies earn rebalance incentives, governance (MENTO) sets parameters and revenue flows. |
| **Liquidity strategies (rebalancing)** | No curve → reserves can become one-sided. Allowlisted strategies rebalance: take surplus token from the pool, return the other at the oracle rate (capped incentive). Keeps the pool usable. |

### One invariant for all operations

Every pool keeps one number constant: **value at the oracle per LP share**,

<p align="center">$$I = \frac{V}{S}$$</p>

- **V** = pool value at the oracle price (reserves valued at the oracle rate).
- **S** = total LP share supply.
- **I** = value per share at the oracle.

**I** is preserved on **swap** (V, S unchanged), **mint/burn** (value in proportion), and **rebalance** (strategy returns the other token at oracle rate)—**when we ignore fees and incentives**. In practice, swap fees and the capped rebalance incentive affect the exact accounting. Your share still represents a well-defined amount at the oracle for the purpose of the protocol’s bookkeeping.

→ Full mechanics: [FPMMs](dive-deeper/fpmm/README.md).

### What you can do

- **Swap** at the oracle rate.
- **Add or remove liquidity** to FPMM pools.
- **Get Mento stablecoins** (USDm, EURm, GBPm) via pools or **borrowing** (e.g. GBPm via a CDP).
- **Governance** is driven by the **MENTO** token. Stables like USDm/EURm are **Reserve**-backed; GBPm is **CDP-backed**.

More on oracle pricing and pool mechanics: [FPMMs](dive-deeper/fpmm/README.md).

---

## How these docs are organized

The documentation is split into five sections. Use the one that matches your goal.

### [Get Started](get-started/quick-start-guides.md)

**For:** New users who want to do something with Mento V3 right away.

- **This page (Overview)** — What Mento V3 is and how the docs are organized (see above).
- **[Quick Start Guides](get-started/quick-start-guides.md)** — Step-by-step: your first swap, adding liquidity, borrowing a stable, earning in the Stability pool, or integrating.

### [Dive Deeper](dive-deeper/fpmm/README.md)

**For:** Readers who want to understand how the protocol works under the hood.

- **[FPMMs](dive-deeper/fpmm/README.md)** — Why Mento uses oracle pricing (and why curve-based AMMs don’t work well for FX), how Fixed-Price Market Makers work: the invariant, operations, rebalancing, and liquidity strategies. Subpages cover oracles & circuit breakers, trading limits, the Reserve, and research & economics.
- **[CDPs](use/cdp-operations.md)** — How collateralized debt positions back synthetic Mento stables (e.g. GBPm).
- **[Governance & MENTO](dive-deeper/governance-and-mento/README.md)** — How the protocol is governed, the MENTO token, tokenomics, and participation (voting, proposals, watchdogs).
- **[Security](dive-deeper/security/README.md)** — Risk overview and audit reports.

### [Use](use/swap-and-liquidity.md)

**For:** Users who want to swap, get Mento stables, manage CDPs, or fix issues.

- **[Swap & liquidity](use/swap-and-liquidity.md)** — How to swap and add or remove liquidity on FPMM pools.
- **[Getting Mento Stables](use/getting-mento-stables/README.md)** — Paths to obtain USDm, EURm, GBPm (app, Celo, mobile, other chains, CEX, on-ramp, automation).
- **[CDP operations](use/cdp-operations.md)** — Borrow, repay, and use the Stability pool.
- **[Troubleshooting](use/troubleshooting.md)** — Common issues when swapping or using the app.

### [Build](build/integration/README.md)

**For:** Developers and protocols integrating with Mento V3.

- **[Integration](build/integration/README.md)** — How to add Mento stables, use oracles, and find deployment addresses. Links to the SDK, smart contracts, and deployments.
- **[Mento SDK](build/mento-sdk/README.md)** — JavaScript/TypeScript library for quotes and swaps.
- **[Smart Contracts](build/smart-contracts/README.md)** — Contract reference (FPMM, oracles, limits, strategies).
- **[Deployments](build/deployments/README.md)** — Addresses, verification, and parameters.
- **[Oracles](build/oracles/README.md)** — Technical details for oracle operators and integrators.
- **[Troubleshooting (integrators)](build/troubleshooting.md)** — Common integration issues.

### [Reference](reference/glossary.md)

**For:** Lookup and supporting material.

- **[Glossary](reference/glossary.md)** — Short definitions of terms (AMM, FPMM, LVR, oracle, rebalance, etc.).
- **[GBPm/USDm parameters](reference/gbpm-usdm-parameters-reference.md)** — Recommended launch parameters for the GBPm/USDm deployment.
- **[Analytics & Dashboards](reference/analytics-and-dashboards.md)** — Links to reserve and on-chain analytics.

---

## Quick links by goal

| I want to… | Go to |
|------------|--------|
| **Understand what Mento is** | This page (Overview) |
| **Swap or add/remove liquidity** | [Swap & liquidity](use/swap-and-liquidity.md) |
| **Get Mento stablecoins** (USDm, EURm, GBPm) | [Getting Mento stables](use/getting-mento-stables/README.md) |
| **Borrow, repay, or use the Stability pool** | [CDP operations](use/cdp-operations.md) |
| **Integrate** (quote, swap, contracts, SDK) | [Integration](build/integration/README.md) |
| **Deep dive: FPMMs, oracles, rebalancing** | [FPMMs](dive-deeper/fpmm/README.md) |
| **Fix a failed swap or other issue** | [Troubleshooting](use/troubleshooting.md) |

---

*Previous protocol architecture (v2) is documented in legacy docs and the [whitepaper](https://github.com/mento-protocol/whitepaper).*
