# What Is Mento? (deep dive)

This page goes deeper than the [Overview](../README.md): it explains why curve-based AMMs don’t work for FX, how Mento V3’s FPMMs use the oracle, and how the building blocks fit together (with optional math). For a math-free reference on FPMM mechanics, see [FPMMs](fpmm/README.md).

Mento V3 is a **DEX for onchain foreign exchange (FX)**. The **goal** is to let users swap stablecoins onchain at the **respective FX rates** — e.g. USDC ↔ GBPm at the USD/GBP rate, or USDC ↔ EURm at USD/EUR — so that onchain execution can compete with off-chain spot FX. This page explains why that requires a different design than standard AMMs, and how Mento V3’s building blocks (FPMMs, protection against oracle imprecision, liquidity strategies) fit together.

---

## Why efficient rates matter: attracting spot FX onchain

To attract **spot FX volume** onchain, execution must be **at or very close to the FX rate**. If the rate is worse than off-chain (slippage, spread, or systematic mispricing), users stay on CEXs or OTC. So the design question is: how can an onchain pool offer **efficient rates** — i.e. swap at the fair FX rate with minimal leakage?

**Standard AMMs do not deliver that.** The next section explains why; then we show how Mento’s oracle-priced design does.

---

## Why standard AMMs (CFMMs) don’t work well for FX

Most onchain AMMs are **CFMMs** (constant-function market makers). In a CFMM:

- **State** is reserves $$R$$ (the tokens in the pool).
- **Price is determined only by reserves**: the pool has a **trading function** of reserves only. A swap (tender $$\Delta$$, receive $$\Lambda$$) is **accepted** if the function is constant after the trade (with fee parameter $$\gamma$$). The **execution price** comes from this rule (e.g. from the gradient of $$\varphi$$).
- There is **no oracle** in the rule. External prices enter only when **arbitrageurs** trade and move reserves so that the pool price aligns with the market.

**Main CFMM formulas:**

- **Trading function** (reserves only):

  $$\varphi(R)$$

  A prominent **instance** of a CFMM is the **constant-product market maker (CPMM)**; a well-known example is **Uniswap v2**. For two assets the trading function is:

  $$\varphi(x,y) = xy$$

- **Acceptance** (trade $$(\Delta, \Lambda)$$ with fee $$\gamma \in (0,1]$$):

  $$\varphi(R + \gamma\Delta - \Lambda) = \varphi(R)$$

- **CPMM** invariant and spot price (e.g. Uniswap v2):

  $$xy = k, \qquad \text{spot price } p = \frac{y}{x}$$

  So the quoted price is **derived from reserves** and changes only when someone trades.

So in a CFMM the **pool is the price**: the quoted rate comes from reserves and **moves only when someone trades**. Between trades, when the external market moves, the pool’s quote is **stale**. That creates two problems:

1. **LVR (loss-versus-rebalancing)** — Arbitrageurs trade against the stale quote at better-than-fair prices. LPs effectively “sell low and buy high” relative to the market; the loss to LPs equals arbitrageur profit. For constant-product pools, LVR scales with **price variance** and **marginal liquidity**; it is a structural cost of the design.
2. **Slippage** — Traders don’t get “the” market rate; they execute **along the curve**. The execution price depends on trade size (price impact). So even for a small trade, the rate can be worse than the FX rate.

**The tension:** In CFMMs, **curvature** (shape of the trading function) governs both slippage and LVR. A **flatter** curve gives **lower slippage** (better for traders) but **higher LVR** (worse for LPs), because the pool moves more when arbitrageurs trade. You **cannot** tune a CFMM so that everyone gets the fair rate with no cost: the same mechanism that sets the price from reserves creates both staleness (LVR) and slippage. So **efficient rates at the FX level are not achievable** with a reserve-only CFMM — either execution is worse than the FX rate (slippage) or LPs bleed (LVR), or both.

**Mento’s answer:** For FX and stablecoins, the **fair rate already exists** off-chain (spot, CEX). So we don’t need the pool to *discover* the price; we need the pool to **use** it. That is what an **oracle-priced** design does.

---

## Mento V3: use the known price (FPMMs)

In Mento V3, each pool uses an **oracle** (an external price feed) that supplies the exchange rate between the two tokens. The pool **always quotes that rate** (minus a fee). There is **no reserve-based curve**: execution is at the oracle, not derived from reserves.

Such a pool is a **Fixed-Price Market Maker (FPMM)**:

- **Swap price = oracle rate** (minus fee). No curve; no curve-based slippage; no LVR from a stale *curve*, because the quote is never stale from reserves — it tracks the oracle.
- **When the oracle rate is precise**, the design is **ideal**: LPs are not drained by arbitrage (no LVR), and traders get the FX rate (minus fee). The only leakage is the fee and any **oracle imprecision**; the rest of the protocol exists to **protect against** that.

**Main FPMM formulas:**

- **State**: reserves $$R$$, LP share supply $$S$$, oracle price vector $$p$$ (supplied externally, not a function of $$R$$).
- **Pool value at oracle** (sum of reserve amounts weighted by oracle prices):

  $$V = p^\top R$$

- **Acceptance** (trade $$(\Delta, \Lambda)$$ with fee $$\gamma$$): pool value at oracle is preserved,

  $$V(R + \gamma\Delta - \Lambda, p) = V(R, p) \quad \Leftrightarrow \quad p^\top(R + \gamma\Delta - \Lambda) = p^\top R$$

- **Execution**: at the **oracle** rate $$p$$ (minus fee), not from reserves.
- **Invariant** (value per LP share, preserved on swap, mint, burn, rebalance):

  $$I = \frac{V}{S} = \frac{p^\top R}{S}$$

