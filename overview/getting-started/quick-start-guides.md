---
description: Do one thing now — swap at FX rates, add liquidity, or borrow a stable.
---

# Quick Start Guides

Choose what you want to do first — swap, add liquidity, borrow, or integrate. For the big picture, see [What is Mento?](what-is-mento.md) and [Core Concepts](../core-concepts/).

---

## ✨ Your first on-chain FX swap — no slippage

[app.mento.org](https://app.mento.org/) → connect wallet → choose **From** and **To** (e.g. USDC → GBPm) → enter amount → **Swap** → **Confirm Swap**.

You get the same rate you’d see off-chain for GBP/USD. No curve, no slippage. 🎯

[Getting Mento stables →](../../use-mento/getting-mento-stables/README.md)

---

## 💧 Add liquidity and earn fees

Get both sides of the pair (e.g. GBPm + USDm) via the swap flow above or elsewhere. Then: **Pools** / **Liquidity** → pick the pool (e.g. **GBPm/USDm**) → enter amounts → confirm. You’re an LP. 🎯

[Swap & liquidity →](../../use-mento/swap-and-liquidity.md#adding-liquidity-mint)

---

## 🏦 Borrow a stable (e.g. GBPm) and optionally earn from the stability pool

**Borrow** → choose asset (e.g. **GBPm**) in the top-right dropdown → **+ Open Your First Trove**. Deposit **USDm** (collateral for all CDPs), set how much to borrow (min £1,000 GBPm) and your interest rate (from 0.2%) → confirm. Watch the LTV bar; liquidation kicks in below the min collateral ratio (110%). Optionally deposit borrowed GBPm into the **Stability pool** to earn when liquidations happen. 🎯

[CDP operations →](../../use-mento/cdp-operations.md) · [Parameters (min debt, ratios, rates)](gbpm-usdm-parameters-reference.md)

---

## Integrate (developers)

Install the [Mento SDK](../../build-on-mento/mento-sdk/installation.md), grab pool addresses from [Deployments](../../build-on-mento/deployments/addresses.md), then quote and swap via the pool or router.

[Integration overview →](../../build-on-mento/integration-overview/README.md)

---

**More:** [What is Mento?](what-is-mento.md) · [Core Concepts](../core-concepts/)
