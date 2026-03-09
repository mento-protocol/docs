# Rebalancing & strategies

**Rebalance:** pool sends one token to an allowlisted **liquidity strategy**; strategy returns the other at the oracle rate. Capped and gated—not a flash swap; fixed callback with acceptance rules.

---

## What rebalancing is

- **Reserve-implied price** (token ratio in pool) can deviate from the **oracle** after one-sided flow.
- **Flow:** pool → transfer out → strategy `onRebalance` → strategy returns other token. Reserves and value at oracle update; LP supply unchanged.
- Only **allowlisted** strategies. Incentive capped (strategy may keep a share; pool enforces minimum repayment).

Acceptance: improve deviation, preserve direction, no overshoot past boundary, minimum repayment. Limits incentive cycling and MEV.

---

## Strategy types

| Type | Role | Example |
|------|------|---------|
| **Reserve** | Protocol reserve; returns other side on rebalance. | USDm, EURm (Reserve-backed). |
| **CDP** | Liquity-style: borrow against collateral; stability pool, redemption. | GBPm. |

Allowlisted per pool. Acceptance rules: deviation, direction, boundary, min repayment. Peg maintenance: [Reserve & stability](reserve-and-stability.md).

---

## When rebalancing is allowed

- Deviation from oracle ≥ threshold (separate above/below).
- Move improves deviation, preserves direction (e.g. above stays above).
- No overshoot past boundary (rebalance to band, not 50/50).
- Minimum repayment met.

Rebalance size ~ trigger size; no unbounded rebalance from a tiny trade.

---

## Next

- [Reserve & stability](reserve-and-stability.md) — Reserve, peg, CDP for GBPm.
- [Limits & breakers](limits-and-breakers.md) — Trading limits, breakers.
- [FPMMs](fpmm.md) — \(I = V/S\), value per share.