So the **first building block** of Mento V3 is **FPMMs**: they are what allow onchain swaps at the FX rate. The remaining building blocks (limits, circuit breaker, liquidity strategies, fees, value protection) are there to **bound the damage when the oracle is wrong, stale, or manipulated**.

---

## Building blocks of Mento V3 (and why each is needed)

| Building block | What it does | Why it is needed |
|----------------|--------------|-------------------|
| **FPMMs** | Pools that quote and execute at the **oracle rate** (minus fee). No reserve-based curve. | To deliver **efficient rates** at the FX level: swap at the known price instead of discovering it from reserves (which causes LVR and slippage in CFMMs). |
| **One invariant for all operations: I = V / S** | Value at oracle per LP share is preserved on swap, mint, burn, and rebalance. | **Clear accounting** for LPs and **consistency**: when the oracle is precise, no value is extracted beyond the fee; when it isn’t, the rule still bounds what can happen (see value protection). |
| **Protection against oracle imprecision** | **Trading limits** (per-token net flow caps over 5-min and 1-day windows); **on-chain circuit breaker** (halt trading when oracle is invalid, stale, or when breakers trip); **value protection** (no swap may decrease pool value at the oracle after fees); **fees**. | The oracle can be **wrong**, **stale**, or **manipulated**. Without limits, a bad oracle could let the pool be drained. Without a circuit breaker, trading would continue at an unsafe rate. Value protection and fees cap how much anyone can extract when the rate is slightly off. |
| **Liquidity strategies (rebalancing)** | When the pool’s inventory drifts too far from the oracle (e.g. too much of one token, too little of the other), **allowlisted** strategies can **rebalance**: take one token from the pool and return the other at the oracle rate (with a **capped incentive**). | Because the pool **quotes the oracle** (no curve), inventory **drifts** with one-sided flow. Without rebalancing, the pool could become too imbalanced to serve trades. Rebalancing is a **service** that keeps the pool usable; only allowlisted strategies can do it, and the incentive is capped so value loss is bounded even if the oracle is wrong during rebalance. |

In short: **FPMMs** give you the rate; **limits and circuit breaker** protect when the oracle is bad; **liquidity strategies** keep inventory in line; **invariant, value protection, and fees** keep accounting clean and extraction bounded.

---

## One invariant for all operations

Every Mento V3 pool keeps a single **invariant** across **all** operations:

$$I = \frac{V}{S}$$

where the pool **value at the oracle price** is

$$V = p^\top R$$

(reserves valued at the oracle rate $$p$$; $$S$$ = total **LP share supply**). So $$I$$ is value at the oracle **per LP share**.

| Operation | What happens | I = V / S |
|-----------|--------------|-----------|
| **Swap** | You send token A, receive token B at oracle rate (minus fee). Reserves change; V and S unchanged. | Preserved |
| **Mint** (add liquidity) | You add both tokens in the current reserve ratio; receive LP tokens. V and S increase in proportion. | Preserved |
| **Burn** (remove liquidity) | You burn LP tokens; receive a proportional share of both reserves. V and S decrease. | Preserved |
| **Rebalance** | An allowlisted strategy takes one token from the pool and returns the other at the oracle rate (with a capped incentive). V and S unchanged. | Preserved |

**When the oracle rate is precise**, this invariant implies **no LVR**: the pool’s value at the true market price is preserved (after fees), and LPs are not systematically drained. The only leakage is the fee and any **oracle imprecision**; fees, limits, circuit breaker, and rebalance caps are there to limit that.

For definitions of CFMM, DEX, oracle, FPMM, LVR, reserves, and other terms, see the [Glossary](../reference/glossary.md).

---

## What you can do on Mento V3

1. **Swap** — Exchange one token for another at the **oracle rate** (minus fee). E.g. USDC ↔ GBPm at the USD/GBP rate.
2. **Add or remove liquidity** — Deposit both tokens in the pool’s current ratio and receive **LP tokens** (shares); or burn shares and withdraw your share of the reserves. Value per share at the oracle is preserved.
3. **Get Mento stablecoins** — Swap from USDC, USDT, EUROC, etc. in an FPMM pool, or borrow (e.g. GBPm) via a CDP. See [Getting Mento stables](../../use-mento/getting-mento-stables/README.md).
4. **Trigger rebalances** — If you run a keeper, you can call a liquidity strategy’s rebalance function (permissionlessly); the strategy may pay a capped incentive.

---

## Safety in short: when the oracle is wrong

- **Fees** — Reduce the edge for anyone trading on a slightly wrong oracle; the pool keeps the fee.
- **Value protection** — No swap may decrease the pool’s reserve value at the oracle (after fees). No one can extract more than the fee margin.
- **Trading limits** — Per-token net flow over 5-minute and 1-day windows is capped. The pool cannot be drained indefinitely even if the oracle is wrong or stuck.
- **Circuit breaker** — Trading can be **halted** when the oracle is invalid, stale, or when breakers trip (e.g. trading mode, FX hours).
- **Rebalance rules** — Only allowlisted strategies; **minimum repayment** so the rebalance incentive is capped and value loss during rebalance is bounded.

Governance (parameters, allowlists, oracle config) is driven by MENTO token holders.

---

## Where to go next

- **Use the DEX:** [Swap & liquidity](../../use/swap-and-liquidity.md) · [Getting Mento stables](../../use/getting-mento-stables/README.md)
- **Concepts:** [FPMMs](fpmm/README.md) · [Oracles, price feeds & circuit breakers](fpmm/oracles-and-circuit-breakers.md) · [Trading limits](fpmm/trading-limits.md)
- **Build:** [Integration](../build/integration/README.md)

*Previous architecture (v2):* See the [whitepaper](https://github.com/mento-protocol/whitepaper) or legacy docs.
