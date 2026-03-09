# Fixed-Price Market Makers (FPMMs)

**FPMM:** effective trade price = oracle rate (minus fee). No reserve-based curve; value per share defined at the oracle.

---

## Why FPMMs?

**CFMMs** (constant-function market makers): price comes only from reserves (e.g. \(x \cdot y = k\)). No external feed. Trades move the price along the curve.

Costs:
- **LVR** — LPs lose to arbitrageurs when the market moves and the pool is stale; arbs trade at better-than-fair prices.
- **Slippage** — Execution along the curve, not at a single market rate.

For **FX** the rate already exists (spot, CEX). An FPMM uses it: swap at oracle rate, no LVR, no curve slippage.

---

## CFMM vs FPMM

| Aspect | CFMM | FPMM |
|--------|------|------|
| Price source | Reserves only | Oracle |
| Who updates price | Traders | Rebalance (strategies) |
| Swap execution | Along curve (slippage) | At oracle (minus fee) |
| LVR | Yes | No |
| Value per share | Varies with pool price | At oracle (\(I = V/S\)) |

---

## Value per share at the oracle

\(I = V/S\): pool value \(V\) at oracle price ÷ LP share supply \(S\). Preserved on:

- **Swap** — \(V\), \(S\) unchanged; execution at oracle (minus fee).
- **Mint** — Add liquidity at **current pool reserve ratio**; receive shares in proportion. \(I\) preserved.
- **Burn** — Withdraw reserves in proportion to shares; \(I\) preserved.
- **Rebalance** — Pool sends one token to strategy, gets the other at oracle rate; \(V\), \(S\) unchanged.

Detail: [Oracles](oracles.md), [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## Why FX fits

FX rates are set off-chain. Using them as the oracle removes discovery cost (LVR, curve slippage). Remaining risks: oracle integrity/latency, inventory drift—handled by rebalancing, trading limits, breakers. [Limits & breakers](limits-and-breakers.md).

---

## Next

- [Oracles](oracles.md) — Validity, how the pool uses the rate.
- [Rebalancing & strategies](rebalancing-and-strategies.md) — Who rebalances, acceptance rules.
- [Limits & breakers](limits-and-breakers.md) — Trading limits, breakers.
