# Limits & breakers

Trading limits cap how much the pool can move in one direction over time. Breakers (e.g. trading mode, FX hours) gate the oracle so swaps revert when conditions aren’t met. Together they bound risk from one-sided flow and from stale or invalid prices.

---

## Trading limits

**What:** Per-token **netflow** over a time window is capped. For example:

- 5-minute window: net inflow or outflow of token X cannot exceed a limit.
- 1-day window: same, over a longer window.

If a swap would push netflow over the limit, the swap **reverts**. So even if the oracle were wrong or stale, the pool can’t be drained in one direction beyond the cap.

**Why:** Limits protect the pool from large one-sided flow (e.g. a run or an oracle failure). They work together with value protection (reserve value at oracle must not decrease after fees) and rebalance rules.

---

## Breakers and oracle gating

The oracle is only used for swaps when it’s **valid**. Validity is gated by:

- **Recency** — Rate must be fresh.
- **Trading mode** — BreakerBox can restrict trading (e.g. normal vs. restricted mode).
- **FX hours** (optional) — Some feeds are only valid during FX market hours.

When any breaker trips or the rate is invalid, the adapter reports “invalid” and the pool **reverts** the swap. So the pool never executes at a stale or gated rate. For what the oracle is and how the pool uses it, see [Oracles](oracles.md).

---

## How they work together

| Mechanism | Role |
|-----------|------|
| **Value protection** | Reserve value at oracle must not decrease after fee; else revert. |
| **Trading limits** | Cap netflow per token (5-min, 1-day); swap that would exceed reverts. |
| **Breakers** | Gate oracle (trading mode, FX hours); invalid ⇒ swap reverts. |

Implementation details (contract names, config) are in the build docs (contracts, architecture).

---

## Next

- [Oracles](oracles.md) — Price feed, validity, how the pool uses it.
- [FPMMs](fpmm.md) — Swap at oracle, value per share.
