# Fixed-Price Market Makers (FPMMs)

An FPMM is a pool where the **effective trade price is fixed to the oracle rate** (minus fee). There is no reserve-based curve: you swap at the rate, and value per share is defined at the oracle.

---

## Why FPMMs?

In a curve-based AMM (CFMM), the pool *is* the price. Price only moves when someone trades. That creates a cost:

- **LPs lose to arbitrageurs** when the market moves and the pool is stale (LVR).
- **Traders get slippage**—execution along the curve, not at “the” market rate; after their trade, arbs capture value.

For **foreign exchange**, the rate already exists (e.g. spot, CEX). Paying for on-chain price discovery isn’t justified. An FPMM **uses the existing price**: swap at the oracle rate, no LVR, no curve slippage. On-chain FX can compete with off-chain.

---

## CFMM vs FPMM

The following table compares a typical CFMM with an FPMM.

| | CFMM | FPMM |
|---|------|------|
| **Price source** | Reserves only | Oracle |
| **Who updates price** | Traders (trades move the curve) | Rebalance (strategies bring pool back toward target) |
| **Swap execution** | Along the curve (slippage) | At oracle rate (minus fee) |
| **LVR** | Yes (arbs pick off LPs when market moves) | No (no stale curve) |
| **Slippage vs “the rate”** | Yes (curve) | No curve slippage |
| **Value per share** | Varies with pool price | At oracle (\(I = V/S\)) |

---

## Invariant: value per share at the oracle

In an FPMM, **value per share** is \(I = V/S\), where \(V\) is pool value at the **oracle** price and \(S\) is LP share supply. This is preserved on:

- **Swap** — \(V\) and \(S\) unchanged; execution at oracle (minus fee).
- **Mint** — You add liquidity at the **current pool reserve ratio** (both tokens); you receive shares in proportion. LP value per share stays at the oracle.
- **Burn** — You withdraw reserves in proportion to your shares; \(I\) is preserved.
- **Rebalance** — Pool sends one token to a strategy and receives the other at the oracle rate; \(V\) and \(S\) unchanged.

So the pool always quotes the oracle; there is no reserve-only curve. See [Oracles](oracles.md) for when the oracle is valid, and [Rebalancing & strategies](rebalancing-and-strategies.md) for how composition is managed.

---

## Why FX fits

FX rates are already set by spot and CEX markets. Using them as the oracle removes the cost of discovery (LVR and curve slippage). The remaining risks are oracle integrity and latency, and inventory drift—handled by rebalancing, trading limits, and breakers. See [Limits & breakers](limits-and-breakers.md).

---

## Next

- [Oracles](oracles.md) — What the oracle is, when it’s valid, how the pool uses it.
- [Rebalancing & strategies](rebalancing-and-strategies.md) — How pools rebalance and who does it.
- [Limits & breakers](limits-and-breakers.md) — Trading limits and circuit breakers.
