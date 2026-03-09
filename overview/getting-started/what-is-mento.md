# What is Mento?

This page explains Mento v3 in plain language and defines the main terms you will see in the rest of the docs. No prior knowledge of DeFi or AMMs is assumed.

---

## In one sentence

**Mento v3 is a decentralized exchange (DEX) for onchain foreign exchange (FX).** You swap two assets (e.g. USDC and USDm) at a rate that comes from an external **oracle** (a price feed), not from the pool’s reserves. The pool always quotes that oracle rate (minus a small fee), so there is no curve-based slippage and no structural loss to arbitrageurs. When the pool’s inventory gets too one-sided, **allowlisted liquidity strategies** **rebalance** it. The same infrastructure supports **Mento stablecoins** (USDm, EURm, GBPm): you can get them by swapping (e.g. USDC → USDm) or by borrowing (e.g. GBPm via a CDP).

---

## Core terms (defined before use)

- **DEX (decentralized exchange):** A place where you can swap tokens without a central custodian. Trades are executed by smart contracts on a blockchain.
- **FX (foreign exchange):** Exchange of one currency (or currency-like asset) for another at a rate (e.g. USD/EUR, USDC/USDm).
- **Oracle:** An external source of price data (e.g. “1 USDC = 1 USD”) that the protocol trusts. In Mento v3, each pool uses an oracle to set the **swap rate**; the pool does not derive the rate from its own reserves.
- **FPMM (Fixed-Price Market Maker):** A type of pool used by Mento v3. The **effective swap price is fixed to the oracle rate** (minus fee). There is no **reserve-based curve**: the pool does not move the price as you trade size. So you get the oracle rate (minus fee) regardless of trade size (subject to liquidity and limits).
- **Reserves:** The two tokens held by a pool (e.g. USDC and USDm). When you swap, you send one token in and receive the other out; reserves change, but the **value** of the pool at the oracle price is preserved (minus fees).
- **AMM (automated market maker):** A pool that sets prices by a rule (e.g. a formula) rather than an order book. Many AMMs use a **curve**: the price you get depends on how much you trade (slippage). An **FPMM** is a special case: the price is the oracle, so there is no curve-based slippage.
- **LVR (loss-versus-rebalancing):** In curve-based AMMs, the pool’s quoted price can be “stale” between trades, so arbitrageurs can trade at better-than-fair prices and LPs lose value. In an FPMM the pool always quotes the oracle, so **LVR from a stale curve is zero**.
- **Invariant:** A quantity that the protocol keeps unchanged by every allowed operation. In Mento v3 FPMMs, the invariant is **I = V / S**: the pool’s **value at the oracle price** (V) divided by the **total supply of LP shares** (S). So “value per LP share at the oracle” is preserved on swap, mint, burn, and rebalance.
- **Rebalance:** When the pool holds too much of one token and too little of the other, a **liquidity strategy** (allowed by the protocol) can **rebalance**: it takes the surplus token from the pool and returns the other token at the oracle rate. This restores balance without changing the pool’s value (V) or LP share supply (S). In v3, rebalancing moves the pool toward a **threshold boundary**, not to exact 50/50.
- **Liquidity strategy:** A smart contract that is **allowlisted** by a pool and is allowed to call the pool’s rebalance function. Different strategies use different liquidity sources (e.g. the **Reserve** for fully backed stables, or a **CDP** for synthetic stables like GBPm).
- **Trading limits:** Caps on how much can flow in or out of a pool per token over a time window (e.g. 5 minutes, 1 day). They limit how much the pool can be drained even if the oracle is wrong or stale.
- **Circuit breakers:** Rules that can **halt trading** when conditions are abnormal (e.g. oracle stale, price move too large). In v3, the **BreakerBox** and **OracleAdapter** gate when the pool will accept swaps.
- **Value protection:** A rule that every swap must not decrease the pool’s **reserve value at the oracle** (after accounting for fees). So no one can extract more value than the fee margin.

---

## What you can do on Mento v3

1. **Swap** — Exchange one token for another at the **oracle rate** (minus fee). No curve slippage; execution is at the oracle.
2. **Add or remove liquidity** — Deposit both tokens in proportion to the pool’s current reserves and receive **LP (liquidity provider) tokens** (shares); or burn shares and withdraw your share of the reserves. Value per share at the oracle is preserved.
3. **Get Mento stablecoins** — One use case of the DEX is to obtain USDm, EURm, or GBPm: swap from USDC, USDT, EUROC, etc. in an FPMM pool, or borrow (e.g. GBPm) via a CDP. See [Getting Mento stables](../use-mento/getting-mento-stables/README.md).
4. **Trigger rebalances** — If you run a keeper, you can call a liquidity strategy’s rebalance function (permissionlessly); the strategy may pay a capped incentive.

---

## Why “DEX for FX” and not only “stablecoins”?

In v3 the **main product** is the **exchange**: oracle-priced pools where you swap at the rate provided by the oracle. **Mento stablecoins** (USDm, EURm, GBPm) are **one application** of that infrastructure: they are the “Mento” side of many pools (e.g. USDC/USDm, EUROC/EURm). So the docs lead with “swap and liquidity” and “how the DEX works”; “getting Mento stables” is one path on top of that.

---

## Safety in short

- **Value protection** — Swaps cannot reduce the pool’s value at the oracle (after fees).
- **Trading limits** — Per-token net flow over 5-minute and 1-day windows is capped.
- **Circuit breakers** — Trading can be suspended when the oracle is invalid, stale, or when breakers trip (e.g. trading mode, FX hours).
- **Rebalance rules** — Only allowlisted strategies can rebalance; rebalance must improve deviation, not overshoot, and respect a minimum repayment (incentive cap).

Governance (e.g. parameters, allowlists) is driven by MENTO token holders.

---

## Where to go next

- **Use the DEX:** [Swap & liquidity (FPMM operations)](../../use-mento/swap-and-liquidity.md) · [Getting Mento stables](../../use-mento/getting-mento-stables/README.md)
- **Concepts:** [Fixed-Price Market Makers (FPMMs)](../core-concepts/fixed-price-market-makers-fpmms.md) · [Oracles & price feeds](../core-concepts/oracles-and-price-feeds.md) · [Trading limits & circuit breakers](../core-concepts/trading-limits-and-circuit-breakers.md)
- **Build:** [Integration overview](../../build-on-mento/integration-overview/README.md)

*Previous architecture (v2):* [Legacy (v2)](../legacy-v2.md).
