# Current TOC (extracted)

## Overview
- **Getting Started** (README)
  - What Is Mento?
  - Quick Start Guides
  - GBPm/USDm parameters (reference)
  - Analytics & Dashboards
- **Core Concepts**
  - Fixed-Price Market Makers (FPMMs)
  - Oracles, price feeds & circuit breakers
  - Rebalancing & strategies
  - Trading limits
  - The Reserve
  - Research & Economics
- **Glossary**
- **Governance & the MENTO Token**
  - Understanding Mento Governance
  - Participating in Governance
    - veMENTO & Voting Power
    - Creating Proposals
    - Voting Process
  - MENTO Tokenomics
  - Watchdogs & Safety
  - MENTO Token
    - Listing information
  - Airdrop
- **Security & Risk**
  - Overview
  - Audit Reports

## Use Mento
- Swap & liquidity (FPMM operations)
- **Getting Mento Stables**
  - On Celo, On Mobile, From Other Chains, Via Centralized Exchanges
  - On-ramp Providers, Automation via MATE
- CDP operations (borrow, repay, stability pool)
- Troubleshooting

## Build On Mento
- **Integration Overview**
  - Integrate Stables, Integrate Oracles, Deployments & addresses
- **Mento SDK**
  - Installation, Guides (Getting Exchange Pairs, Getting a Quote, Initiating a Swap)
- **Smart Contracts**
  - TradingLimits, SortedOracles, BreakerBox, Reserve, StableToken, Audits
- Repository Overview
- **Deployments**
  - Addresses, Verification, Parameters
- **Oracles**
  - Oracle Client (Price Sources), Becoming an Oracle Provider
- Troubleshooting (integrators)

---

# Problems with current structure

1. **"Overview" is a catch‑all** — It mixes learning (Getting Started, Core Concepts, Glossary) with Governance and Security. One big bucket with different purposes.
2. **Build is a long flat list** — Seven top-level items with no grouping. Hard to scan.
3. **Duplicate "Deployments" meaning** — "Deployments & addresses" under Integration vs "Deployments" (Addresses, Verification, Parameters). Slightly confusing.
4. **Three levels under Governance** — Participating → veMENTO / Proposals / Voting. Fine but adds depth; could be flattened in the nav.
5. **Two Troubleshootings** — One under Use, one under Build. Clear once you see context; labels could be more explicit.

---

# Proposed cleaner structure

**Idea:** Replace the single **Overview** section with **four clear top-level sections**. Group **Build** under sub-headings so it’s easier to scan. Shorten labels where it helps.

**New top-level (6 sections):**

| Section | Purpose |
|--------|--------|
| **Getting started** | First steps: README, What is Mento?, Quick start, Analytics; optional: Glossary or params here |
| **Concepts** | How v3 works: FPMMs, Oracles, Rebalancing, Trading limits, Reserve, Research & Economics |
| **Governance** | MENTO, voting, tokenomics, watchdogs, airdrop, listing |
| **Security** | Risk overview, audit reports |
| **Use Mento** | Swap, getting stables, CDP, troubleshooting (unchanged) |
| **Build** | Integration, SDK, contracts, deployments, oracles, troubleshooting (grouped in SUMMARY) |

**Concrete changes:**

1. **Drop "Overview"** — Use **Getting started**, **Concepts**, **Governance**, **Security** as four separate top-level sections. Same files; only SUMMARY changes.
2. **Build:** Keep the same pages but in SUMMARY add a short comment or grouping so the sidebar shows:
   - Integration (Overview + Stables, Oracles, Deployments & addresses)
   - SDK (README, Installation, Guides)
   - Smart contracts
   - Deployments (Addresses, Verification, Parameters)
   - Oracles
   - Repository & troubleshooting  
   So "Build" is one section with a clear order, no extra folders.
3. **Governance:** Optionally flatten so "Participating in Governance" is one nav item with three children (veMENTO, Creating Proposals, Voting) — already the case; just keep as is or simplify the label.
4. **Naming:** "Build On Mento" → **Build** (shorter). "Getting Mento Stables" can stay or become "Get Mento stables".

Resulting TOC (high level):

```
Getting started
  README, What is Mento?, Quick start, GBPm/USDm params, Analytics & Dashboards

Concepts
  Core Concepts (README) + FPMMs, Oracles, Rebalancing, Trading limits, Reserve, Research & Economics

Governance
  Governance & MENTO (README), Understanding, Participating (veMENTO, Proposals, Voting), Tokenomics, Watchdogs, MENTO Token (Listing), Airdrop

Security
  Security & Risk (README), Overview, Audit Reports

Use Mento
  Swap & liquidity, Getting Mento Stables (6 children), CDP operations, Troubleshooting

Build
  Integration Overview (3 children), Mento SDK (Installation, Guides), Smart Contracts (6), Deployments (3), Oracles (Client, Becoming provider), Repository Overview, Troubleshooting (integrators)
```

File paths stay the same; only SUMMARY.md is edited to reorder and use the new section titles.
