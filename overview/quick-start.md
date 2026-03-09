# Quick start

---

## First swap

1. Pick venue: Celo app (e.g. Valora), another chain, or CEX. [Getting stables](../use/getting-stables.md).
2. On Celo: open app, choose pair (e.g. CELO/USDm), enter amount, swap. You get oracle rate minus fee; no curve slippage.
3. Details: [FPMM operations → Swap](../use/fpmm-operations.md#swap).

---

## First stable (no swap)

- **CEX or bridge:** [Getting stables](../use/getting-stables.md).
- **CDP (e.g. GBPm):** Borrow against collateral. [CDP operations → Borrow](../use/cdp-operations.md#borrow).

---

## Add liquidity

1. [FPMM operations → Mint & burn](../use/fpmm-operations.md#mint--burn).
2. Add both tokens in the **current pool ratio**; receive LP shares. Value per share at oracle; rebalancing keeps pool in band.
3. Risks and rewards: same page.

---

## Integrate (devs)

[Integration guide](../build/README.md) → [Architecture](../build/architecture.md), [Contracts](../build/contracts.md), [SDK](../build/sdk.md), [Deployments](../build/deployments.md).
