# Improvement suggestions: docs_old

Review of `vendor/docs_old` with concrete improvements for structure, content, consistency, and maintainability. Use this alongside `vendor/docs/DOC_STRUCTURE_AND_FLOW.md`, `MERGE_OLD_AND_NEW_DOCS.md`, and `vendor/DOCS_V3_SUGGESTIONS.md`.

---

## 1. Structure and navigation

### 1.1 Merge “Getting Mento stables” and “How to source Mento stables”

**Problem:** Two parallel sections cover the same user goal (“how do I get USDm/EURm/GBPm?”):

- **Use Mento → Getting Mento Stables** (README + on-celo, on-mobile, from-other-chains, via-centralized-exchanges)
- **Use Mento → How to source Mento stables** (on-celo, centralized-exchanges, from-other-chains, on-ramp-providers, automation-via-mate)

SUMMARY lists both, so users see duplicate entry points and duplicated topics (e.g. “On Celo” in both trees).

**Suggestions:**

- Keep **one** section: **Getting Mento stables** (or “How to get Mento stables”) as the single entry.
- Merge content: use the richer version per topic (e.g. use-mento “From other chains” has step-by-step Squid/Portal; how-to-source has MATE and more bridge detail). Combine into single pages: On Celo, On mobile, From other chains, Via CEX, On-ramps, Automation (MATE).
- Remove the duplicate **How to source Mento stables** nav branch; redirect or in-page links from old URLs if needed.
- In SUMMARY, have one “Getting Mento stables” with subpages only under it (no second “How to source…” block).

### 1.2 Remove or repurpose “Users” section

**Problem:** `users/trading-guide/` overlaps with use-mento (getting stables, swap, CEX, DEX, on-ramp). The trading guide README contains **broken links** (`(broken-reference)` placeholders) and is less complete than use-mento + getting-mento-stables.

**Suggestions:**

- Either **remove** `users/` from the nav and merge any unique content (e.g. limit orders, max slippage) into use-mento (e.g. swap-and-liquidity or a short “Trading tips” subsection).
- Or **fix** all links and fold “Trading guide” under Use Mento as a single “Trading guide” page that links to Getting stables, Swap & liquidity, and CEX/DEX/on-ramp pages instead of duplicating them.

### 1.3 Consolidate governance content

**Problem:** Governance appears in three places:

- **Overview → Governance & the MENTO Token** (understanding, participating, tokenomics, watchdogs)
- **Governance & Token** (top-level: overview, scope, MENTO token, airdrop, components, watchdogs)
- **Protocol Concepts → Governance** (verification)

Content and naming overlap (e.g. “Governance overview” vs “Understanding Mento Governance”).

**Suggestions:**

- Pick **one** governance home (e.g. Overview → Governance & the MENTO Token) and make it the single “Governance” entry in SUMMARY.
- Move “Governance & Token” top-level items under that section (or merge into the overview pages). Remove the duplicate top-level “Governance & Token” nav block.
- Keep Protocol Concepts → Governance only for **verification** (on-chain gov) and link from the main governance section.

### 1.4 Consolidate protocol / protocol-concepts / overview core-concepts

**Problem:** Protocol mechanics appear in:

