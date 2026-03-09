# Doc structure and how different consumers traverse it

This note explains the current tree, the audiences we assume, and how each is expected to move through the docs. Use it to tune the flow (order, links, or structure).

---

## 1. Current tree (SUMMARY = table of contents)

```
README (Home)
├── Overview
│   ├── What is Mento?        → README itself
│   ├── How it works & stablecoins
│   ├── Quick start
│   ├── Glossary
│   └── What's new
├── Concepts
│   ├── FPMMs
│   ├── Oracles
│   ├── Rebalancing & strategies
│   ├── Limits & breakers
│   └── Reserve & stability
├── Build
│   ├── Integration guide
│   ├── Architecture
│   ├── Contracts
│   ├── SDK
│   ├── Deployments
│   └── Troubleshooting (integrators)
└── Use
    ├── Getting stables
    ├── FPMM operations
    ├── CDP operations
    ├── Troubleshooting (users)
    ├── Governance
    └── Security
```

**Design idea:** Four buckets — **Overview** (what/why, plain), **Concepts** (mechanisms, L1), **Build** (integrate, L2/L3), **Use** (operations). Levels: L1 = no code/contracts, L2 = contracts/flows, L3 = paths/refs/SDK.

---

## 2. Assumed consumers (personas)

| Persona | Goal | Primary need |
|----------|------|----------------|
| **New / casual** | “What is Mento? Is it safe?” | High-level story, no jargon; then optional depth. |
| **Get stables** | “How do I get USDm / EURm / GBPm?” | One entry → swap vs borrow vs CEX/bridge; then app or ops. |
| **LP (FPMM)** | “How do I add/remove liquidity? What are the risks?” | Use: FPMM operations (mint/burn); Concepts: rebalancing, value per share. |
| **CDP user** | “Borrow, repay, stability pool?” | Use: CDP operations; Concepts: Reserve & stability. |
| **Integrator** | “Quote, swap, contracts, SDK, addresses.” | Build: Integration guide → Architecture, Contracts, SDK, Deployments, Troubleshooting. |
| **Research / audit** | “Invariants, design, code.” | Concepts (FPMM, oracles, rebalance, limits) → Build (contracts, architecture). |
| **Governance / security** | “How do I participate? Audits? Verification?” | Use: Governance, Security; Build: Deployments. |

---

## 3. How we assume they traverse the tree

- **New / casual**  
  **Home (README)** → maybe **How it works & stablecoins** → optional **Quick start** or **Glossary**. Concepts only if they click “learn more.”

- **Get stables**  
  **Home** → **Getting stables** (single entry). From there: **FPMM operations (swap)** or **CDP operations (borrow)** or CEX/other chains. **Quick start** can also land them on “first swap” or “first stable” and then link to Getting stables / FPMM / CDP.

- **LP (FPMM)**  
  **Home** → **FPMM operations** (mint & burn, rebalance). May then go **Concepts**: Rebalancing & strategies, Reserve & stability, FPMMs. Build only if they care about contracts/SDK.

- **CDP user**  
  **Home** → **CDP operations** (borrow, repay, stability pool). May then go **Reserve & stability** for peg/mechanics. Governance/Security if they care about risk or participation.

- **Integrator**  
  **Home** → **Integration guide (Build README)** → **Architecture**, **Contracts**, **SDK**, **Deployments**. **Troubleshooting (integrators)** when something breaks. Concepts (FPMM, Oracles) when they need “why” or invariants.

- **Research / audit**  
  **Concepts** (full set: FPMMs, Oracles, Rebalancing, Limits, Reserve) → **Build** (Architecture, Contracts). Home/Use only for context.

- **Governance / security**  
  **Home** → **Governance** or **Security**; **Deployments** for addresses/verification.

So in practice:
- **Task-first users** (get stables, LP, CDP, integrate) go **Home → one Use or Build entry** and then drill down or sideways.
- **Understanding-first users** (new, research) go **Overview → Concepts** and optionally Build.
- **Reference users** (glossary, what’s new, troubleshooting) use **Overview** or the relevant Use/Build section.

