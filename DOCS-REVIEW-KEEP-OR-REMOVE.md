# Docs review: keep vs remove

Review of all content in `vendor/docs` that is **not** in SUMMARY (or is duplicate/v2). Recommendation: **remove** legacy and duplicates; **keep & adjust** only what supports v3 and is referenced.

---

## REMOVE (v2, duplicate, or obsolete)

### 1. `developers/` — **Remove entire folder**
- **Content:** Mento Core architecture, Broker, BiPoolManager, SortedOracles, Reserve, StableToken, BreakerBox, IExchangeProvider, deployment-addresses, SDK guides, running-an-oracle.
- **Why:** Explicitly **V2** (MU01, “legacy docs here”). All contract docs describe Broker/vAMM, not FPMM v3. Build On Mento (SUMMARY) already has v3-oriented Integration Overview, SDK, Smart Contracts, Deployments.
- **Action:** Delete `developers/` entirely.

### 2. `protocol/` — **Remove entire folder**
- **Content:** stability.md, reserve.md, oracles/, risks.md, trading-limits.md.
- **Why:** **V2** (CELO, USDCet, reserve expansion/contraction, SortedOracles). Duplicate of the old protocol-concepts we already removed. v3 is in Overview → Core Concepts (The Reserve, Oracles & circuit breakers, Trading limits).
- **Action:** Delete `protocol/` entirely.

### 3. `users/trading-guide/` — **Remove entire folder**
- **Content:** README (three ways to buy/sell), centralized-exchanges, decentralized-exchanges, limit-order-and-max-slippage, mint-burn-with-mento, on-ramp-providers.
- **Why:** Overlaps **Use Mento → Getting Mento Stables** (which is in SUMMARY). Contains **broken links** (e.g. `how-to-source-mento-stables`). **mint-burn-with-mento** is v2 (mint/burn with CELO, 0.25% fee, trading bot). Limit/slippage is generic CEX/DEX; FPMM v3 has no curve slippage.
- **Action:** Delete `users/` entirely.

### 4. `governance/governance.md` — **Remove**
- **Content:** One sentence: “Mento Core governed by Celo governance; separate Mento governance under development.”
- **Why:** Outdated and redundant. Full governance is in **Overview → Governance & the MENTO Token** (in SUMMARY).
- **Action:** Delete file and empty `governance/` folder.

### 5. `pulled_from_docs_mento_org/` — **Remove entire folder**
- **Content:** Snapshot from docs.mento.org for merge/comparison.
- **Why:** Backup/snapshot only; not live content. Merge already done.
- **Action:** Delete `pulled_from_docs_mento_org/` entirely.

### 6. `audits/audit-reports.md` — **Remove**
- **Content:** Short placeholder (“audits will be shared here”; link to Celo audits).
- **Why:** **Security & Risk → Audit Reports** in SUMMARY points to `overview/security-and-risk/audit-reports.md`, which has the real audit table (veMento, Mento Governance, Macro, Sherlock, etc.). Single canonical place is enough.
- **Action:** Delete `audits/audit-reports.md` and remove empty `audits/` folder.

### 7. Root-level notes (internal/obsolete) — **Remove from repo or keep out of GitBook**
- **DOCS-STRUCTURE-PROPOSAL.md** — Restructure done; no longer needed. **Remove.**
- **GITBOOK_SYNC.md** — Refers to `vendor/docs_old` and content path. **Remove** (or rewrite if GitBook path is still `vendor/docs`).
- **IMPROVEMENTS.md** — Refers to docs_old and merge suggestions already applied. **Remove.**
- **APP-MENTO-NAVIGATION-NOTE.md** — Internal note for docs writers (app labels, structure). **Keep file** for editors but **do not add to SUMMARY** (not user-facing).

---

## KEEP & ADJUST

### 8. `README.md` — **Fix broken links**
- **Issue:** Links to `overview/getting-started/whats-new-v3.md` and `overview/legacy-v2.md` which **do not exist**.
- **Action:** Remove “What's new in v3” link (or point to What is Mento?). Replace legacy link with a short line: “Previous architecture (v2): see legacy docs or whitepaper” (no broken URL).

### 9. `overview/getting-started/what-is-mento-v3.md` — **Merge or remove**
- **Content:** Same message as **what-is-mento.md** (v3 DEX, FPMMs, oracle rate). Slightly different wording and “Where to go next” links (some link to old filenames: oracles-and-price-feeds, trading-limits-and-circuit-breakers).
- **Action:** **Remove what-is-mento-v3.md.** Keep **what-is-mento.md** as the single “What is Mento?” page (already in SUMMARY). If any unique lines in what-is-mento-v3 are useful, fold them into what-is-mento first.

### 10. `overview/getting-started/app-mento-labels.md` — **Keep, do not add to SUMMARY**
- **Content:** UI labels for app.mento.org (Swap, Confirm Swap, etc.) for writers/Quick Start guides.
- **Action:** Keep as internal reference. Do **not** add to SUMMARY (not for end users).

### 11. `docs-guidelines.md` — **Keep, do not add to SUMMARY**
- **Content:** Internal v3 rewrite guidelines (storyline, levels, scope).
- **Action:** Keep for doc maintainers. Do **not** add to SUMMARY.

### 12. `introduction/why-mento.md` — **Already in SUMMARY**
- **Action:** No change. Already added to SUMMARY and updated for v3.

---

## Summary table

| Item | Action |
|------|--------|
| `developers/` | **Remove** (v2) |
| `protocol/` | **Remove** (v2) |
| `users/` (trading-guide) | **Remove** (overlap + v2) |
| `governance/governance.md` | **Remove** (+ empty folder) |
| `pulled_from_docs_mento_org/` | **Remove** (backup) |
| `audits/audit-reports.md` | **Remove** (duplicate of security-and-risk) |
| DOCS-STRUCTURE-PROPOSAL.md | **Remove** |
| GITBOOK_SYNC.md | **Remove** |
| IMPROVEMENTS.md | **Remove** |
| APP-MENTO-NAVIGATION-NOTE.md | **Keep** file, not in SUMMARY |
| README.md | **Fix** broken links (whats-new-v3, legacy-v2) |
| what-is-mento-v3.md | **Remove** (canonical = what-is-mento.md) |
| app-mento-labels.md | **Keep** (internal), not in SUMMARY |
| docs-guidelines.md | **Keep** (internal), not in SUMMARY |
| introduction/why-mento.md | **Keep** (in SUMMARY) |

---

If you want, next step is to apply these removals and the README link fix.
