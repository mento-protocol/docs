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

## Borrow (CDP / Trove)

| Element | Label in app | Notes |
|--------|----------------|-------|
| Nav / section | **Borrow** | Main label to open this section. |
| Page title | Borrow | Under "COLLATERALIZED DEBT". |
| Subtitle | Borrow stablecoins against your collateral. Manage your open troves below. | — |
| Asset to borrow | Dropdown (top right) | e.g. **GBPm**. Select which stablecoin to borrow. |
| Primary CTA (no open positions) | **+ Open Your First Trove** | Opens the flow to deposit collateral and borrow. |
| Collateral | **USDm** | For all CDPs, USDm is the collateral asset. |

**Open a Trove screen** (after clicking + Open Your First Trove):

| Element | Label in app | Notes |
|--------|----------------|-------|
| Back | **&lt; Back to Dashboard** | Top left. |
| Title | Open a Trove | Under "NEW POSITION". |
| Subtitle | Deposit USDm as collateral and borrow GBPm against it. | — |
| Risk bar | **LOAN-TO-VALUE** | Segments: SAFE, MODERATE, RISKY, LIQ. "Liquidation at …%" shown (min collateral ratio 110% → ~91% LTV). |
| Collateral section | **COLLATERAL** | Input + Balance + **MAX** + $ USDm. |
| Borrow section | **BORROW** | Input + Min (e.g. £1,000 GBPm per launch params) + £ GBPm. |
| Interest | **ANNUAL INTEREST RATE** | Slider + presets (e.g. 1.0%, 3.5%, 6.3%, 10.0%). Min 0.2% (launch). |
| Summary | Loan summary | Collateral, Debt, Liq. Price, Collateral Ratio, Interest Rate, One-time Fee, Annual Cost. |
| Confirm (initial) | **Enter collateral amount** | Shown until collateral entered; then e.g. **Open Trove** / **Confirm**. |

**Flow:** Open **Borrow** → select asset to borrow (e.g. GBPm) in the top-right dropdown → click **+ Open Your First Trove** → enter COLLATERAL (USDm) and BORROW (GBPm) → set ANNUAL INTEREST RATE → confirm to open trove.

---

## Pools / Liquidity

*When added to the app, add labels here and reference in Quick Start.*

---

## Earn (Stability pool)

| Element | Label in app | Notes |
|--------|----------------|-------|
| Nav tab | **Earn** | Top nav: Swap, Pool, Borrow, **Earn**. Switch here to access the Stability pool. |
| Page title | STABILITY POOL / **Earn** | Subtitle: deposit to earn liquidation gains and protocol rewards; no lock-up. |
| Currency selector | e.g. **GBPm** | Top right; selects which Stability pool to view/deposit into. |
| Metrics | Total deposits, Pool APY, Avg. borrow rate | Shown for the selected pool. |
| Deposit tab | **Deposit** | Amount input, Balance, **25%** / **50%** / **75%** / **MAX**, **Claim rewards with deposit** (checkbox), **Enter amount to deposit** (button). |
| Withdraw tab | **Withdraw** | — |
| Your position | Deposited, Rewards (Claimable), **Claim rewards** | — |

---

**Parameter values (min debt, min collateral ratio, interest):** See [gbpm-usdm-parameters-reference.md](../other/gbpm-usdm-parameters-reference.md) (from `parameters/suggested_fpmm_gbpm_usdm_parameters.pdf`).

*Last synced from frontend-monorepo main and app UI; update when UI strings change.*
