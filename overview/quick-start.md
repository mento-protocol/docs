# Quick start

Get to your first swap or first stable as fast as possible.

---

## First swap (get stablecoins for CELO or another asset)

1. Choose where you’ll trade: a Celo app (e.g. Valora, Mento app), another chain, or a CEX. See [Getting stables](../use/getting-stables.md).
2. If on Celo: open the app, select the pair (e.g. CELO/cUSD), enter amount, and swap. You get the **oracle rate** (minus fee)—no curve slippage.
3. Done. For more (fees, limits, troubleshooting): [FPMM operations → Swap](../use/fpmm-operations.md#swap).

---

## First stable (without swapping)

- **Via CEX or bridge:** See [Getting stables → Via CEX / From other chains](../use/getting-stables.md).
- **Via CDP (e.g. GBPm):** Borrow against collateral. See [CDP operations → Borrow](../use/cdp-operations.md#borrow).

---

## Add liquidity (LP)

1. Go to [FPMM operations → Mint & burn](../use/fpmm-operations.md#mint--burn).
2. Use a supported app or the SDK; you add both tokens in the **current pool ratio** and receive LP shares.
3. Value per share is at the oracle; rebalancing keeps the pool aligned. Risks and rewards: same page.

---

## Integrate (developers)

1. Start at [Integration guide](../build/README.md).
2. Then: [Architecture](../build/architecture.md), [Contracts](../build/contracts.md), [SDK](../build/sdk.md), [Deployments](../build/deployments.md).
