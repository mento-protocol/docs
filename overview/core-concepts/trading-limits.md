# Trading limits

Mento v3 protects pools with **trading limits**: caps on how much can flow **per token** over fixed time windows. Even if the oracle is wrong or stale, an attacker cannot drain the pool without bound in one go. Trading limits work alongside **circuit breakers** (which can halt trading entirely when conditions are abnormal); see [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md).

---

## How trading limits work (v3: TradingLimitsV2)

**Trading limits** restrict how much **net flow** (in minus out) of each token can occur over specific **time windows**. In Mento v3, the **TradingLimitsV2** contract (or equivalent) is used:

- **Windows** — Typically two windows per token: a **short window** (e.g. 5 minutes) and a **long window** (e.g. 1 day). Each pool can configure limits for token0 and token1 separately.
- **Net flow** — The limit applies to **net** flow (inflow minus outflow) of that token over the window. So if the limit is 1M units per 5 minutes, you cannot have more than 1M units **net** flow in (or out) in any rolling 5-minute period. Inflow is often counted after deducting fees so that fee revenue does not consume the limit.
- **Enforcement** — After each swap, the pool (or a library it uses) updates the net flow for the relevant window(s) and **reverts** the swap if the new net flow would exceed the configured cap.

Trading limits are **per-token, per-window** caps. They do not stop trading; they stop **unbounded** one-sided flow. Normal trading stays under the caps; only extreme or sustained one-sided flow hits them.

---

## Summary

| Term | Meaning |
|------|--------|
| **Trading limit** | A cap on **net flow** of a token over a **time window** (e.g. 5 min, 1 day). A swap that would exceed the cap reverts. |
| **TradingLimitsV2** | The v3 mechanism that enforces per-token, per-window limits on pool swaps. |

---

## Next steps

- [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md) — How the pool gets the rate and when trading is halted by breakers.
- [Fixed-Price Market Makers (FPMMs)](fixed-price-market-makers-fpmms.md) — Value protection and how swaps use the oracle rate.
