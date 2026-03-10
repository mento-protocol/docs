---
description: Do one thing now — swap at FX rates, add liquidity, or borrow a stable.
---

# Quick Start Guides

Choose what you want to do first — swap, add liquidity, borrow, earn (Stability pool), or integrate. For the big picture, see [What is Mento?](what-is-mento.md) and [Concepts overview](concepts-overview.md).

---

## ✨ Your first on-chain FX swap — no slippage

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (header; e.g. MetaMask, Valora) on a supported chain (e.g. Celo).
2. On the swap screen, click **Select** next to **From** and choose the token you’re selling (e.g. USDC). Click **Select** next to **To** and choose the token you’re buying (e.g. GBPm). Enter the amount — or click **MAX** to use your full balance.
3. Click **Swap**. If the app asks for token approval first, confirm **Approve …**, then click **Swap** again.
4. On the confirmation screen, check the rate and fees, then click **Confirm Swap**.

You get the same rate you’d see off-chain for GBP/USD. No curve, no slippage. 🎯

[Getting Mento stables →](../../use/getting-mento-stables/README.md)

---

## 💧 Add liquidity and earn fees

1. **Get both tokens** — Use the swap flow above to get each side of the pair (e.g. some GBPm and some USDm), or source them elsewhere (CEX, bridge).
2. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet**.
3. Open **Pools** or **Liquidity**. Select a pool (e.g. **GBPm/USDm**).
4. Enter amounts for both tokens; the app shows the required ratio. Confirm. You’re now an LP and earn fees from swaps. 🎯

[Swap & liquidity →](../../use/swap-and-liquidity.md#adding-liquidity-mint)

---

## 🏦 Borrow a stable (e.g. GBPm)

A **Trove** (CDP) lets you lock **USDm** as collateral and borrow another stable (e.g. GBPm) against it. You set your own interest rate; there’s no fixed repayment schedule. Keep your collateral ratio above the minimum or the position can be liquidated.

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (e.g. Celo).
2. Open **Borrow**. Select the asset to borrow (e.g. **GBPm**) in the **dropdown at the top right**, then click **+ Open Your First Trove**.
3. On the **Open a Trove** screen:
   - **COLLATERAL** — Enter how much USDm to deposit (or **MAX**). Your balance is shown next to the field.
   - **BORROW** — Enter how much GBPm to borrow. Minimum is **£1,000 GBPm**.
   - **LOAN-TO-VALUE** — The bar shows risk (SAFE → MODERATE → RISKY → LIQ). Liquidation happens when your collateral ratio drops below the minimum (**110%**); the app shows “Liquidation at …%”.
   - **ANNUAL INTEREST RATE** — This is the interest you pay on your borrowed amount. Set or pick a rate (minimum **0.2%**). In Liquity v2, anyone can **redeem**: they burn GBPm and receive USDm collateral from open troves. Troves are ordered by interest rate, and **the lowest-interest troves are redeemed first**. So a lower rate means cheaper borrowing but you’re first in line to be redeemed against; a higher rate costs more but reduces that risk.
   - Review the **loan summary** on the right, then confirm (**Enter collateral amount** / **Open Trove**).
To earn from the Stability pool with your borrowed GBPm (or any CDP-based stable), switch to **Earn** (see below). 🎯

[CDP operations →](../../use/cdp-operations.md) · [Parameters (min debt, ratios, rates)](../reference/gbpm-usdm-parameters-reference.md)

---

## 📈 Earn — Stability pool

The **Stability pool** is only available for **CDP-based stablecoins** (e.g. **GBPm**), not for Reserve-backed stables like USDm or EURm. Deposit into the pool to earn a share of **trove interest** (interest paid by borrowers), **liquidation gains** (when liquidations occur, your deposit repays debt and you receive collateral at a discount), and **protocol rewards**. No lock-up — withdraw anytime.

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet**.
2. Switch to the **Earn** tab (top nav: Swap, Pool, Borrow, **Earn**).
3. Select the asset (e.g. **GBPm**) in the currency selector. You'll see the **Stability pool** for that asset: total deposits, pool APY, avg. borrow rate.
4. Under **Deposit**, enter an amount (or use **25%**, **50%**, **75%**, **MAX**). Optionally check **Claim rewards with deposit** to claim pending rewards when you deposit. Click **Enter amount to deposit** (or the active deposit button) to confirm. No lock-up — you can withdraw anytime. 🎯

[CDP operations →](../../use/cdp-operations.md)

---

## Integrate (developers)

1. **Install** the [Mento SDK](../../build/mento-sdk/installation.md) or use the contracts directly.
2. **Get pool address and pair info** from [Deployments](../../build/deployments/addresses.md).
3. **Quote** via pool or router (`getAmountOut` / `getAmountsOut`).
4. **Swap** via the router or pool swap function.

[Integration →](../../build/integration/README.md)

---

**More:** [What is Mento?](what-is-mento.md) · [Concepts overview](concepts-overview.md)
