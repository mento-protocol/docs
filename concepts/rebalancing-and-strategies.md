# Rebalancing & strategies

When the pool’s composition drifts from the target (e.g. too much of one token), **rebalancing** moves it back: the pool sends one token to an allowlisted **liquidity strategy**, and the strategy returns the other token at the oracle rate. Rebalancing is capped and gated so it can’t be gamed.

---

## What rebalancing is

- The pool holds two tokens. Its **reserve-implied price** can deviate from the **oracle** (e.g. after one-sided swaps).
- **Rebalance** = pool sends one token out to a **strategy**, and the strategy sends the other token back (at the oracle rate). Reserves and value at oracle are updated; LP share supply is unchanged.
- Only **allowlisted** strategies can call rebalance. The pool calls back into the strategy so the flow is: pool → transfer out → strategy’s `onRebalance` → strategy returns the other token.

This is **not** a “flash swap” or arbitrary flash loan—it’s a fixed callback flow with acceptance rules (improve deviation, preserve direction, no overshoot, minimum repayment). The incentive to the strategy is capped (e.g. strategy may retain a small share of the rebalance amount; the pool enforces a minimum repayment).

---

## Liquidity strategies (types)

Two types supply liquidity to Mento v3 pools:

| Type | Role | Example |
|------|------|---------|
| **Reserve** | Protocol reserve. Holds assets and returns the other side when the pool rebalances. | cUSD, EURm, and other Reserve-backed stablecoins. |
| **CDP** | Collateralized debt position (Liquity-style). Users borrow stablecoins against collateral; stability pool and redemption support the peg. | GBPm. |

Strategies are allowlisted per pool. The pool only accepts rebalance calls from these strategies and enforces acceptance rules (deviation, direction, boundary, minimum repayment). See [Reserve & stability](reserve-and-stability.md) for how the peg is maintained (redemption, CDP for GBPm).

---

## When rebalancing is allowed

Rebalancing is only allowed when:

- **Deviation** from the oracle exceeds a threshold (separate for “above” vs “below”).
- The move **improves** deviation and **preserves direction** (e.g. above oracle stays above).
- The pool does **not overshoot** past a boundary (e.g. rebalance to a band, not to exact 50/50).
- **Minimum repayment** is met (incentive cap).

So you can’t trigger an unbounded rebalance with a tiny trade; the rebalance size is of the order of the trigger. Thresholds and boundaries limit incentive cycling and MEV.

---

## Next

- [Reserve & stability](reserve-and-stability.md) — Reserve role, peg (redemption, CDP for GBPm).
- [Limits & breakers](limits-and-breakers.md) — Trading limits and breakers.
- [FPMMs](fpmm.md) — Invariant and value per share.
