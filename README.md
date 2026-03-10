---
description: >-
  Overview of Mento V3 and how these docs are organized. Start here to understand
  the protocol and find the right section for your goal.
---

# Overview

This page explains **what Mento V3 is**, outlines the **core ideas** behind it, and shows **how these docs are structured** so you can find what you need quickly.

---

## What is Mento V3?

**Mento V3 is a decentralized exchange (DEX) for onchain foreign exchange (FX).** The goal is to let users swap stablecoins onchain at **FX rates** — for example USDC ↔ GBPm at the USD/GBP rate, or USDC ↔ EURm at USD/EUR — so that onchain execution can compete with off-chain spot FX.

**Why a different design?** Most DEXs use **curve-based AMMs** (e.g. constant-product pools): the swap price is derived only from the pool’s reserves and changes only when someone trades. That leads to **slippage** (traders don’t get the true market rate) and **LVR** (loss-versus-rebalancing: arbitrageurs profit when the pool’s quote is stale). For FX, where the fair rate is already known off-chain, we don’t need the pool to *discover* the price — we need it to **use** it.

**Mento V3’s approach: Fixed-Price Market Makers (FPMMs).** Each pool is tied to an **oracle** (an external price feed). The pool **always quotes the oracle rate** (minus a fee). There is no reserve-based curve: execution is at the oracle, so there is **no curve-based slippage** and **no LVR** from a stale pool price. When the oracle is accurate, traders get the FX rate and LPs are not drained by arbitrage.

**What protects the pool?** The rest of the protocol exists for when the oracle is wrong, stale, or manipulated: **trading limits** (caps on how much can flow per token over time), a **circuit breaker** (trading can be halted when the oracle is invalid or breakers trip), **value protection** (no swap may reduce the pool’s value at the oracle after fees), and **rebalancing** by allowlisted liquidity strategies that bring inventory back in line at the oracle rate (with a capped incentive).

**What you can do.** You can **swap** at the oracle rate, **add or remove liquidity** to FPMM pools, or **obtain Mento stablecoins** (USDm, EURm, GBPm) via those pools or by **borrowing** (e.g. GBPm via a CDP). Stables like USDm and EURm are backed by a **Reserve**; others like GBPm are **CDP-backed** (collateralized debt). Governance is driven by the **MENTO** token.

For the detailed design story — why curve AMMs fail for FX, formulas, and building blocks — see [What Is Mento? (deep dive)](dive-deeper/what-is-mento.md) in **Dive Deeper**.

---

## How these docs are organized

The documentation is split into five sections. Use the one that matches your goal.

### [Get Started](get-started/quick-start-guides.md)

**For:** New users who want to do something with Mento V3 right away.

- **This page (Overview)** — What Mento V3 is and how the docs are organized (see above).
- **[Quick Start Guides](get-started/quick-start-guides.md)** — Step-by-step: your first swap, adding liquidity, borrowing a stable, earning in the Stability pool, or integrating.

### [Dive Deeper](dive-deeper/what-is-mento.md)

**For:** Readers who want to understand how the protocol works under the hood.

- **[What Is Mento? (deep dive)](dive-deeper/what-is-mento.md)** — Why curve-based AMMs don’t work for FX, how FPMMs use the oracle, and the building blocks (formulas, invariant, limits, rebalancing). Optional math.
- **[FPMMs](dive-deeper/fpmm/README.md)** — How Fixed-Price Market Makers work in Mento V3: the invariant, operations, rebalancing, and liquidity strategies. Subpages cover oracles & circuit breakers, trading limits, the Reserve, and research & economics.
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
| **Understand what Mento is** | This page (Overview) or [What Is Mento? (deep dive)](dive-deeper/what-is-mento.md) |
| **Swap or add/remove liquidity** | [Swap & liquidity](use/swap-and-liquidity.md) |
| **Get Mento stablecoins** (USDm, EURm, GBPm) | [Getting Mento stables](use/getting-mento-stables/README.md) |
| **Borrow, repay, or use the Stability pool** | [CDP operations](use/cdp-operations.md) |
| **Integrate** (quote, swap, contracts, SDK) | [Integration](build/integration/README.md) |
| **Deep dive: FPMMs, oracles, rebalancing** | [FPMMs](dive-deeper/fpmm/README.md) |
| **Fix a failed swap or other issue** | [Troubleshooting](use/troubleshooting.md) |

---

*Previous protocol architecture (v2) is documented in legacy docs and the [whitepaper](https://github.com/mento-protocol/whitepaper).*
