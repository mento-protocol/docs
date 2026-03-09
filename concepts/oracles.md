# Oracles

The **oracle** is the price feed the pool uses for swaps and value checks. In Mento v3, the pool reads the rate from an oracle adapter; validity depends on recency, trading mode, and (optionally) FX market hours. When the oracle is invalid or gated, swaps revert.

---

## What the oracle is

The oracle supplies a **price** (e.g. FX rate between the two pool tokens). The pool uses it to:

- **Quote and execute swaps** — You get the oracle rate (minus fee). No reserve-based curve.
- **Check value** — Reserve value at oracle must not decrease after fees (value protection).

The oracle is **not** updated by the pool or by traders; it is an external feed. Who provides it and how it’s aggregated is an implementation detail (see build docs); at concept level, we only need: the pool has a rate, and that rate can be valid or invalid.

---

## When the price is valid

The pool only swaps when the oracle is considered **valid**. Validity typically depends on:

- **Recency** — The rate must be recent enough (e.g. not stale).
- **Trading mode** — BreakerBox can gate trading (e.g. normal vs. restricted).
- **FX hours** (optional) — Some feeds are only valid during FX market hours.

If any of these conditions fail, the swap reverts. So the pool never executes at a stale or gated rate. The exact rules live in the oracle adapter and BreakerBox; for limits and circuit-breaker behavior, see [Limits & breakers](limits-and-breakers.md).

---

## How the pool uses it

1. User (or router) requests a swap.
2. Pool asks the oracle adapter for the rate (e.g. “FX-valid” getter).
3. If invalid or gated → revert.
4. If valid → quote = rate × (1 − fee); execute swap; check that reserve value at oracle did not decrease after crediting the fee (value protection).

No “who updates the price” narrative—the pool **reads** the rate. Rebalancing (which moves composition) is separate; see [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## BreakerBox and trading mode

BreakerBox aggregates breakers (e.g. trading mode, FX hours) and gates the oracle. When breakers trip, the adapter reports “invalid” and swaps revert. This is the **concept** level; for contract roles and wiring, see the build docs (architecture, contracts).

---

## Next

- [Limits & breakers](limits-and-breakers.md) — Trading limits (netflow caps) and circuit-breaker behavior.
- [FPMMs](fpmm.md) — How the invariant and swap work with the oracle.
