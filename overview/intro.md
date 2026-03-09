# How it works & stablecoins

This page explains how Mento v3 works in plain terms and lists the stablecoins and pools available on v3.

---

## How it works (five steps)

1. **Price discovery has a cost.** In a typical AMM the pool *is* the price—it only moves when someone trades. LPs and traders end up paying arbitrageurs (through worse execution and value leakage). For FX, the rate already exists elsewhere; paying that cost isn’t justified.

2. **Mento uses the existing price.** The pool swaps at the **oracle** rate (minus a small fee). There’s no reserve-based curve, so no curve slippage and no structural loss to arbs. Value per share is defined at the oracle and preserved on every swap, mint, burn, and rebalance.

3. **When composition drifts, the pool rebalances.** Allowlisted strategies (e.g. the Reserve or a CDP) can rebalance: the pool sends one token out and receives the other back at the oracle rate. Rebalancing is capped and gated so it can’t be gamed.

4. **Liquidity comes from strategies.** The Reserve (protocol reserve) and CDP (collateralized debt position, e.g. for GBPm) supply liquidity to pools. They are allowlisted and call the pool’s rebalance flow.

5. **Safety:** Value protection (reserve value at oracle doesn’t decrease after fees), trading limits (per-token caps over time), and breakers (e.g. trading mode, FX hours) protect the system.

For the full story—including how this compares to curve-based AMMs and where terms like “oracle” and “rebalance” are defined—see [Fixed-Price Market Makers (FPMMs)](../concepts/fpmm.md).

---

## Stablecoins on v3

Mento v3 stablecoins and pools are listed by chain and liquidity strategy. Deployment details and parameters live in [Deployments](../build/deployments.md); parameter notes in the repo (e.g. `parameters/suggested_fpmm_*.tex`) are the source for “which pools exist.”

| Stablecoin / pool type | Strategy | Notes |
|------------------------|----------|--------|
| cUSD, EURm, etc. (Reserve-backed) | Reserve | Protocol reserve supplies liquidity. |
| GBPm | CDP | Liquity-style CDP; borrow, repay, stability pool. |

*Some assets may still use the legacy v2 exchange; for those, see the [v2 documentation](https://docs.mento.org) (link to be updated).*

---

## Next steps

- **Get stables:** [Getting stables](../use/getting-stables.md)
- **Swap or add liquidity:** [FPMM operations](../use/fpmm-operations.md)
- **Borrow or use stability pool:** [CDP operations](../use/cdp-operations.md)
- **Concepts:** [FPMMs](../concepts/fpmm.md) · [Oracles](../concepts/oracles.md) · [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md)