---

## 4. Where the flow can feel wrong

1. **Order in SUMMARY**  
   Right now: Overview → Concepts → Build → Use. So “Use” (getting stables, FPMM ops, CDP ops) comes **after** Build. Many users care about “how do I do X?” before “how is it built?” So putting **Use** before **Build** could match how most people search (task-first).

2. **Single entry for “do something”**  
   Home already points to Getting stables, FPMM operations, CDP operations, and the app. That’s good. But in the **tree** (SUMMARY), Use is last; if someone opens the sidebar, they see Overview → Concepts → Build → Use. Making **Use** the second section (after Overview) would put “Get stables / Swap / Borrow / Stability pool” higher in the nav.

3. **Quick start vs Getting stables**  
   Quick start is “first swap / first stable / add liquidity / integrate” in one page; Getting stables is “paths to get stables” and routes to FPMM swap, CDP borrow, CEX, etc. Overlap is intentional (both can lead to the app and to FPMM/CDP ops), but we could make Quick start explicitly “Start here if you want to do something in the next 2 minutes” and Getting stables “All ways to get USDm/EURm/GBPm.”

4. **Concepts before or after Use**  
   Concepts explain *why* and *how it works* (oracle, rebalance, limits). Some users want “do a swap” first and only later “why is there no slippage?” So Concepts after Use (in nav) fits task-first; Concepts before Use fits “understand then act.” Right now Concepts come before Use, which favors “understand then act.”

5. **No explicit “Start here” paths**  
   We don’t have a single page that says “I want to … → go here” for each persona. The Home table does that by intent (“Get stables”, “Swap, add liquidity”, etc.), but the **tree** doesn’t. Adding a short “For different readers” or “Start here” block on Home (or a dedicated page) could make traversal clearer.

---

## 5. Suggested changes to improve flow

- **Reorder SUMMARY** to: **Overview** → **Use** → **Concepts** → **Build**.  
  So: What is Mento / How it works / Quick start / Glossary / What’s new, then **Getting stables / FPMM operations / CDP operations / Troubleshooting (users) / Governance / Security**, then Concepts, then Build. That puts “do something” before “understand in depth” and “integrate.”

- **Keep Home as the hub** with the current “I want to…” table and the app link, so every persona still starts from one place and jumps to the right doc.

- **Optional: “Start here” on Home**  
  One line per persona, e.g.:  
  “**Just want stables?** → [Getting stables](use/getting-stables.md) or [Mento app](https://app.mento.org/).  
  **Adding liquidity?** → [FPMM operations](use/fpmm-operations.md).  
  **Building on Mento?** → [Integration guide](build/README.md).  
  **Want the full picture?** → [How it works](overview/intro.md) then [Concepts](concepts/fpmm.md).”

- **Optional: Quick start as “Do one thing now”**  
  Keep it short: “Use the app for swap / add liquidity / borrow / stability pool; for details see Getting stables, FPMM operations, CDP operations.” So Quick start is clearly the “fast path,” not a duplicate of Getting stables.

---

## 6. Summary

| Aspect | Current | Assumed traversal |
|--------|---------|-------------------|
| **Tree order** | Overview → Concepts → Build → Use | Task-first users hit Use last in nav. |
| **Entry point** | Home (README) with table | All personas start at Home; table routes by intent. |
| **Get stables** | Getting stables → FPMM swap / CDP borrow / CEX / etc. | One entry; then operation or app. |
| **LP / CDP** | FPMM operations, CDP operations | From Home or Getting stables; Concepts on demand. |
| **Integrate** | Build README → Architecture, Contracts, SDK, Deployments | Linear; Concepts when needed. |
| **Understand** | Intro → Concepts (full set) | Overview first; Concepts for depth. |

To improve flow: reorder SUMMARY so **Use** comes before **Concepts** and **Build**; optionally add a short “Start here” block on Home and sharpen Quick start as the “do one thing now” path.
