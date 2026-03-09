# What is Mento?

Mento v3 is a **DEX for onchain FX**: you swap two assets at a rate set by an external **oracle** (a price feed), not by the pool's reserves. This page explains what makes that approach special, how the protocol stays consistent, and how it protects against oracle imprecision.

---

## What makes this approach special

In a typical AMM, the **pool is the price**: the quoted rate comes from the reserves (e.g. a curve). That design has a cost: when the market moves, the pool is stale, so arbitrageurs trade at better-than-fair prices and **LPs lose value (LVR)**. Traders also get **slippage** along the curve. For **FX and stablecoins**, the fair rate is already known off-chain (CEX, spot). Paying for on-chain price discovery is unnecessary.

**Mento uses the known price.** Each pool has an **oracle** that supplies the exchange rate. The pool **always quotes that rate** (minus a fee). So:

- **No curve-based slippage** — Execution is at the oracle rate regardless of trade size (subject to liquidity and limits).
- **No LVR from a stale curve** — The pool is never "stale" in the reserve sense; the quote tracks the oracle.
- **When the oracle rate is precise**, the design is **ideal** for LPs and traders: value is preserved, and no one extracts more than the fee margin.

Risks shift to **oracle quality**: wrong, stale, or manipulated rates. The protocol therefore adds **fees, value protection, trading limits, circuit breakers, and capped rebalance incentives** — all to bound the damage when the oracle is imprecise. See [Safety: when the oracle is wrong](#safety-when-the-oracle-is-wrong) below.

---

## One invariant for all operations

Every Mento v3 pool keeps a single **invariant** across **all** operations:

**I = V / S**

- **V** = pool **value at the oracle price** (reserves valued at the oracle rate).
- **S** = total **LP share supply**.
- **I** = value at the oracle **per LP share**.

So "value per share at the oracle" is the one number the protocol keeps constant. That gives LPs a clear accounting: your share is always worth a well-defined amount at the oracle price.

| Operation | What happens | I = V / S |
|-----------|--------------|-----------|
| **Swap** | You send token A, receive token B at oracle rate (minus fee). Reserves change; V and S unchanged. | Preserved |
| **Mint** (add liquidity) | You add both tokens in the current reserve ratio; receive LP tokens. V and S increase in proportion. | Preserved |
| **Burn** (remove liquidity) | You burn LP tokens; receive a proportional share of both reserves. V and S decrease. | Preserved |
| **Rebalance** | An allowlisted strategy takes one token from the pool and returns the other at the oracle rate (with a capped incentive). V and S unchanged. | Preserved |

**When the oracle rate is precise**, this invariant means **no LVR**: the pool's value at the true market price is preserved (after fees), and LPs are not systematically drained by arbitrage. The only leakage is the fee and any **oracle imprecision**; the rest of the design exists to limit that.

For definitions of DEX, oracle, FPMM, reserves, and other terms, see the [Glossary](../glossary.md).

---

## What you can do on Mento v3

1. **Swap** — Exchange one token for another at the **oracle rate** (minus fee). No curve slippage.
2. **Add or remove liquidity** — Deposit both tokens in the pool's current ratio and receive **LP tokens** (shares); or burn shares and withdraw your share of the reserves. Value per share at the oracle is preserved.
3. **Get Mento stablecoins** — Swap from USDC, USDT, EUROC, etc. in an FPMM pool, or borrow (e.g. GBPm) via a CDP. See [Getting Mento stables](../../use-mento/getting-mento-stables/README.md).
4. **Trigger rebalances** — If you run a keeper, you can call a liquidity strategy's rebalance function (permissionlessly); the strategy may pay a capped incentive.

---

## Safety: when the oracle is wrong

The oracle can be **wrong**, **stale**, or **manipulated**. Fees, incentives, limits, and breakers are there to protect the pool and LPs when that happens:

- **Fees** — A small fee per swap reduces the edge for anyone trading on a slightly wrong oracle; the pool keeps the fee.
- **Value protection** — Every swap must not decrease the pool's **reserve value at the oracle** (after crediting the fee). So no one can extract more than the fee margin even if they try to game the rate.
- **Trading limits** — Per-token net flow over **5-minute** and **1-day** windows is capped. If the oracle is wrong or stuck, the pool cannot be drained indefinitely.
- **Circuit breakers** — Trading can be **halted** when the oracle is invalid, stale, or when breakers trip (e.g. trading mode, FX hours). That stops flow while the rate is unsafe.
- **Rebalance rules** — Only **allowlisted** liquidity strategies can rebalance. The pool enforces a **minimum repayment** so the rebalance incentive is capped; value loss to the pool from a bad oracle during rebalance is bounded.

Governance (parameters, allowlists, oracle config) is driven by MENTO token holders.

---

## Where to go next

- **Use the DEX:** [Swap & liquidity (FPMM operations)](../../use-mento/swap-and-liquidity.md) · [Getting Mento stables](../../use-mento/getting-mento-stables/README.md)
- **Concepts:** [Fixed-Price Market Makers (FPMMs)](../core-concepts/fixed-price-market-makers-fpmms.md) · [Oracles & price feeds](../core-concepts/oracles-and-price-feeds.md) · [Trading limits & circuit breakers](../core-concepts/trading-limits-and-circuit-breakers.md)
- **Build:** [Integration overview](../../build-on-mento/integration-overview/README.md)

*Previous architecture (v2):* [Legacy (v2)](../legacy-v2.md).
