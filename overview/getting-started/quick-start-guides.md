---
description: Do one thing now — swap at FX rates, add liquidity, or borrow a stable.
---

# Quick Start Guides

Choose what you want to do first — swap, add liquidity, borrow, or integrate. For the big picture, see [What is Mento?](what-is-mento.md) and [Core Concepts](../core-concepts/).

---

## ✨ Your first on-chain FX swap — no slippage

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (header; e.g. MetaMask, Valora) on a supported chain (e.g. Celo).
2. On the swap screen, click **Select** next to **From** and choose the token you’re selling (e.g. USDC). Click **Select** next to **To** and choose the token you’re buying (e.g. GBPm). Enter the amount — or click **MAX** to use your full balance.
3. Click **Swap**. If the app asks for token approval first, confirm **Approve …**, then click **Swap** again.
4. On the confirmation screen, check the rate and fees, then click **Confirm Swap**.

You get the same rate you’d see off-chain for GBP/USD. No curve, no slippage. 🎯

[Getting Mento stables →](../../use-mento/getting-mento-stables/README.md)

---

## 💧 Add liquidity and earn fees

1. **Get both tokens** — Use the swap flow above to get each side of the pair (e.g. some GBPm and some USDm), or source them elsewhere (CEX, bridge).
2. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet**.
3. Open **Pools** or **Liquidity**. Select a pool (e.g. **GBPm/USDm**).
4. Enter amounts for both tokens; the app shows the required ratio. Confirm. You’re now an LP and earn fees from swaps. 🎯

[Swap & liquidity →](../../use-mento/swap-and-liquidity.md#adding-liquidity-mint)

---

## 🏦 Borrow a stable (e.g. GBPm) and optionally earn from the stability pool

A **Trove** (CDP) lets you lock **USDm** as collateral and borrow another stable (e.g. GBPm) against it. You set your own interest rate; there’s no fixed repayment schedule. Keep your collateral ratio above the minimum or the position can be liquidated.

1. Go to **[app.mento.org](https://app.mento.org/)** and **connect your wallet** (e.g. Celo).
2. Open **Borrow**. Select the asset to borrow (e.g. **GBPm**) in the **dropdown at the top right**, then click **+ Open Your First Trove**.
3. On the **Open a Trove** screen:
   - **COLLATERAL** — Enter how much USDm to deposit (or **MAX**). Your balance is shown next to the field.
   - **BORROW** — Enter how much GBPm to borrow. Minimum is **£1,000 GBPm** (for the recommended Celo deployment).
   - **LOAN-TO-VALUE** — The bar shows risk (SAFE → MODERATE → RISKY → LIQ). Liquidation happens when your collateral ratio drops below the minimum (**110%**); the app shows “Liquidation at …%”.
   - **ANNUAL INTEREST RATE** — Set or pick a rate (minimum **0.2%**).
   - Review the **loan summary** on the right, then confirm (**Enter collateral amount** / **Open Trove**).
4. (Optional) Open **Stability pool** and deposit your GBPm to earn rewards when liquidations occur. 🎯

[CDP operations →](../../use-mento/cdp-operations.md) · [Parameters (min debt, ratios, rates)](gbpm-usdm-parameters-reference.md)

---

## Integrate (developers)

1. **Install** the [Mento SDK](../../build-on-mento/mento-sdk/installation.md) or use the contracts directly.
2. **Get pool address and pair info** from [Deployments](../../build-on-mento/deployments/addresses.md).
3. **Quote** via pool or router (`getAmountOut` / `getAmountsOut`).
4. **Swap** via the router or pool swap function.

[Integration overview →](../../build-on-mento/integration-overview/README.md)

---

**More:** [What is Mento?](what-is-mento.md) · [Core Concepts](../core-concepts/)
