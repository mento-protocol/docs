# Trading limits & circuit breakers

Mento v3 protects pools with **trading limits** (caps on how much can flow per token over time) and **circuit breakers** (rules that can halt trading when conditions are abnormal). This page defines these terms and describes how they work in v3. No prior knowledge is assumed.

---

## Why protection matters

In an **FPMM**, every swap executes at the **oracle rate** (minus fee). If the **oracle** is wrong, stale, or manipulated, the pool could quote a bad rate and LPs could lose value. Two complementary mechanisms limit that risk:

1. **Trading limits** — Cap how much can flow in or out of the pool **per token** over fixed time windows. So even if the oracle is wrong, an attacker cannot drain the pool without bound in one go.
2. **Circuit breakers** — Can **halt trading** when the oracle or the market behaves abnormally (e.g. price move too large, oracle stale). When a breaker trips, the pool will not accept swaps (the OracleAdapter returns “invalid”) until conditions normalize.

---

## Trading limits (v3: TradingLimitsV2)

**Trading limits** restrict how much **net flow** (in minus out) of each token can occur over specific **time windows**. In Mento v3, the **TradingLimitsV2** contract (or equivalent) is used:

- **Windows** — Typically two windows per token: a **short window** (e.g. 5 minutes) and a **long window** (e.g. 1 day). Each pool can configure limits for token0 and token1 separately.
- **Net flow** — The limit applies to **net** flow (inflow minus outflow) of that token over the window. So if the limit is 1M units per 5 minutes, you cannot have more than 1M units **net** flow in (or out) in any rolling 5-minute period. Inflow is often counted after deducting fees so that fee revenue does not consume the limit.
- **Enforcement** — After each swap, the pool (or a library it uses) updates the net flow for the relevant window(s) and **reverts** the swap if the new net flow would exceed the configured cap.

So trading limits are **per-token, per-window** caps. They do not stop trading; they stop **unbounded** one-sided flow. Normal trading stays under the caps; only extreme or sustained one-sided flow hits them.

---

## Circuit breakers (v3: BreakerBox and OracleAdapter)

**Circuit breakers** are rules that can **suspend trading** when something is wrong. In v3:

- The **BreakerBox** (or equivalent) monitors price feeds and can **trip** when, for example:
  - The price moves too much compared to a reference or an exponential moving average (**MedianDeltaBreaker** for volatile pairs, **ValueDeltaBreaker** for stable pairs).
  - Other configured conditions (e.g. oracle stale, deviation threshold) are violated.
- When a breaker trips, the **trading mode** for that feed can change to “trading suspended.” The **OracleAdapter** then **refuses** to return a valid rate when the pool asks for it. So every swap that uses that feed **reverts** until the breaker is reset (after a **cooldown** and when conditions normalize).

So circuit breakers are **binary**: trading is either allowed or halted for that feed. They do not throttle; they **stop** swaps when the system is in an abnormal state.

---

## How they work together

- **Normal conditions** — Trading limits apply (you cannot exceed the per-token caps), and breakers are not tripped, so the OracleAdapter returns a valid rate and swaps succeed.
- **High flow** — If net flow in a window approaches the cap, the next swap that would exceed it reverts. Trading continues for the other token or after the window rolls.
- **Abnormal oracle/market** — If a breaker trips, the OracleAdapter returns invalid; all swaps that depend on that feed revert until the breaker resets (after cooldown and normalization).

So: **limits** bound how much can move in/out per token over time; **breakers** turn off trading entirely when the oracle or market is in a bad state.

---

## Governance

Parameters (limit sizes, window lengths, breaker thresholds, cooldowns) are set by **governance** (MENTO token holders) or by pool admin where allowed. The **actions** (reverting a swap when over limit, or when the adapter says invalid) are **automatic**; no manual step is required to enforce them.

---

## Summary

| Term | Meaning |
|------|--------|
| **Trading limit** | A cap on **net flow** of a token over a **time window** (e.g. 5 min, 1 day). A swap that would exceed the cap reverts. |
| **TradingLimitsV2** | The v3 mechanism that enforces per-token, per-window limits on pool swaps. |
| **Circuit breaker** | A rule that, when triggered (e.g. price move too large), can put a feed into “trading suspended” so the OracleAdapter returns invalid and swaps revert. |
| **BreakerBox** | Contract that monitors feeds and sets trading mode (e.g. suspended) when breakers trip. |
| **Cooldown** | Time that must pass (and conditions normalize) before a tripped breaker can be reset and trading allowed again. |

---

## Next steps

- [Oracles & price feeds](oracles-and-price-feeds.md) — How the pool gets the rate and when the OracleAdapter returns “invalid.”
- [Fixed-Price Market Makers (FPMMs)](fixed-price-market-makers-fpmms.md) — Value protection and how swaps use the oracle rate.
- [Swap & liquidity (FPMM operations)](../../use-mento/swap-and-liquidity.md) — What happens when your swap reverts (e.g. over limit or oracle invalid).
