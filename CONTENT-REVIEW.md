# Content review: streamlining suggestions

This document summarizes a pass over the Mento V3 docs and suggests concrete changes to make the content feel less chaotic and better aligned with the **Understand | Use | Build** structure.

---

## 1. Broken links (fixed)

The following internal links were updated so they point under the current folder layout:

- **use/swap-and-liquidity.md** — "Build on Mento" and "FPMM contracts" now point to `../build/integration/` and `../build/smart-contracts/`.
- **understand/getting-started/glossary.md** — "Core concepts" and FPMM/Oracles "See also" links now point to `../fpmm/README.md` and `../fpmm/oracles-and-circuit-breakers.md`; "What is Mento?" fixed to same-folder `what-is-mento.md`.
- **understand/getting-started/quick-start-guides.md** — All `use-mento/` and `build-on-mento/` links updated to `use/` and `build/`; "Core Concepts" → "Concepts overview".
- **dive-deeper/fpmm/research-and-economics.md** — "Security & Risk" link updated to `../security/risk-overview.md`.

---

## 2. One clear storyline

**Current:** Overview → What Is Mento? and Concepts overview and Quick start all sit under "Understand"; FPMMs is a sibling. That creates two conceptual entry points (What Is Mento? vs Concepts overview) and overlap with the FPMM page.

**Suggested storyline:**

1. **Overview (README)** — Short hub: what Mento V3 is, "I want to…" table, links to Understand / Use / Build. No deep concepts here.
2. **Understand** — One conceptual path: **What Is Mento?** (why FX, why not CFMM, FPMM in one place) → **Concepts overview** (short index into FPMM subpages, CDPs, governance, security) → **FPMM** (reference detail: oracles, limits, rebalancing, Reserve, Research & Economics).
3. **Use** — Task-based: swap, get stables, CDPs, troubleshooting.
4. **Build** — Integration, SDK, contracts, deployments, oracles, troubleshooting.

So: **one** narrative intro (What Is Mento?), then Concepts overview as a **map** (not a second intro), then FPMM as the **reference** for pool mechanics.

---

## 3. Overlap: What Is Mento? vs FPMM README vs Concepts overview

**Overlap today:**

- **What Is Mento?** and **FPMM README** both explain: CFMM vs FPMM, LVR, slippage, invariant I = V/S, value protection. What Is Mento? is more formal (math, trading functions); FPMM README is slightly more operational (table of operations).
- **Concepts overview** is a short table that links to FPMM subpages; it repeats the same building blocks (FPMMs, oracles, limits, rebalancing, Reserve) that appear in What Is Mento? and in the FPMM README.

**Suggestions:**

- **Option A (recommended):** Treat **What Is Mento?** as the single conceptual intro. Trim the FPMM README so it does **not** re-explain CFMM vs FPMM and LVR from scratch; instead start with "FPMMs in Mento V3" and link to What Is Mento? for "Why oracle pricing?" and "Why not CFMM?". Keep the invariant, value protection, and operations table in the FPMM README (reference). Then **Concepts overview** stays as a short index only — remove or shorten any "building blocks" paragraph so it doesn’t duplicate What Is Mento?.
- **Option B:** Merge What Is Mento? and the FPMM README into one long "What Is Mento? & FPMMs" page under Understand, and have FPMM subpages (oracles, limits, rebalancing, Reserve, Research & Economics) as children. Concepts overview then only links to that page and its children.

Either way: **one** place for "why FPMM / no LVR / no curve slippage," and **one** place for the operational FPMM reference (invariant, mint/burn/swap/rebalance table).

---

## 4. Tone and level

**Current mix:** Overview and Use are plain language; What Is Mento? and FPMM are formal and math-heavy; Governance is generic DeFi governance copy; Build mixes high-level (Integration) with contract-level (Smart Contracts).

**Suggestions:**

- **Understand:** Keep concepts only in Understand (no code). It’s fine to keep math in What Is Mento? and FPMM for readers who want rigor; add a single sentence at the top of What Is Mento? like "For a math-free overview, see [Concepts overview](concepts-overview.md) and [FPMMs](fpmm/README.md)."
- **Use:** Keep short, action-oriented, app-first.
- **Build:** Start each top-level page (Integration, SDK, Smart Contracts, etc.) with one paragraph on "who this is for" and "what you’ll do," then link to siblings (e.g. "For contract addresses, see [Deployments](../deployments/).") so the Build tree feels like one path, not scattered topics.
- **Governance:** Replace generic "community ownership / progressive decentralization" with V3-specific bullets: what parameters are governed (fees, trading limits, circuit breaker, oracle config, pool allowlists, Reserve), and point to Research & Economics and MENTO Tokenomics for incentives. That aligns with research-and-economics.md and avoids a second, vaguer "governance 101."

