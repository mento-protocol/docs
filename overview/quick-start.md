# Quick start

Use the **[Mento app](https://app.mento.org/)** to swap, add/remove liquidity, borrow and repay CDP stablecoins, and deposit to the stability pool.

---

## First swap

1. Open [Mento app](https://app.mento.org/); connect wallet on a supported chain. Or use a CEX — [Getting stables](../use/getting-stables.md).
2. Choose pair (e.g. USDC/USDm, EUROC/EURm), enter amount, swap. You get oracle rate minus fee; no curve slippage.
3. Details: [FPMM operations → Swap](../use/fpmm-operations.md#swap).

---

## First stable (no swap)

- **CEX or bridge:** [Getting stables](../use/getting-stables.md).
- **CDP (e.g. GBPm):** In the [Mento app](https://app.mento.org/), borrow against collateral. [CDP operations → Borrow](../use/cdp-operations.md#borrow).

---

## Add liquidity

1. In the [Mento app](https://app.mento.org/), go to liquidity: add both tokens in the **current pool ratio**; receive LP shares. To remove: burn shares, receive tokens back.
2. Value per share at oracle; rebalancing keeps pool in band. [FPMM operations → Mint & burn](../use/fpmm-operations.md#mint--burn).

---

## Integrate (devs)

[Integration guide](../build/README.md) → [Architecture](../build/architecture.md), [Contracts](../build/contracts.md), [SDK](../build/sdk.md), [Deployments](../build/deployments.md).
