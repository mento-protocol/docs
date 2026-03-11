# Rebalancing & strategies

This page explains how **rebalancing** works in Mento V3 and what **liquidity strategies** are. It builds on [FPMMs](README.md).

---

## Why rebalancing is needed

In an FPMM, every **swap** executes at the **oracle rate** (minus fee). The pool’s **reserves** (the two tokens it holds) change with each trade, but the pool **value at the oracle** (V) stays the same (minus fees). So if many users sell token A for token B, the pool ends up with **more A and less B**. The pool’s **reserve-implied price** (the ratio of reserves, in some numéraire) then **drifts** from the **oracle** price. If that drift gets too large, the pool is **out of balance**: it has too much of one asset and too little of the other, which can make it hard to serve further one-sided demand and can increase risk if the oracle is wrong or stale.

**Rebalancing** is the process of moving reserves back toward a target (in V3, toward a **threshold boundary**) by having a trusted contract take the surplus token from the pool and return the other token at the oracle rate.

---

## When is a pool eligible for rebalancing?

The pool compares its **reserve-implied price** to the **oracle** price. There are two **thresholds** (configured per pool):

- **Threshold above** — When the reserve price is **above** the oracle by at least this amount, the pool is eligible for a rebalance that brings the reserve price down (e.g. take token B out, return token A).
- **Threshold below** — When the reserve price is **below** the oracle by at least this amount, the pool is eligible for a rebalance that brings the reserve price up.

So rebalancing is only allowed when the **deviation** exceeds the relevant threshold. That avoids tiny, frequent rebalances and limits incentive gaming.

---

## Who can rebalance? (Allowlisted strategies)

The pool’s **rebalance** function can only be called by **allowlisted liquidity strategies**. A **liquidity strategy** is a separate smart contract that:

1. Is registered (allowlisted) on the pool by governance or pool admin.
2. Implements a **callback** that the pool invokes during rebalance: the pool sends one token to the strategy and calls back; the strategy must return the other token (at the oracle rate, minus an allowed incentive).

So the pool does **not** rebalance by itself. A **strategy contract** must call `rebalance(...)` on the pool; the pool then transfers one token to the strategy and calls the strategy’s callback; the strategy sources the other token (from a **Reserve**, a **CDP** stability pool, the **caller** in the case of OpenLiquidityStrategy, or another source) and returns it to the pool.

---

## Who can trigger a rebalance? (Permissionless keepers)

Although only a **strategy** can call the pool’s rebalance function, **anyone** can call the **strategy’s** public method (e.g. `rebalance(pool)`). So:

- **Keepers** (bots or users) can call the strategy’s `rebalance(pool)` permissionlessly when a pool is eligible.
- The strategy typically enforces a **cooldown** so that the same pool is not rebalanced too often.
- The strategy may pay part of the **rebalance incentive** to the caller or to the liquidity source; the **pool** only enforces a **minimum repayment** so that the pool never gives away more than the allowed incentive.

So rebalancing is **strategy-mediated** and **keeper-triggered**: the pool trusts only allowlisted strategies, but anyone can ask the strategy to run.

---

## Target: threshold boundary, not 50/50

In V3, when a rebalance runs, the strategy moves the pool toward a **boundary** defined by the threshold (e.g. the reserve-implied price at the edge of the “allowed” band), **not** to exact 50/50 by value. So:

- The **rebalance size** is limited: the pool does not jump from very imbalanced to perfectly balanced in one step. That caps how much value moves in one rebalance and reduces attack surface (e.g. someone triggering a huge rebalance with a small trade).
- The pool’s **acceptance checks** (in the contract) ensure: deviation improves, direction is preserved (e.g. “above oracle” stays above), the pool does not overshoot past the band, and the minimum repayment (incentive cap) is satisfied.

---

## Value and incentive cap

The pool does **not** require that rebalancing is perfectly “value-invariant” (V unchanged). It allows the strategy to keep a **rebalance incentive** (a fraction of the value moved), but it enforces a **minimum amount** that must be returned to the pool. So the **maximum value loss** to the pool in a rebalance is **capped** by the configured incentive. That way LPs are protected from unbounded value extraction while strategies (and keepers) can still earn a bounded reward.

---

## Types of liquidity strategies (V3)

Different pools use different **sources** of liquidity when rebalancing:

- **Reserve strategy** — Used for **fully backed** Mento stablecoins (e.g. USDm, EURm). The protocol **Reserve** holds collateral; the strategy can **mint** new stablecoins or **burn** stablecoins and release collateral to supply or absorb the token that the pool needs. So when the pool has too much USDC and too little USDm, the strategy might burn USDm and use the Reserve to provide USDC (conceptually); the exact flows depend on which token is “debt” and which is “collateral” in the strategy’s configuration.
- **CDP strategy** — Used for **synthetic** Mento stablecoins (e.g. GBPm) that are created by **collateralized debt positions (CDPs)**. The strategy interacts with the **stability pool** and borrowing/repayment: it can borrow or repay the stablecoin, or use the stability pool’s liquidity, to return the required token to the pool during rebalance.
- **Open strategy** — **OpenLiquidityStrategy** uses the **caller** of `rebalance(pool)` as the liquidity source: the caller must hold and approve the required token; the strategy pulls it via ERC20 `transferFrom` and returns the other token to the pool. No reserve or CDP. Used where there is no Reserve or CDP deployment (e.g. GBPm/USDm on Monad). See [Liquidity strategies](../../build/smart-contracts/liquidity-strategies.md#openliquiditystrategy) and [mento-core#711](https://github.com/mento-protocol/mento-core/pull/711).
- **Third-party strategy** — For pools that pair with externally issued assets, the issuer (or another party) can deploy a custom strategy contract that is allowlisted on the pool. That strategy implements the same callback interface and sources the other token from its own liquidity or external venues.

---

## Summary

| Concept | Meaning |
|--------|--------|
| **Rebalancing** | Moving pool reserves back toward a target (threshold boundary) by sending one token to a strategy and receiving the other at the oracle rate. |
| **Eligibility** | Pool is rebalanceable when reserve price deviates from oracle by at least the configured threshold (above or below). |
| **Allowlisted strategy** | Only contracts registered on the pool can call the pool’s rebalance function. |
| **Permissionless trigger** | Anyone can call the strategy’s `rebalance(pool)`; the strategy enforces cooldown and then calls the pool. |
| **Target** | Threshold boundary (band), not exact 50/50. |
| **Incentive** | Strategy may keep a capped share of the rebalance; pool enforces minimum repayment. |

---

## Next steps

- [FPMMs](README.md) — Invariant, pool mechanics.
- [The Reserve](../the-reserve.md) — How the Reserve backs stables and supports the Reserve strategy.
- [Swap & liquidity](../../other/swap-and-liquidity.md) — How to swap and add/remove liquidity; triggering rebalances as a keeper.
