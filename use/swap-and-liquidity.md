# Swap & liquidity (FPMM operations)

This page describes how to **swap** and how to **add or remove liquidity** on Mento V3. It assumes you have read [Overview](../README.md) or [What Is Mento? (deep dive)](../dive-deeper/what-is-mento.md) and know what an **FPMM** (Fixed-Price Market Maker), **oracle**, and **reserves** are.

---

## Swapping

In an FPMM pool you exchange one token for the other **at the oracle rate** (minus a fee). The pool does not use a curve: the **execution price is the oracle price** (minus fee), so there is no slippage from reserves. The pool checks that:

- The oracle is valid and not stale (and any circuit breakers allow trading).
- After your swap, the pool’s **reserve value at the oracle** does not decrease (value protection; if the oracle is wrong, value can still be extracted).
- **Trading limits** (per-token caps over 5-minute and 1-day windows) are not exceeded.

If any of these fail, the swap reverts.

### How to swap in practice

1. **Use the Mento app** — [app.mento.org](https://app.mento.org/): connect your wallet, choose the pair (e.g. USDC ↔ USDm), enter amount, and submit. The app will quote the oracle rate (minus fee) and execute the swap.
2. **Integrate** — Use the pool’s `getAmountOut` for a quote and the router or pool’s swap function to execute. See [Integration](../build/integration/README.md) and the [Smart Contracts](../build/smart-contracts/README.md).

---

## Adding liquidity (mint)

**Liquidity providers (LPs)** add both tokens to the pool in **proportion to the pool’s current reserves** (same ratio as the pool holds). In return they receive **LP tokens** (shares). The protocol preserves the **invariant** \(I = V/S\): value at the oracle per share stays the same.

- **Initial liquidity:** The first deposit sets the pool’s share supply (e.g. using a square-root formula of the two amounts).
- **Later deposits:** You must add both tokens in the **current reserve ratio**; you receive shares in proportion to your contribution. The pool’s composition (ratio of the two tokens) does not change when you add liquidity.

### How to add liquidity in practice

1. **Mento app** — [app.mento.org](https://app.mento.org/): connect wallet, select the pool, enter amounts for both tokens (the app will show the required ratio), and confirm.
2. **Contracts** — Call the pool’s mint function with the two token amounts; you receive LP tokens.

---

## Removing liquidity (burn)

LPs can **burn** (destroy) their LP tokens and withdraw their **proportional share** of the pool’s reserves (both tokens). The protocol returns reserves in the same ratio as the pool holds; the invariant \(I = V/S\) is preserved for remaining LPs.

### How to remove liquidity in practice

1. **Mento app** — Select the pool, choose “Remove liquidity,” enter the amount of LP tokens to burn, and confirm; you receive both underlying tokens.
2. **Contracts** — Call the pool’s burn function with the amount of LP tokens; you receive both tokens in proportion to your share.

---

## Rebalancing (for keepers and strategies)

When the pool’s **reserve ratio** drifts too far from the **oracle** (e.g. too much of one token, too little of the other), the pool becomes **eligible for rebalancing**. Only **allowlisted liquidity strategies** can call the pool’s rebalance function. The pool sends one token to the strategy and receives the other at the oracle rate (with a capped **rebalance incentive**). In V3, rebalancing moves the pool toward a **threshold boundary**, not to exact 50/50.

- **Who can trigger:** Anyone can call the **strategy’s** `rebalance(pool)` (permissionless). The strategy enforces a **cooldown** and then calls the pool; the pool only accepts the call if the sender is an allowlisted strategy.
- **Who gets the incentive:** The strategy distributes the rebalance incentive (e.g. to protocol, liquidity source); the pool only enforces a **minimum repayment** so that value loss is capped.

If you run a **keeper**, you can integrate with the strategy’s public `rebalance` entrypoint to earn incentives when pools are eligible. See [Rebalancing & strategies](../overview/core-concepts/rebalancing-and-strategies.md) and the build docs for contract details.

---

## Summary

| Action | Where | Notes |
|--------|--------|--------|
| **Swap** | Mento app or pool/router contract | At oracle rate (minus fee); trading limits and pool checks apply. |
| **Add liquidity** | Mento app or pool mint | Both tokens in current reserve ratio; receive LP tokens. |
| **Remove liquidity** | Mento app or pool burn | Burn LP tokens; receive proportional share of both tokens. |
| **Trigger rebalance** | Strategy contract | Permissionless; strategy must be allowlisted on the pool; cooldown applies. |

---

## Next steps

- [Getting Mento stables](getting-mento-stables/README.md) — Get USDm, EURm, GBPm via swap or borrow.
- [Fixed-Price Market Makers (FPMMs)](../dive-deeper/fpmm/README.md) — How FPMMs work (invariant, rebalance rules).
- [Oracles & price feeds](../overview/core-concepts/oracles-and-price-feeds.md) — How the pool gets the rate and when trading is gated.
- [Trading limits & circuit breakers](../overview/core-concepts/trading-limits-and-circuit-breakers.md) — Caps and halts.
