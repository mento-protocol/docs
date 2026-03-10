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

**Why a different design?** Most DEXs use **curve-based AMMs** (e.g. constant-product pools): the swap price is derived only from the pool’s reserves and changes only when someone trades. That leads to **slippage** (traders don’t get the true market rate) and **LVR** (arbitrageurs profit when the pool’s quote is stale). For FX, where the fair rate is already known off-chain, we don’t need the pool to *discover* the price — we need it to **use** it.

**Mento V3’s approach: Fixed-Price Market Makers (FPMMs).** Each pool is tied to an **oracle** (an external price feed). The pool **always quotes the oracle rate** (minus a fee). There is no reserve-based curve: execution is at the oracle, so there is **no curve-based slippage** and **no LVR** from a stale pool price. When the oracle is accurate, traders get the FX rate and LPs are not drained by arbitrage.

**How the protocol is structured:**

- **Trading limits and circuit breakers** — These exist for when the oracle is wrong, stale, or manipulated. **Trading limits** cap how much can flow per token over short and longer time windows, so the pool can’t be drained in one go even if the oracle is bad. The **circuit breaker** can halt trading when the oracle is invalid, stale, or when safety thresholds are breached.
- **Fees and the swap spread** — Swaps pay fees (LP and protocol). The **swap spread** (the gap between buy and sell prices around the oracle) creates a band within which arbitrage is unprofitable even if the oracle differs slightly from the fair rate — so small oracle errors don’t immediately turn into arbitrage losses. Fees also fund the protocol and reward LPs.
- **Liquidity strategies (rebalancing)** — Because there is no curve, the pool always quotes the oracle and **reserves can become one-sided** (e.g. too much of one token, too little of the other) as users trade. **Liquidity strategies** are allowlisted contracts that can **rebalance** the pool: they take the surplus token from the pool and return the other at the oracle rate, with a **capped incentive**. That brings inventory back toward a more balanced state so the pool can keep serving trades.
- **Fees and incentives across the protocol** — The protocol uses **fees and incentives** to incentivize different roles: LPs earn from swap fees, keepers and strategies earn rebalance incentives, governance (MENTO token holders) sets parameters and can direct revenue. So the design both protects the pools and aligns actors.

**One invariant for all operations.** Every Mento V3 pool keeps a single number constant across swaps, liquidity provision, and rebalancing: **value at the oracle per LP share**. In symbols:

$$I = \frac{V}{S}$$

Here **V** is the pool’s **value at the oracle price** (reserves valued using the oracle rate), **S** is the total **LP share supply**, and **I** is that value per share. So your share of the pool always represents a well-defined amount at the oracle rate. This **I** is preserved on **swap** (reserves change, V and S do not), **mint** and **burn** (you add or remove value in proportion, so I stays the same), and **rebalance** (the strategy returns the other token at the oracle rate, so V and S are unchanged). For the full picture of operations and rebalancing, see [FPMMs](dive-deeper/fpmm/README.md).

**What you can do.** You can **swap** at the oracle rate, **add or remove liquidity** to FPMM pools, or **obtain Mento stablecoins** (USDm, EURm, GBPm) via those pools or by **borrowing** (e.g. GBPm via a CDP). Stables like USDm and EURm are backed by a **Reserve**; others like GBPm are **CDP-backed** (collateralized debt). Governance is driven by the **MENTO** token.

For more on why Mento uses oracle pricing instead of curve-based AMMs, and on pool mechanics and rebalancing, see [FPMMs](dive-deeper/fpmm/README.md) in **Dive Deeper**.

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
