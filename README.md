---
description: >-
  Overview of Mento V3 and how these docs are organized. Start here to understand
  the protocol and find the right section for your goal.
---

# Overview

---

## What is Mento V3?

**A decentralized exchange (DEX) for onchain foreign exchange (FX).** Users swap stablecoins at **FX rates** — e.g. USDC ↔ GBPm at USD/GBP, or USDC ↔ EURm at USD/EUR — so onchain execution can compete with off-chain spot FX. The **core innovation** of Mento V3 is **Fixed-Price Market Makers (FPMMs)**: pools that quote an oracle rate instead of deriving price from reserves.

### Why a different design?

Most DEXs use **curve-based automated market makers (AMMs)**: the swap price comes from the pool’s reserves and only changes when someone trades. That causes **slippage** (traders miss the true rate) and **loss-versus-rebalancing (LVR)** (arbitrageurs profit when the quote is stale).

For FX, the fair rate is already known off-chain. We don’t need the pool to *discover* the price — we need it to **use** it.

### Fixed-Price Market Makers (FPMMs) — the core of V3

Every Mento V3 swap pool is an FPMM. Each pool is tied to an **oracle** (external price feed) and **always quotes that rate** (minus a fee).

- No reserve-based curve → no curve-based slippage, no LVR from a stale pool price.
- When the oracle is accurate, traders get the FX rate and **liquidity providers (LPs)** aren’t drained by arbitrage.

This design relies on **high-quality stablecoins** that accurately reflect the underlying fiat currencies—something that should increasingly be the case as the stablecoin space matures. Mento’s **circuit breakers** trip when those stablecoins move too far off peg, so trading can be halted until conditions are safe again.

### One invariant for all operations

Every FPMM pool keeps one number constant: **value at the oracle per LP share**,

$$I = \frac{V}{S}$$

- **V** = pool value at the oracle price (reserves valued at the oracle rate).
- **S** = total LP share supply.
- **I** = value per share at the oracle.

**I** is preserved on **swap** (V, S unchanged), **mint/burn** (value in proportion), and **rebalance** (strategy returns the other token at oracle rate)—when we ignore fees and incentives. All operations happen at fair value as long as the oracle rate is precise.

That makes the design natural: the core is to enforce that all operations are conducted at fair value (assuming the oracle rate is precise) and to protect against cases where the oracle rate is imprecise through additional protocol layers.

→ Full mechanics: [FPMMs](dive-deeper/fpmm/README.md).

### How the protocol is structured

Beyond the invariant, the protocol uses several building blocks—each with a different role. **Trading limits and the circuit breaker** protect the pool when the oracle is wrong, stale, or manipulated. **Liquidity strategies** address the fact that with no curve, reserves can become one-sided as users trade; they rebalance so the pool stays usable. **Fees and incentives** fund the protocol and reward different actors (LPs, keepers, governance); the swap spread in particular also adds a band where arbitrage is unprofitable if the oracle is slightly off.

| Piece | Role |
|-------|------|
| **Trading limits & circuit breakers** | Protect when the oracle is wrong, stale, or manipulated: limits cap flow per token over time; the circuit breakers trip (and halt trading) when stablecoins move too far off peg or when other safety thresholds are breached. |
| **Liquidity strategies (rebalancing)** | No curve → reserves can become one-sided. Allowlisted strategies rebalance: take surplus token from the pool, return the other at the oracle rate (capped incentive). Keeps the pool usable. |
| **Fees & incentives** | Fund the protocol and reward different actors: e.g. swap fees (LP and protocol), rebalance incentives for keepers and strategies, governance-driven revenue flows (MENTO). The swap spread in particular also provides additional arb protection when the oracle is slightly off. |

---

## How these docs are organized

The documentation is split into four sections. Use the one that matches your goal.

### [Get Started](get-started/quick-start-guides.md)

**For:** New users who want to do something with Mento V3 right away.

- **This page (Overview)** — What Mento V3 is and how the docs are organized (see above).
- **[Quick Start Guides](get-started/quick-start-guides.md)** — Step-by-step: your first swap, adding liquidity, borrowing a stable, earning in the Stability pool, or integrating.

### [Dive Deeper](dive-deeper/fpmm/README.md)

**For:** Readers who want to understand how the protocol works under the hood.

- **[FPMMs](dive-deeper/fpmm/README.md)** — Why Mento uses oracle pricing (and why curve-based AMMs don’t work well for FX), how Fixed-Price Market Makers work: the invariant, operations, rebalancing, and liquidity strategies. Subpages cover oracles & circuit breakers and TradingLimitsV2.
- **[CDPs](use/cdp-operations.md)** — How collateralized debt positions back synthetic Mento stables (e.g. GBPm).
- **[The Reserve](dive-deeper/the-reserve.md)** — How USDm and EURm are backed by the Reserve; two backing models (Reserve vs CDP).
- **[Protocol Economics](dive-deeper/protocol-economics.md)** — Value flows, fees, incentives, and revenue (FPMM, CDP, MENTO).
- **[Governance & MENTO](dive-deeper/governance-and-mento/README.md)** — How the protocol is governed, the MENTO token, tokenomics, and participation (voting, proposals, watchdogs).
- **[Security](dive-deeper/security/README.md)** — Risk overview and audit reports.

### [Build](build/integration/README.md)

**For:** Developers and protocols integrating with Mento V3.

- **[Integration](build/integration/README.md)** — How to add Mento stables, use oracles, and find deployment addresses. Links to the SDK, smart contracts, and deployments.
- **[Mento SDK](build/mento-sdk/README.md)** — JavaScript/TypeScript library for quotes and swaps.
- **[Smart Contracts](build/smart-contracts/README.md)** — Contract reference (FPMM, oracles, limits, strategies).
- **[Deployments](build/deployments/README.md)** — Addresses, verification, and parameters.
- **[Oracles](build/oracles/README.md)** — Technical details for oracle operators and integrators.
- **[Troubleshooting (integrators)](build/troubleshooting.md)** — Common integration issues.

### [Other](use/getting-mento-stables/README.md)

**For:** Getting stables, lookup, and supporting material.

- **[Getting Mento Stables](use/getting-mento-stables/README.md)** — Paths to obtain USDm, EURm, GBPm (app, Celo, mobile, other chains, CEX, on-ramp, automation).
- **[Glossary](reference/glossary.md)** — Short definitions of terms (AMM, FPMM, LVR, oracle, rebalance, etc.).
- **[GBPm/USDm parameters](reference/gbpm-usdm-parameters-reference.md)** — Recommended launch parameters for the GBPm/USDm deployment.
- **[Analytics & Dashboards](reference/analytics-and-dashboards.md)** — Links to reserve and on-chain analytics.

---

*Previous protocol architecture (v2) is documented in Mento V2 docs.*
