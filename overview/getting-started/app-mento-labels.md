# app.mento.org — UI labels (for Quick Start Guides)

**Purpose:** Single source of truth for button and control labels used in the docs. Sourced from [mento-protocol/frontend-monorepo](https://github.com/mento-protocol/frontend-monorepo) `apps/app.mento.org/`. When the app changes, update this file and the Quick Start Guides to match.

---

## Swap flow (current app — single-page swap)

| Element | Label in app | Source (file) |
|--------|----------------|---------------|
| Connect wallet | (header connect button) | `@repo/web3` `ConnectButton` |
| From/To token when empty | **Select** | `app/components/swap/swap-form.tsx` (trigger: `field.value \|\| "Select"`) |
| Token dialog title (sell) | Select asset to sell | `swap-form.tsx` |
| Token dialog title (buy) | Select asset to buy | `swap-form.tsx` |
| Direction toggle | **Sell** / **Buy** | `swap-form.tsx` |
| Max amount | **MAX** | `swap-form.tsx` |
| Primary action (main screen) | **Swap** (or **Approve {symbol}** if approval needed) | `swap-form.tsx` |
| Primary action (confirm screen) | **Confirm Swap** | `app/page.tsx` |
| Confirm screen back | (arrow / back) | `page.tsx` |

**Flow:** Home page = swap form. User picks From (click **Select**), To (click **Select**), amount → clicks **Swap** → review → clicks **Confirm Swap**.

---

## Pools / Liquidity / CDP / Stability pool

*Not yet present in app.mento.org app router (as of last check). When added, add their labels here and reference in Quick Start.*

---

*Last synced from frontend-monorepo main; update when UI strings change.*
