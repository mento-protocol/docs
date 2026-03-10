# Fixed-Price Market Makers (FPMMs)

This page is the **reference** for how FPMMs work in Mento V3: why Mento uses oracle pricing, the invariant, operations, rebalancing, and configuration.

---

## Why oracle pricing? (and why not curve-based AMMs)

Most DEXs use **curve-based AMMs** (constant-function market makers, or CFMMs): the pool has a trading function of **reserves only**, and the **execution price** is derived from that — for example in a constant-product pool the spot price is the ratio of reserves and changes only when someone trades. So the pool *is* the price: the quoted rate comes from reserves and **moves only when someone trades**. Between trades, when the external market moves, the pool’s quote is **stale**. That creates two problems:

1. **LVR (loss-versus-rebalancing)** — Arbitrageurs trade against the stale quote at better-than-fair prices. LPs effectively “sell low and buy high”; the loss to LPs equals arbitrageur profit. It’s a structural cost of the design.
2. **Slippage** — Traders don’t get the market rate; they execute **along the curve**. Execution price depends on trade size (price impact), so even small trades can get a worse rate than the true FX rate.

In CFMMs, the **curvature** of the trading function governs both: a flatter curve gives lower slippage but higher LVR. You cannot tune a CFMM so that everyone gets the fair rate with no cost. For **FX and stablecoins**, the fair rate already exists off-chain (spot, CEX). So we don’t need the pool to *discover* the price — we need it to **use** it. That is what **oracle pricing** does: the pool quotes an external **oracle** rate (minus a fee). No reserve-based curve, no curve-based slippage, no LVR from a stale pool price. Risks shift to **oracle** quality and **inventory**; the protocol addresses those with **trading limits**, **circuit breakers**, and **rebalancing** by allowlisted strategies.

---

## The invariant: I = V / S

In Mento V3, every FPMM maintains a single **invariant** across all operations:

<div align="center">

$$I = \frac{V}{S}$$

</div>

where the pool **value at the oracle price** is

<div align="center">

$$V = p^\top R$$

</div>

(reserves $$R$$ weighted by oracle $$p$$; $$S$$ = total **LP share supply**). So $$I$$ is value at the oracle per LP share. **This holds under all operations only when we ignore fees and incentives**—i.e. we treat swap as at the oracle rate and rebalance as returning exactly the other token at the oracle; in practice, swap fees (LP and protocol) and the capped rebalance incentive mean the accounting is slightly more involved.

- **V** = pool **value at the oracle price** (the sum of reserve amounts weighted by the oracle). So V is “how much the reserves are worth at the oracle rate.”
- **S** = total **LP share supply** (the number of liquidity-provider tokens in existence).
- **I = V / S** = “value at the oracle per LP share.”

This **I** is preserved on (when fees and incentives are ignored):

- **Swap** — V and S do not change; only the composition of reserves changes. So I is unchanged. (In practice the pool keeps swap fees.)
- **Mint** (add liquidity) — You add both tokens in the **current reserve ratio**; you receive new shares in proportion to the value you add (at the pool’s implied price, which matches the oracle at equilibrium). The protocol is designed so I is preserved.
- **Burn** (remove liquidity) — You burn shares and withdraw a proportional share of reserves; I stays the same for everyone.
- **Rebalance** — The pool sends one token to a strategy and receives the other at the oracle rate (with a capped incentive). V and S do not change in the idealized case; in practice the strategy may keep a capped incentive, so the invariant holds only when we ignore that incentive.

So “value per LP share at the oracle” is the **single number** that the protocol keeps constant across swaps, mints, burns, and rebalances **when we abstract away fees and incentives**. That gives LPs a clear accounting: your share of the pool is always worth a well-defined amount at the oracle price.

**How the building blocks fit together:** **FPMMs** give you the swap rate at the oracle; the **invariant** (I = V/S) keeps accounting consistent when we ignore fees and incentives. **Trading limits** and the **circuit breaker** protect when the oracle is wrong, stale, or manipulated. **Liquidity strategies** rebalance inventory when reserves drift too far from the oracle, so the pool can keep serving trades. Fees and incentives align LPs, keepers, and governance.

---

## Pool mechanics in short

| Operation | What happens | Invariant I = V/S |
|-----------|--------------|-------------------|
| **Swap** | You send token A, receive token B at oracle rate (minus fee). Reserves change; value at oracle (V) and share supply (S) unchanged. | Preserved |
| **Mint** | You add both tokens in current reserve ratio; receive LP tokens. V and S increase in proportion. | Preserved |
| **Burn** | You burn LP tokens; receive proportional share of both reserves. V and S decrease. | Preserved |
| **Rebalance** | Allowlisted strategy takes one token from pool, returns the other at oracle rate. V and S unchanged. | Preserved |

