# Oracles & price feeds

This page explains how **oracles** and **price feeds** work in Mento v3. An **oracle** is an external source of price data that the protocol trusts. In v3, each FPMM pool uses an oracle to set the **swap rate**: every swap executes at that rate (minus fee), so oracle quality and validity are central to safety.

---

## Why oracles matter in Mento v3

In an **FPMM** (Fixed-Price Market Maker), the **execution price is the oracle rate** (minus fee). The pool does not derive the price from its reserves. So:

- **Correctness** — If the oracle is wrong, the pool can quote a bad rate and LPs or the pool can lose value.
- **Freshness** — If the oracle is stale (not updated), the quoted rate may lag the market; trading limits and circuit breakers help bound the damage.
- **Gating** — In v3, the pool will **revert** swaps when the oracle is invalid, stale, or when **circuit breakers** (e.g. trading mode, FX market hours) say not to trade.

So oracles are both the **source of the swap rate** and one of the **safety gates** for trading.

---

## How the pool gets the rate (v3)

In Mento v3, pools get the oracle rate through an **OracleAdapter**. The pool calls the adapter (e.g. `getFXRateIfValid`) with a **reference rate feed ID** (which pair to use, e.g. USDC/USD or EUR/USD). The adapter returns a rate only if it is **valid**. Validity typically includes:

- **Recency** — The feed has been updated within a configured time window (stale data is rejected).
- **Trading mode** — A **BreakerBox** (or similar) can put feeds into a state where “trading” is suspended (e.g. after a large price move or during certain hours). The adapter checks this and may return “invalid” so the pool reverts the swap.
- **FX market hours** (if configured) — For FX pairs, the adapter may only consider the rate valid during certain hours when reference markets are open.

So the **OracleAdapter** is the single interface the pool uses: it combines the raw price feed (e.g. from Chainlink or from an on-chain median of reports) with **validity** and **breaker** logic. If the adapter says the rate is invalid, the pool does not swap.

---

## BreakerBox and circuit breakers

The **BreakerBox** (or equivalent in v3) is a contract that monitors price feeds and can **trip** breakers when conditions are abnormal (e.g. price move too large, or deviation from a reference). When a breaker is tripped, the **trading mode** for that feed can change so that the OracleAdapter returns “invalid” for swaps. So:

- **Circuit breaker** — A rule that, when triggered, can halt trading (or throttle it) for affected pools. In v3, this is typically integrated into the OracleAdapter: the pool asks “give me the rate if valid,” and the adapter only returns a rate if breakers allow trading.
- **Trading mode** — A state (e.g. “trading allowed” vs “trading suspended”) that the BreakerBox sets per feed. The OracleAdapter reads this before returning a rate.

Different breaker types exist (e.g. **MedianDeltaBreaker** for volatile pairs, **ValueDeltaBreaker** for stable pairs). Governance configures thresholds and cooldowns. The important point for users: **if the oracle is invalid or breakers have halted trading, your swap will revert.**

---

## Price sources and aggregation (background)

Behind the adapter, the protocol may use one or more **price sources**:

- **Chainlink** — Decentralized oracle network; many pairs have a Chainlink price feed. The adapter (or an underlying contract) may read from a Chainlink aggregator and enforce heartbeat and deviation checks.
- **On-chain median (e.g. SortedOracles)** — Some deployments use a contract where multiple **reporters** submit prices and the contract stores a **median** and timestamps. Reports older than an **expiry** are considered stale. The OracleAdapter may read from this median and apply the same validity and breaker checks.

**Rate feed ID** — Each pool is configured with a **reference rate feed ID** (an identifier for the pair, e.g. USDC/USD). That ID is used when the pool asks the OracleAdapter for the rate. Governance or deployment config sets which feed each pool uses and whether to **invert** the rate (e.g. if the feed is USD per USDC but the pool needs USDC per USDm).

---

## Summary for v3

| Component | Role |
|-----------|------|
| **Oracle** | External source of price data; the pool uses it as the swap rate (minus fee). |
| **OracleAdapter** | Contract the pool calls to get the rate; returns a rate only if **valid** (recent, trading allowed, etc.). |
| **BreakerBox** | Monitors feeds and can set **trading mode** so the adapter refuses to return a rate (swaps revert). |
| **Rate feed ID** | Identifier for the pair (e.g. USDC/USD); configured per pool. |
| **Validity** | Recency, trading mode, and (optionally) FX hours; all must pass for a swap to use the rate. |

---

## Next steps

- [Trading limits & circuit breakers](trading-limits-and-circuit-breakers.md) — How trading limits (caps per token) and breakers (halts) protect the pool.
- [Fixed-Price Market Makers (FPMMs)](fixed-price-market-makers-fpmms.md) — How the pool uses the oracle rate for swaps and value protection.
- [Legacy (v2)](../legacy-v2.md) — v2 used SortedOracles and a different broker/pool design; v3 uses OracleAdapter and FPMMs.
