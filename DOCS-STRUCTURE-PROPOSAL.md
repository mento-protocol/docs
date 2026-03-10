# Docs structure: redundancy analysis and proposed restructure

This document analyzes redundancy in the current doc tree and proposes a simpler, v3-focused structure.

---

## 1. Current redundancy summary

| Area | Issue | Recommendation |
|------|--------|----------------|
| **Protocol Concepts (reference)** | Entire section is **v2/legacy**: Stability (CELO, vAMM, expansion/contraction), Reserve (110% collateral, BTC/ETH/CELO), Asset exchanges (Broker, BiPoolManager), Oracles (SortedOracles, CEX), Circuit breaker, Governance (verification). Overlaps conceptually with **Overview → Core Concepts** (v3). | **Remove** the whole "Protocol Concepts (reference)" section, or replace with a single **Legacy (v2) reference** page that points to whitepaper/blog and states v3 is in Core Concepts. |
| **Governance: two folders** | **overview/governance-and-the-mento-token/** (Understanding, Participating, Tokenomics, Watchdogs & Safety) and **governance-and-token/** (Governance Scope, MENTO Token, Airdrop, Governance Components, Governance Watchdogs). SUMMARY mixes both under one nav. governance-and-token content is v2 (BrokerProxy, BiPoolManager, Celo Governance). | **Consolidate**: Keep only **overview/governance-and-the-mento-token/**. Merge any unique, v3-relevant bits from governance-and-token (e.g. listing info, airdrop) into that tree; remove or archive v2-only pages (Governance Scope with Broker/Celo refs, duplicate Watchdogs). |
| **Getting Mento Stables: two path prefixes** | Children live under **use-mento/getting-mento-stables/** and **how-to-source-mento-stables/** (On-ramp Providers, Automation via MATE). Same nav, different dirs. | **Merge**: Move `how-to-source-mento-stables/*.md` into **use-mento/getting-mento-stables/** and update SUMMARY so all children use one path. Remove empty `how-to-source-mento-stables/`. |
| **Build: Integration Overview vs Integrate Mento Stables** | **Integration Overview** links to "Integrate the Broker" (v2; file may be missing). Standalone **Integrate Mento Stables** (build-on-mento/integrate-mento-stables.md) is short and `hidden: true`. Overlaps with Integration Overview → Integrate Stables. | **Single integration hub**: Keep **Integration Overview** as the hub; remove "Integrate the Broker" (v2). Make **Integrate Stables** the canonical page; remove or redirect **integrate-mento-stables.md** into it. |
| **Core Concepts README** | Points to "Protocol concepts (reference)" for "additional protocol-level reference". | **Update**: Remove that sentence (or point to "Legacy (v2)" if you keep one legacy page). |
| **Security & Risk** | Overview + Audit Reports. Audits also under Build → Smart Contracts → Audits. | **Optional**: Keep as-is, or add a single "Audit reports" link from Security to the Build section to avoid duplicating content. |

---

## 2. Proposed high-level structure (after cleanup)

```
Overview
├── Getting Started (unchanged)
├── Core Concepts (unchanged; remove pointer to protocol-concepts)
├── Glossary
├── Governance & the MENTO Token  ← single source: overview/governance-and-the-mento-token/
│   ├── Understanding Mento Governance
│   ├── Participating in Governance (veMENTO, Creating Proposals, Voting Process)
│   ├── MENTO Tokenomics
│   ├── Watchdogs & Safety
│   ├── [Optional: Airdrop, MENTO Token listing, Governance scope (v3-only)]  ← merge from governance-and-token
│   └── (remove: Governance Scope v2, Governance Components/Watchdogs if duplicate)
└── Security & Risk (unchanged)

Use Mento
├── Swap & liquidity
├── Getting Mento Stables  ← all children under use-mento/getting-mento-stables/
│   ├── On Celo, On Mobile, From Other Chains, Via CEX
│   ├── On-ramp Providers, Automation via MATE
│   └── (no how-to-source-mento-stables in nav)
├── CDP operations
└── Troubleshooting

Build On Mento
├── Integration Overview  ← drop "Integrate the Broker"; Integrate Stables + Oracles only
├── Mento SDK
├── Smart Contracts
├── Repository Overview
├── Integrate Mento Stables  ← keep as single page or merge into Integration Overview
├── Deployments, Oracles, Architecture, Troubleshooting
└── (no change to rest)

[REMOVED] Protocol Concepts (reference)
  → Replace with optional: "Legacy (v2)" single page under Overview or at bottom of TOC
```

---

## 3. Concrete actions (checklist)

- [ ] **Remove or collapse Protocol Concepts**
  - Remove from SUMMARY: entire "Protocol Concepts (reference)" block (Stability, Reserve, Asset exchanges, Oracles, On-Chain Circuit Breaker, Governance).
  - Either delete the `protocol-concepts/` folder, or add one `overview/legacy-v2.md` (or link in existing legacy doc) that says v2 concepts are deprecated and points to whitepaper/blog; then delete `protocol-concepts/`.
  - In **overview/core-concepts/README.md**: remove the line that links to "Protocol concepts (reference)" (or point to the single legacy page).

- [ ] **Consolidate Governance**
  - In SUMMARY: make every Governance item point under **overview/governance-and-the-mento-token/** (fix paths that currently use `governance-and-token/`).
  - Move or copy into overview tree: **MENTO Token** (listing), **Airdrop**, and any v3 **Governance Scope** content. Rewrite scope for v3 (no Broker/BiPoolManager).
  - Delete or archive **governance-and-token/** (or leave as redirects if your generator supports it).

- [ ] **Merge "Getting Mento Stables" paths**
  - Move **how-to-source-mento-stables/on-ramp-providers.md** and **automation-via-mate.md** into **use-mento/getting-mento-stables/**.
  - Update SUMMARY so those two entries use `use-mento/getting-mento-stables/on-ramp-providers.md` and `.../automation-via-mate.md`.
  - Update any internal links that pointed to the old paths. Delete **how-to-source-mento-stables/** if empty.

- [ ] **Integration Overview (Build)**
  - Remove "Integrate the Broker" from Integration Overview (v2; and file may be missing).
  - If **integrate-mento-stables.md** is redundant with **integration-overview/integrate-stables.md**, merge or make one redirect to the other and drop the standalone from SUMMARY.

- [ ] **Optional: Security ↔ Audits**
  - Keep Security & Risk → Audit Reports; if Build → Smart Contracts → Audits holds the same list, link from Security to that section instead of duplicating.

---

## 4. Result

- **One** concept layer: Overview + Core Concepts (v3 only).
- **One** governance tree under Overview.
- **One** "Getting Mento Stables" folder and nav.
- **No** separate Protocol Concepts (reference); optional single Legacy (v2) page.
- Fewer broken or v2-specific links (Broker, protocol-concepts).

If you want, next step can be applying these edits (SUMMARY, moving/merging files, and updating cross-links).