---

## 5. Redundancy to trim

- **"Where to go next" vs "Start here" in README:** The Overview has both a "Start here" table (I want to swap / add liquidity / …) and "Where to go next" (Understand / Use / Build). Consider merging into one block: "I want to…" with a single "Or explore: Understand · Use · Build" line so there’s one place to look.
- **Building blocks table:** Appears in What Is Mento? and is echoed in Concepts overview and FPMM. Keep it **only** in What Is Mento? (or only in Concepts overview if you make that the single intro). Remove or shorten the duplicate in the other.
- **Economics intro:** Research & Economics repeats "Mento V3 is a DEX for on-chain FX… FPMM… no LVR" again. Replace that paragraph with: "Mento V3 uses FPMMs for efficient FX rates. For the design rationale, see [What Is Mento?](../getting-started/what-is-mento.md). Here we focus on value flows, fees, rebalancing, and incentives." Then keep the rest (fees, rebalancing, Reserve vs CDP, safety, MENTO, tables, risks, whitepaper).

---

## 6. Empty or thin pages

- **Governance overview (understand/governance-and-mento/README.md):** The page is only a title and front matter. Either (a) add 2–3 short paragraphs: what is governed (parameters, oracles, upgrades), who decides (MENTO / veMENTO), and "Next: [Understanding Mento Governance](understanding-mento-governance.md), [MENTO Tokenomics](mento-tokenomics.md)," or (b) remove the README from the TOC and let "Governance & MENTO" be a section header with the first child (Understanding Mento Governance) as the entry. Prefer (a) so the section has a real overview.

---

## 7. Governance and tokenomics

- Ensure **Understanding Mento Governance** and **MENTO Tokenomics** are clearly V3-only (no v2/Broker). Cross-link to **Research & Economics** for incentive structure and revenue flows so governance and economics feel like one story.
- **Watchdogs & Safety** and **Creating Proposals / Voting Process** are fine as-is; add one line in Watchdogs that points to **Security → Risk overview** for protocol-wide risk (oracle, reserve, smart contract).

---

## 8. Build section

- **Integration README:** The "Deployments & addresses" link points to `integrate-mento-stables.md`; the SUMMARY labels it "Deployments & addresses" but the file name is different. Consider renaming for clarity (e.g. `deployments-and-addresses.md`) or add a one-line note in the Integration README: "Contract addresses and networks: [Deployments & addresses](integrate-mento-stables.md)."
- **Repository Overview:** Sits under Build with no child links in SUMMARY; ensure it links to SDK, contracts, and deployments so it works as a "map" of the repo.
- No further v2/Broker remnants were found in the sampled Build pages; a quick grep for "v2" or "Broker" in build/ is recommended.

---

## 9. Glossary and quick starts

- **Glossary:** Links are fixed. Consider adding a line at the top: "Also see [Concepts overview](concepts-overview.md) for a short map of FPMM, CDPs, and governance."
- **Quick start guides:** Links fixed. The "Integrate" quick start now points to build/; ensure the Mento SDK installation link and Integration link are the only entry points from Understand so users don’t get duplicate "how to integrate" from multiple places.

---

## 10. Checklist of concrete edits

| Priority | Action |
|----------|--------|
| Done | Fix broken links (swap-and-liquidity, glossary, quick-start-guides, research-and-economics). |
| Done | **Option A:** Trim FPMM README to reference What Is Mento? for CFMM/FPMM/LVR; keep invariant and operations table in FPMM. |
| Done | Add body to Governance overview README. |
| Done | Shorten Research & Economics intro to one sentence + link to What Is Mento? |
| Done | One "Start here" table + "Explore by section" line in Overview README. |
| Done | Building blocks only in What Is Mento?; Concepts overview is short index with link to What Is Mento? |
| Done | Add "who this is for" and cross-links at the top of Build top-level pages (Integration, SDK, Smart Contracts, Deployments, Oracles, Troubleshooting). |
| Done | Governance Watchdogs: V3-only note and "see Risk overview" link. |
| Done | Glossary: "See also Concepts overview." |

---

## Summary

Streamlining comes from: **(1)** one conceptual intro (What Is Mento?) with FPMM as reference detail and Concepts overview as a map only; **(2)** removing duplicate explanations of CFMM/FPMM/LVR and of "building blocks"; **(3)** giving Governance overview a real body and aligning governance/tokenomics with Research & Economics; **(4)** a single, clear "Start here / explore" block on the Overview; **(5)** consistent cross-links (Security, Build, Research & Economics) so the doc set reads as one structure rather than scattered sections. The broken links identified above are already fixed.
