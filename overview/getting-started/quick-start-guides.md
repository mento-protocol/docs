---
description: Do one thing now — get your first stable, add liquidity, or integrate with Mento v3.
---

# Quick Start Guides

**Do one thing now:** pick a path below. For the full picture, see [What is Mento?](what-is-mento.md) and [Core Concepts](../core-concepts/).

---

## ✨ Experience your first on-chain FX swap at off-chain FX rates (no slippage!)

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (click the connect button in the header; e.g. MetaMask, Valora) on a supported chain (e.g. Celo).
2. The main screen is the swap form. Click **Select** next to the "From" field and choose the token you're selling (e.g. USDC). Click **Select** next to the "To" field and choose the token you're buying (e.g. GBPm). Enter the amount (or click **MAX** to use your full balance).
3. Click the **Swap** button. If the app asks you to approve the token first, click **Approve …** and confirm, then click **Swap** again.
4. On the confirmation screen, review the rate and fees, then click **Confirm Swap**. Same rate you'd get off-chain for traditional GBP/USD FX — no curve, no slippage. 🎯

**Click path:** [app.mento.org](https://app.mento.org/) → **Connect** (header) → **Select** (From) → pick token → **Select** (To) → pick token → enter amount → **Swap** → **Confirm Swap**.

**Labels source:** [app-mento-labels.md](app-mento-labels.md) (locked to frontend code).

**Details:** [Getting Mento stables](../../use-mento/getting-mento-stables/README.md)

---

## 💧 Add liquidity and earn fees (e.g. GBPm/USDm)

1. **Get both tokens first** — Use the swap flow above (click **Select** for From/To, enter amount, **Swap** → **Confirm Swap**) to get each side, or source them elsewhere (e.g. CEX, bridge). You need both sides of the pair (e.g. some GBPm and some USDm).
2. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (header).
3. In the app, open the **Pools** or **Liquidity** section (exact label: see [app-mento-labels.md](app-mento-labels.md) when available). Select a pool (e.g. **GBPm/USDm**).
4. Enter amounts for both tokens (the app shows the required ratio) and confirm. You're now an LP — earning fees from swaps. 🎯

**Click path:** [app.mento.org](https://app.mento.org/) → **Connect** → swap to get both tokens (see first guide) → **Pools** / **Liquidity** → select pool → enter amounts → confirm.

**Details:** [Swap & liquidity (FPMM operations)](../../use-mento/swap-and-liquidity.md#adding-liquidity-mint)

---

## 🏦 Borrow a CDP stable (e.g. GBPm) and earn from the stability pool

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (header) on a supported chain (e.g. Celo).
2. In the app, open the **CDP** or **Borrow** section (exact label: see [app-mento-labels.md](app-mento-labels.md) when available). Select the CDP product (e.g. **GBPm**).
3. Deposit collateral and click the **borrow** (or equivalent) action to mint GBPm — you're bringing GBPm into existence against your collateral.
4. (Optional) Open the **Stability pool** section. Deposit your GBPm into the stability pool; you earn rewards when liquidations occur.

**Click path:** [app.mento.org](https://app.mento.org/) → **Connect** → **CDP** / **Borrow** → select product (e.g. GBPm) → deposit collateral → **Borrow** → (optional) **Stability pool** → deposit GBPm.

**Details:** [CDP operations (borrow, repay, stability pool)](../../use-mento/cdp-operations.md) · [Getting Mento stables](../../use-mento/getting-mento-stables/README.md)

---

## Integrate (developers)

1. **Install** the [Mento SDK](../../build-on-mento/mento-sdk/installation.md) or use the contracts directly.
2. **Get pool address** and pair info from [Deployments](../../build-on-mento/deployments/addresses.md).
3. **Quote** via pool or router `getAmountOut` / `getAmountsOut`.
4. **Swap** via router or pool swap function.

**Details:** [Integration overview](../../build-on-mento/integration-overview/README.md) · [Smart contracts](../../build-on-mento/smart-contracts/README.md)

---

**Not sure where to start?** [What is Mento?](what-is-mento.md) · [Core Concepts](../core-concepts/)
