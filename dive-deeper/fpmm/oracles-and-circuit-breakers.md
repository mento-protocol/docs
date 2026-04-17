# Oracles, price feeds & circuit breakers

This page explains how **oracles** and **price feeds** work in Mento V3, and how **circuit breakers** gate trading. An **oracle** is an external source of price data that the protocol trusts. In V3, each FPMM pool uses an oracle to set the **swap rate**: every swap executes at that rate (minus fee), so oracle quality and validity are central to safety.

**Today, Chainlink is the only oracle source used in Mento V3.** The `OracleAdapter` is the protocol's validity-gated interface to that Chainlink-backed rate path.

For **FX-priced FPMMs**, this also means pool activity inherits **FX market-hours restrictions** from `OracleAdapter -> MarketHoursBreaker`. In practice, affected pools can be unavailable for quoting and swapping on weekends and certain holidays even if the last oracle price is still on-chain.

---

## Why oracles matter in Mento V3

In an **FPMM** (Fixed-Price Market Maker), the **execution price is the oracle rate** (minus fee). The pool does not derive the price from its reserves. So:

- **Correctness** — If the oracle is wrong, the pool can quote a bad rate and LPs or the pool can lose value.
- **Freshness** — If the oracle is stale (not updated), the quoted rate may lag the market; TradingLimitsV2 and circuit breakers help bound the damage.
- **Gating** — In V3, the pool will **revert** swaps when the oracle is invalid, stale, or when **circuit breakers** (e.g. trading mode, FX market hours) say not to trade.

So oracles are both the **source of the swap rate** and one of the **safety gates** for trading.

---

## How the pool gets the rate (V3)

In Mento V3, pools get the oracle rate through an **OracleAdapter**. The pool calls the adapter (e.g. `getFXRateIfValid`) with a **reference rate feed ID** (which pair to use, e.g. USDC/USD or EUR/USD). The adapter returns a rate only if it is **valid**. Validity typically includes:

- **Recency** — The feed has been updated within a configured time window (stale data is rejected).
- **Trading mode** — A **BreakerBox** (or similar) can put feeds into a state where "trading" is suspended (e.g. after a large price move or during certain hours). The adapter checks this and may return "invalid" so the pool reverts the swap.
- **FX market hours** (if configured) — For FX pairs, the adapter may only consider the rate valid during certain hours when reference markets are open.

So the **OracleAdapter** is the single interface the pool uses: it combines the current **Chainlink-backed** price feed with **validity** and **breaker** logic. If the adapter says the rate is invalid, the pool does not swap.

---

## Weekend And Holiday Impact

For FX-priced FPMMs, `OracleAdapter.getFXRateIfValid(rateFeedID)` checks not only recency and trading mode, but also whether the FX market is currently considered open.

Under the current `MarketHoursBreaker`, FX is treated as closed:

- from **Friday 21:00 UTC** until **Sunday 23:00 UTC**
- on **Dec 25** and **Jan 1**
- after **22:00 UTC** on **Dec 24** and **Dec 31**

### Not Possible While FX Markets Are Closed

- **Quote or swap** on affected FX-priced pools such as **GBPm/USDm** or **EURm/USDm**
- **Rebalance** affected FX-priced pools, because the pool cannot read a valid FX rate
- **App or SDK flows** that depend on a live FX quote for those pools

### Still Possible While FX Markets Are Closed

- **Add liquidity** (`mint`) to an existing pool if you already hold both tokens in the required ratio
- **Remove liquidity** (`burn`) from an existing pool
- Use pools that do **not** rely on FX market-hours gating, such as **USDC/USDm**

So the weekend/holiday restriction is not a generic shutdown of all FPMMs. It specifically affects **FX-priced pool operations that require a live valid FX rate**.

---

## BreakerBox and circuit breakers

The **BreakerBox** (or equivalent in V3) is a contract that monitors price feeds and can **trip** breakers when conditions are abnormal. When a breaker trips, the **trading mode** for that feed can change so that the OracleAdapter returns "invalid" for swaps.

- **Circuit breaker** — A rule that, when triggered, can **halt trading** for affected pools. In V3, this is typically integrated into the OracleAdapter: the pool asks "give me the rate if valid," and the adapter only returns a rate if breakers allow trading. Circuit breakers are **binary**: trading is either allowed or halted for that feed; they do not throttle.
- **Trading mode** — A state (e.g. "trading allowed" vs "trading suspended") that the BreakerBox sets per feed. The OracleAdapter reads this before returning a rate.
- **Trip conditions** — The BreakerBox can trip when, for example: the price moves too much vs a reference or exponential moving average (**MedianDeltaBreaker** for volatile pairs, **ValueDeltaBreaker** for stable pairs); the oracle is stale; or a deviation threshold is violated.
- **Cooldown** — After a breaker trips, a **cooldown** period (and normalization of conditions) must pass before the breaker can be reset and trading allowed again.

Different breaker types exist; governance configures thresholds and cooldowns. **If the oracle is invalid or breakers have halted trading, your swap will revert.**

---

## Current price source

Mento V3 currently uses **Chainlink as its only oracle source**.

- **Chainlink** — The economic price source for Mento V3 pools today. The adapter uses a Chainlink-backed rate path and enforces recency, trading-mode, and FX-market-hours checks before a pool can trade on that rate.
- **OracleAdapter validity layer** — The adapter does more than return a price: it also checks whether trading should be allowed right now. So the production oracle path is not just "read Chainlink," but "read the Chainlink-backed rate and apply Mento validity rules."

**Rate feed ID** — Each pool is configured with a **reference rate feed ID** (an identifier for the pair, e.g. USDC/USD). That ID is used when the pool asks the OracleAdapter for the rate. Governance or deployment config sets which feed each pool uses and whether to **invert** the rate.

---

## Summary

| Component | Role |
|-----------|------|
| **Oracle** | External source of price data; in Mento V3 today this is Chainlink, and the pool uses that rate as the swap rate (minus fee). |
| **OracleAdapter** | Contract the pool calls to get the rate; returns a rate only if **valid** (recent, trading allowed, breakers not tripped, etc.). |
| **BreakerBox** | Monitors feeds and can set **trading mode** so the adapter refuses to return a rate (swaps revert). |
| **Circuit breaker** | Rule that, when triggered (e.g. price move too large), halts trading for that feed until cooldown and normalization. |
| **Rate feed ID** | Identifier for the pair (e.g. USDC/USD); configured per pool. |

---

## Next steps

- [Trading limits](trading-limits.md) — Caps on net flow per token over time windows.
- [Fixed-Price Market Makers (FPMMs)](README.md) — How the pool uses the oracle rate for swaps.
