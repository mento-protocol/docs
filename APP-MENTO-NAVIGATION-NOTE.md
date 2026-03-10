# app.mento.org — Frontend structure (for docs writers)

**Purpose:** So doc instructions (e.g. Quick Start Guides) can use the **exact** section/button names shown in the app. This file is for internal reference and is gitignored.

**Source:** [mento-protocol/frontend-monorepo](https://github.com/mento-protocol/frontend-monorepo) (app lives in `apps/app.mento.org/`).

---

## Repo structure (relevant to app.mento.org)

- **Stack:** Next.js (App Router), React, Tailwind, shadcn/ui, `@mento-protocol/mento-sdk`, wagmi/viem, RainbowKit.
- **App path:** `apps/app.mento.org/`
- **Main entry:** `app/page.tsx` → **Swap** page (component `SwapPage`).
- **UI:** Button labels on the swap flow are **"Swap"** and **"Confirm Swap"** (from `page.tsx`).
- **Layout:** `app/components/layout/app-layout.tsx` wraps content with `Header` and footer. `app/components/nav/header.tsx` has the header (Logo, theme switch, ConnectButton); the fetched version did not expose top-level nav links in the snippet.
- **Routes:** The repo layout suggests a single main page (swap) at `/`; other sections (Pools, CDP, Stability pool) may be under other routes or not yet in the app — **verify on [app.mento.org](https://app.mento.org/)**.

---

## What to verify on the live app

Because the app is client-rendered, crawlers don’t see the full UI. When updating docs that say “In the app, open **Swap**” / “**Pools**” / “**CDP**” / “**Stability pool**”:

1. Open [https://app.mento.org/](https://app.mento.org/).
2. Note the **exact** labels for:
   - Swapping (e.g. “Swap”, “Trade”, or tab name).
   - Adding liquidity (e.g. “Pools”, “Liquidity”, “Earn”).
   - Borrowing / CDP (e.g. “Borrow”, “CDP”, “Lend”).
   - Stability pool (e.g. “Stability pool”, “Stake”, “Stability”).
3. Update the Quick Start Guides (and any other “Where” lines) to match.

---

## Monorepo apps (for reference)

| App | Path | Role |
|-----|------|------|
| app.mento.org | `apps/app.mento.org/` | Mento Exchange UI (swap, liquidity, etc.) |
| governance.mento.org | `apps/governance.mento.org/` | Governance UI |
| minipay.mento.org | `apps/minipay.mento.org/` | MiniPay DApp |
| reserve.mento.org | `apps/reserve.mento.org/` | Reserve UI |
| ui.mento.org | `apps/ui.mento.org/` | Component library showcase |

---

*Last inferred from frontend-monorepo (main): app layout, page.tsx, nav/layout components. Confirm labels on the live site before publishing doc changes.*
