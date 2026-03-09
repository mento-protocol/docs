# Oracles

**Oracle:** external price feed (e.g. FX rate) the pool uses for swap quote and value checks. Pool **reads** the rate; it doesn’t discover price from trades. Rate is **valid** or invalid (recency, trading mode, optional FX hours). Invalid or gated → swap reverts.

---

## Role

- **Quote and execute** — Oracle rate minus fee. No curve.
- **Value check** — Reserve value at oracle must not decrease after fees (**value protection**); else revert.

Oracle is external; not updated by the pool or traders. Implementation (who provides, aggregation): build docs.

---

## When the price is valid

- **Recency** — Rate fresh enough (not stale).
- **Trading mode** — BreakerBox can gate (e.g. normal vs restricted).
- **FX hours** (optional) — Some feeds valid only during FX hours.

If any fail, swap reverts. Exact rules: oracle adapter and BreakerBox; behavior: [Limits & breakers](limits-and-breakers.md).

---

## Swap flow

1. User requests swap.
2. Pool asks adapter for rate (e.g. FX-valid getter).
3. Invalid/gated → revert.
4. Valid → quote = rate × (1 − fee); execute; check value protection.

Rebalancing (composition) is separate: [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## BreakerBox

Aggregates breakers (trading mode, FX hours); gates the oracle. Breaker trip → adapter reports invalid → swaps revert. Contract roles: build docs.

---

## Next

- [Limits & breakers](limits-and-breakers.md) — Netflow caps, breaker behavior.
- [FPMMs](fpmm.md) — Invariant, swap at oracle.
