# Limits & breakers

**Trading limits:** per-token netflow cap over a window (e.g. 5-min, 1-day). Exceed → swap reverts. **Breakers:** conditions (trading mode, FX hours) that make the oracle invalid → swap reverts. Together they bound one-sided flow and stale/invalid price risk.

---

## Trading limits

- Per-token **netflow** over window capped (e.g. 5-min, 1-day).
- Swap that would exceed limit → **revert**. Caps drain risk even if oracle is wrong or stale.
- Works with value protection and rebalance rules.

---

## Breakers and oracle gating

Oracle valid only when:
- **Recency** — Rate fresh.
- **Trading mode** — BreakerBox can restrict (e.g. normal vs restricted).
- **FX hours** (optional) — Some feeds only during FX hours.

Trip or invalid → adapter reports invalid → swap reverts. Oracle role: [Oracles](oracles.md).

---

## Summary

| Mechanism | Role |
|-----------|------|
| Value protection | Reserve value at oracle must not decrease after fee; else revert. |
| Trading limits | Cap netflow per token (5-min, 1-day); exceed → revert. |
| Breakers | Gate oracle; invalid → revert. |

Implementation: build docs (contracts, architecture).

---

## Next

- [Oracles](oracles.md) — Price feed, validity.
- [FPMMs](fpmm.md) — Swap at oracle, value per share.