*The “Preserved” column holds when we ignore fees and incentives; in practice, swap fees and the rebalance incentive affect the exact accounting.*

Every swap also satisfies **value protection**: after the swap, the pool’s reserve value at the oracle (in one chosen numéraire) must not be less than before (once fee value is credited). If the oracle is wrong and trading is not halted, value can still be extracted compared to a fair price.

---

## Rebalancing (V3)

When users trade one-sided (e.g. everyone sells token A for token B), the pool’s **reserves** become imbalanced: too much of one token, too little of the other. The pool does not automatically “rebalance” itself. Instead:

- The pool **monitors** how far its **reserve-implied price** is from the **oracle** price. When that deviation exceeds a **threshold** (separate for “above” and “below”), the pool becomes **eligible for rebalancing**.
- Only **allowlisted liquidity strategies** can call the pool’s rebalance function. The pool sends one token to the strategy and calls back into the strategy; the strategy returns the other token at the oracle rate. The strategy may keep a **capped rebalance incentive** (the pool enforces a **minimum repayment** so value loss is bounded).
- In V3, rebalancing moves the pool toward a **threshold boundary** (a band around the oracle), **not** to exact 50/50. That limits how much the pool moves in one rebalance and reduces attack surface.
- **Who triggers:** Anyone can call the **strategy’s** public `rebalance(pool)` (permissionless). The strategy enforces a **cooldown** and then calls the pool. So “keepers” can trigger rebalances and earn incentives without special permission.

See [Rebalancing & strategies](rebalancing-and-strategies.md) for more detail.

---

## Liquidity strategies

Different pools need different **sources** of liquidity for rebalancing. Mento V3 uses **liquidity strategies**: each is a contract allowlisted by one or more pools. When the pool calls the strategy during rebalance, the strategy must return the other token; it gets that token from somewhere (e.g. the protocol **Reserve**, or a **CDP** stability pool).

- **Reserve strategy** — For fully backed Mento stablecoins (e.g. USDm, EURm). The **Reserve** holds collateral; the strategy can mint or burn stablecoins and move collateral to rebalance the pool.
- **CDP strategy** — For synthetic stablecoins (e.g. GBPm) created by collateralized debt. The strategy interacts with the **stability pool** and borrowing/repayment to source or sink the stablecoin when rebalancing.
- **Third-party strategy** — External issuers can provide their own strategy contract (allowlisted by governance) for custom liquidity sources.

---

## Pool configuration

Each FPMM is configured with parameters such as:

- **LP fee** and **protocol fee** — Deducted from swaps; the remainder is the rate the user gets (oracle minus fee).
- **Rebalance incentive** — Maximum share of the rebalance amount the strategy may keep; the pool enforces a minimum repayment.
- **Rebalance thresholds** — How far the reserve price must deviate from the oracle (above/below) before rebalancing is allowed.
- **Oracle** — Which price feed (e.g. OracleAdapter + rate feed ID) and whether to invert the rate.
- **Trading limits** — Per-token caps over 5-minute and 1-day windows (TradingLimitsV2).
- **Circuit breakers** — The pool uses the OracleAdapter/BreakerBox so that swaps can be halted when the oracle is invalid, stale, or when breakers trip.

These are set at deployment or by pool admin / governance. See [Trading limits](trading-limits.md) and [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md).

---

## Liquidity provision: what LPs get

Anyone can add liquidity by depositing **both** tokens in the **current reserve ratio** and receiving LP tokens. Unlike in many curve-based AMMs:

- There is **no LVR** from a stale curve (the pool quotes the oracle).
- **Value per share** at the oracle (I = V/S) is preserved on every operation.
- LPs earn **fees** from swap volume and may face **path-dependent** changes in composition when the oracle price moves between rebalances (so there can be “impermanent loss” in composition terms, but not from arbitrageurs picking off a stale quote).

See [Swap & liquidity](../../use/swap-and-liquidity.md) for how to mint and burn in practice.

---

## Next steps

- [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md) — How the pool gets the rate and when trading is gated.
- [Rebalancing & strategies](rebalancing-and-strategies.md) — Who rebalances, thresholds, boundaries, incentives.
- [Trading limits](trading-limits.md) — Caps; [Oracles & circuit breakers](oracles-and-circuit-breakers.md) — halts.
- [The Reserve](../the-reserve.md) — Backing for fully backed Mento stables (used by the Reserve liquidity strategy).
- [Protocol Economics](../protocol-economics.md) — Value flows, fees, incentives, and revenue.