- **overview/core-concepts/** — FPMMs, oracles, rebalancing, reserve, stability, broker (v2), trading limits, etc.
- **protocol-concepts/** — stability, reserve, asset-exchanges (broker, BiPoolManager, etc.), oracles, circuit breaker, governance
- **protocol/** — oracles, reserve, stability, risks, trading-limits

There is triple overlap (e.g. reserve, stability, oracles, trading limits in multiple trees).

**Suggestions:**

- Treat **Overview → Core concepts** as the **single** L1 concept set for v3. One page per concept: FPMMs, Oracles, Rebalancing, Trading limits & breakers, Reserve, Stability. Mark v2-only (Broker, Virtual AMMs) as legacy and link to Legacy (v2).
- **Protocol-concepts** and **protocol**: Merge into Core concepts or into Build (e.g. “Protocol architecture” under Build). Remove duplicate “Protocol” and “Protocol concepts” top-level sections so there’s one “Concepts” story, not three.

### 1.5 Order SUMMARY for task-first users

**Problem:** SUMMARY order is Overview → Use Mento → Build → Economics → Governance & Token → Protocol Concepts. “Use” is already early, but “Economics” and “Governance & Token” sit between Build and Protocol Concepts and duplicate Overview content.

**Suggestions:**

- Order: **Overview** → **Use Mento** → **Core concepts** (single section) → **Build on Mento** → **Economics** → **Governance** (single section).
- So: high-level → do something → understand concepts → integrate → economics → governance. No separate “Protocol concepts” block if merged into Core concepts.

### 1.6 Clarify “pulled_from_docs_mento_org”

**Problem:** `pulled_from_docs_mento_org/` is a snapshot of live docs. It duplicates overview and use-mento content and can confuse contributors (which version is source of truth?).

**Suggestions:**

- Add a short **README** in that folder (you have one) stating: “Snapshot for merge/comparison only; do not link from SUMMARY. Prefer editing files under overview/, use-mento/, etc.”
- After merging any missing content into the main tree, consider **removing** `pulled_from_docs_mento_org` from the repo or moving it to a `/archive` so the main doc tree has no duplicate structure.

---

## 2. Content quality and consistency

### 2.1 Fix broken links and assets

**Problem:**

- **users/trading-guide/README.md**: Links to “centralized”, “decentralized”, “on-ramp partners”, “mento protocol directly”, “this article” are `(broken-reference)`.
- **use-mento/getting-mento-stables/via-centralized-exchanges.md**: Image `../../.gitbook/assets/image.png` — path may break depending on build; caption is empty.

**Suggestions:**

- Replace every `(broken-reference)` with correct relative links to the right pages (e.g. centralized-exchanges, decentralized exchanges, on-ramp-providers, getting-mento-stables/README or swap-and-liquidity).
- For the CEX image: use a path that matches your static asset layout (e.g. a dedicated `assets/` under docs_old or docs) and add a short alt/caption; or remove the image if redundant.

### 2.2 Fix wrong internal links

**Problem:**

- **overview/getting-started/what-is-mento-v3.md**: Points to `../../build-on-mento/integration-overview.md`. In docs_old the file is `build-on-mento/integration-overview/README.md`, not `integration-overview.md`.

**Suggestions:**

- Change to `../../build-on-mento/integration-overview/README.md` (or the canonical path you use in SUMMARY).
- Grep for `integration-overview.md` (no README) and fix all such references.

### 2.3 Unify “What is Mento?” vs “What is Mento? (v3)”

**Problem:** Two overview pages: `what-is-mento.md` (long, v3-focused) and `what-is-mento-v3.md` (shorter). README and SUMMARY point to “What is Mento?”; having two similar pages is confusing.

**Suggestions:**

- Keep **one** “What is Mento?” page as the main overview. Prefer the longer, clearer one (current what-is-mento.md) and ensure it’s explicitly v3.
- Turn the other into a redirect or merge its unique bits (e.g. “Where to go next” links) into the main page and delete the duplicate.

### 2.4 Standardize “On Celo” content

**Problem:**

- **use-mento/getting-mento-stables/on-celo.md**: Concrete (Mento app steps, Uniswap, “Need Help?”).
- **how-to-source-mento-stables/on-celo.md**: Very short (wallets, “Overview” only, no steps).

**Suggestions:**

- After merging “Getting” and “How to source,” keep **one** “On Celo” page. Use the fuller version (use-mento) and add any useful wallet/context from how-to-source (e.g. MetaMask, MiniPay, Valora) into a short “Wallets” subsection.

### 2.5 Enrich “From other chains” in one place

**Problem:** how-to-source “From other chains” has Squid, Portal, Curve, Axelar, MATE; use-mento “From other chains” has Squid, Portal, “Multichain Future,” best practices. Content is split and slightly different.

**Suggestions:**

- Single “From other chains” page: include Squid (steps), Portal (steps), Axelar, Curve/USDCet, and MATE in one flow. Add “Best practices” and “Need help?” from use-mento. Remove the duplicate page.

### 2.6 CDP operations: replace placeholder

**Problem:** `use-mento/cdp-operations.md` is a short placeholder (“Full CDP docs … will be added here”) with minimal bullet points.

**Suggestions:**

- Either add a **timeline** (“CDP docs coming in Q2 …”) and link to app + “Getting Mento stables” for borrow path, or add a minimal but concrete flow: “Borrow: connect wallet → collateral → borrow GBPm; Repay: …; Stability pool: …” with app link. Avoid leaving a bare placeholder without next steps.

### 2.7 SDK and Build: align with v3 and fix references

**Problem:**

- **build-on-mento/mento-sdk/guides/getting-a-quote.md**: Uses **Broker** and `mento.getAmountOut` / `getAmountIn`; Alfajores testnet and CELO/USDm example. v3 may use FPMM pools and different SDK entrypoints.
- **Integration overview** still lists “Integrate the Broker” (v2) alongside Integrate Stables and Integrate Oracles.

**Suggestions:**

- Mark **Broker-based** SDK examples as “Legacy (v2)” or move to a “Legacy integration” page. Add (or link to) v3 examples: quote/swap via **FPMM pool** or router and correct chain/mainnet if applicable.
- In Integration overview, either remove “Integrate the Broker” or make it a short “Legacy (v2)” subsection with a link to the main v3 integration path (FPMM + oracle).

### 2.8 Smart contracts: v2 vs v3

**Problem:** Build → Smart contracts list Broker, BiPoolManager, Pricing modules as “(v2 legacy)” but they’re still in the main list. New integrators may not know that v3 is FPMM-focused.

**Suggestions:**

- Add a short **“Mento v3 contracts”** subsection at the top: FPMM (pool), Factory, Router, OracleAdapter, BreakerBox, TradingLimits, LiquidityStrategy, Reserve. Then “Legacy (v2) contracts” with Broker, BiPoolManager, etc. So the default is v3.

---

## 3. Duplication and redundancy

### 3.1 Developers vs Build on Mento

**Problem:** There are two “build” trees:

- **build-on-mento/** — integration overview, SDK, smart contracts, deployments, oracles
- **developers/** — deployment-addresses, mento-core (architecture, design, smart contracts), running-an-oracle, SDK (getting quote, pairs, swap)

SDK and “getting a quote / swap” appear in both; deployment/verification and contracts are split.

**Suggestions:**

- Treat **Build on Mento** as the single “integrate and deploy” section. Merge **developers/** into it: move “mento-core” architecture/design under Build (e.g. “Architecture” or “Repository overview”); move developers/sdk into build-on-mento/mento-sdk (one set of guides); move deployment-addresses and verification into build-on-mento/deployments. Then remove the **developers/** nav block to avoid two “developer” entry points.

### 3.2 Economics: single section, no double placement

**Problem:** Economics appears as a top-level SUMMARY section; “Research & economics” is also under Overview → Core concepts. Overlap in audience and content.

**Suggestions:**

- Keep **Economics** as one section (stability, incentive structure v3, risks, research). In Core concepts, keep “Research & economics” as a **short** L1 page that links to the Economics section for detail. Don’t duplicate long content in both.

### 3.3 Security and audits

**Problem:** Audits/security appear in:

- **audits/audit-reports.md**
- **overview/security-and-risk/** (overview, audit reports)

**Suggestions:**

- One “Security & risk” or “Audits” entry under Overview (or a single Security top-level). Merge audit content into one page or clearly “Overview” → “Audit reports” with no duplicate list elsewhere.

---

## 4. Terminology and tone

### 4.1 Apply docs-guidelines consistently

**Problem:** `docs-guidelines.md` defines storyline (cost of price discovery → FPMM for FX), levels (L1/L2/L3), terminology (FPMM, oracle, rebalance, value protection, etc.), and deprecations (flash swaps, keeper incentives, Broker). Not all pages follow it; some still use “Broker” or v2 framing.

**Suggestions:**

- In **Overview and Core concepts**, use the guideline’s opening (e.g. “cost of discovery” → “for FX we have the price” → FPMM). Ensure FPMM, oracle, rebalance, value protection, trading limits are used as in the terminology table.
- In **Build**, prefer “rebalance” and “capped rebalance incentive” over “flash swap” and “keeper incentives”; mark Broker/BiPoolManager as legacy everywhere they appear.

### 4.2 Stablecoin set (USDm, EURm, GBPm, BRLm, XOFm)

**Problem:** Some pages say “USDm, EURm, GBPm”; others add BRLm, XOFm. Inconsistent.

**Suggestions:**

- Decide the **canonical** list for v3 (e.g. “USDm, EURm, GBPm, and others” or “USDm, EURm, GBPm, BRLm, XOFm”). Use the same list in README, What is Mento, Getting stables, and Build. If some stables are chain-specific, say so once (e.g. “On Celo: USDm, EURm, BRLm, XOFm; GBPm via CDP on …”).

### 4.3 “Mento stables” vs “Mento stablecoins” vs “stable assets”

**Problem:** Mixed usage across pages.

**Suggestions:**

- Prefer **“Mento stablecoins”** or **“Mento stables”** and use one consistently (e.g. “Mento stables (USDm, EURm, GBPm)”). Reserve “stable assets” for generic wording if needed; avoid alternating all three in the same section.

---

## 5. Missing or weak content

### 5.1 User troubleshooting

**Problem:** Guidelines call for “Troubleshooting (users)” (e.g. swap failed, wrong network). docs_old has no dedicated user troubleshooting page.

**Suggestions:**

- Add **Use Mento → Troubleshooting** (or “Common issues”): swap reverted (oracle/limits/breaker), wrong network, “no liquidity,” gas, and link to Discord/support. Short and actionable.

### 5.2 Integrator troubleshooting

**Problem:** Build has no dedicated “Troubleshooting” for integrators (reverts, quote vs execution, SDK errors).

**Suggestions:**

- Add **Build → Troubleshooting**: e.g. “Swap reverted” (value protection, limits, breaker), “Quote doesn’t match execution,” SDK/network errors, and link to contracts and Discord.

### 5.3 Quick start as “do one thing now”

**Problem:** Quick start guides are minimal (two links: Get Started, View Developer Docs). “Quick start” could be the 2-minute path (e.g. “First swap on app” / “First stable”).

**Suggestions:**

- Expand **Quick start** into short “Do one thing now” steps: (1) Get first stable: app → connect wallet → swap USDC → USDm. (2) Add liquidity: app → pool → add both tokens. (3) Integrate: SDK install → get pool → quote → swap. Each with a single link to the full guide. Keep it to one screen.

### 5.4 Analytics and dashboards

**Problem:** “Analytics & dashboards” exists under Overview but content may be thin or outdated.

**Suggestions:**

- Review and update links (e.g. Dune, Celo analytics, Mento app stats). If there’s no single dashboard, say “For analytics and volume, see [app.mento.org](…) and [list of links]” so the page is still useful.

### 5.5 Glossary

**Problem:** Guidelines mention a Glossary; SUMMARY doesn’t show a dedicated Glossary page.

**Suggestions:**

- Add **Overview → Glossary**: short definitions for DEX, FX, oracle, FPMM, reserves, invariant (I = V/S), rebalance, liquidity strategy, value protection, trading limits, circuit breaker, LVR, CDP, Mento stables. Link from “What is Mento?” and from concept pages. Eases onboarding for new readers.

---

## 6. Maintenance and process

### 6.1 Single source of truth for “getting stables”

**Problem:** After merging Getting stables and How to source, keep one set of files. CEX list, bridge list, and on-ramps change over time.

**Suggestions:**

- Maintain **one** “Via CEX” and “From other chains” page each. Prefer “check CoinGecko / exchange list” over long static CEX tables that go stale; or add “Last updated” and a review cadence.

### 6.2 Version and “What’s new”

**Problem:** README says “These docs describe Mento v3” but there’s no clear “What’s new in v3” or changelog for docs.

**Suggestions:**

- Add **Overview → What’s new (v3)** or **Changelog**: short list of v3 vs v2 (FPMM, oracle pricing, no Broker in main flow, CDP for GBPm, etc.). Helps migration and SEO.

### 6.3 Link checks

**Problem:** Relative links can break when files move (e.g. integration-overview.md vs README.md).

**Suggestions:**

- Run a link checker in CI (e.g. markdown-link-check, or your static site tool’s link check). Fix broken links and wrong paths (e.g. what-is-mento-v3 → integration-overview) as part of the cleanup above.

---

## 7. Summary checklist

| Area | Action |
|------|--------|
| **Structure** | Merge Getting stables + How to source into one section; remove duplicate nav. |
| **Structure** | Remove or fix users/trading-guide; consolidate governance; merge protocol/protocol-concepts into Core concepts. |
| **Structure** | Merge developers/ into Build on Mento; clarify or archive pulled_from_docs_mento_org. |
| **Navigation** | Single order: Overview → Use → Core concepts → Build → Economics → Governance. |
| **Links** | Fix broken-reference in users/trading-guide; fix integration-overview link in what-is-mento-v3; fix CEX image path. |
| **Content** | One “What is Mento?”; one “On Celo” and “From other chains” after merge; fill CDP placeholder or add timeline. |
| **Build** | v3-first contracts and SDK (FPMM, not Broker); mark v2 as legacy; add integrator troubleshooting. |
| **Missing** | User troubleshooting; Glossary; stronger Quick start; “What’s new in v3.” |
| **Consistency** | Apply docs-guidelines (storyline, terms, v2 deprecation); unify stablecoin list and “Mento stables” wording. |
| **Maintenance** | One source per topic; link checker; optional “Last updated” for CEX/bridges. |

Use this list to prioritize: first fix broken links and merge the two “getting stables” flows, then consolidate governance and protocol sections, then add missing troubleshooting and glossary, then refine Build for v3 and SDK examples.
