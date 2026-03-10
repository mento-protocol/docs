# TradingLimitsV2

Mento V3 protects pools with **TradingLimitsV2**: caps on how much can flow **per token** over fixed time windows. Even if the oracle is wrong or stale, an attacker cannot drain the pool without bound in one go. TradingLimitsV2 works alongside **circuit breakers** (which can halt trading entirely when conditions are abnormal); see [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md). (TradingLimits v1 applied to Mento V2; V3 uses TradingLimitsV2.)

---

## How TradingLimitsV2 works

**TradingLimitsV2** restricts how much **net flow** (in minus out) of each token can occur over specific **time windows**. In Mento V3, the **TradingLimitsV2** library is used:

- **Windows** — Typically two windows per token: a **short window** (e.g. 5 minutes) and a **long window** (e.g. 1 day). Each pool can configure limits for token0 and token1 separately.
- **Net flow** — The limit applies to **net** flow (inflow minus outflow) of that token over the window. So if the limit is 1M units per 5 minutes, you cannot have more than 1M units **net** flow in (or out) in any rolling 5-minute period. Inflow is often counted after deducting fees so that fee revenue does not consume the limit.
- **Enforcement** — After each swap, the pool (or a library it uses) updates the net flow for the relevant window(s) and **reverts** the swap if the new net flow would exceed the configured cap.

TradingLimitsV2 is **per-token, per-window** caps. It does not stop trading; it stops **unbounded** one-sided flow. Normal trading stays under the caps; only extreme or sustained one-sided flow hits them.

---

## Summary

| Term | Meaning |
|------|--------|
| **TradingLimitsV2** | The Mento V3 mechanism that enforces per-token, per-window limits on pool swaps (5-min and 1-day windows). Replaces TradingLimits v1 used in Mento V2. |
| **Limit / cap** | A cap on **net flow** of a token over a **time window** (e.g. 5 min, 1 day). A swap that would exceed the cap reverts. |

---

## Next steps

- [Oracles, price feeds & circuit breakers](oracles-and-circuit-breakers.md) — How the pool gets the rate and when trading is halted by breakers.
- [FPMMs](README.md) — Value protection and how swaps use the oracle rate.
