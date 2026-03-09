# How it works & stablecoins

Plain-language overview of Mento v3 and the stablecoins/pools it offers.

---

## How it works (five steps)

1. **Price discovery has a cost.** In a typical AMM the pool *is* the price—it moves only when someone trades. LPs and traders lose to arbitrageurs (worse execution, value leakage). For FX the rate already exists; paying that cost isn’t justified.

2. **Mento uses the existing price.** The pool swaps at the **oracle** rate (minus fee). The **oracle** is an external price feed (e.g. FX rate). No curve; **value per share** (LP share worth at oracle price) is preserved on swap, mint, burn, rebalance.

3. **Drift → rebalance.** When the pool holds too much of one token, an allowlisted **strategy** (Reserve or CDP) can **rebalance**: pool sends one token to the strategy, receives the other at the oracle rate. Capped and gated.

4. **Liquidity from strategies.** The **Reserve** (protocol reserve) and **CDP** (collateralized debt position, e.g. GBPm) supply liquidity and rebalance. Both are allowlisted.

5. **Safety.** **Value protection** (reserve value at oracle can’t fall after fees); **trading limits** (per-token caps over 5-min / 1-day); **breakers** (e.g. trading mode, FX hours). Swaps revert when violated.

More: [FPMMs](../concepts/fpmm.md) (comparison with curve-based AMMs, invariant).

---

## Stablecoins on v3

| Stablecoin | Strategy | Notes |
|------------|----------|--------|
| USDm, EURm, etc. | Reserve | Mento Dollar, Mento Euro. Reserve supplies liquidity. |
| GBPm | CDP | Mento Pound. Liquity-style: borrow, repay, stability pool. |

Pools pair Mento stables with external stables (USDC, USDT, EUROC, etc.); the Celo token is not supported. Deployment details and parameters: [Deployments](../build/deployments.md). Pool lists: parameter notes in repo (e.g. `parameters/suggested_fpmm_*.tex`).

*Legacy v2: [v2 docs](https://docs.mento.org).*

---

## Next steps

- **Use the app:** [Mento app](https://app.mento.org/) — swap, add/remove liquidity, borrow, repay, stability pool.
- [Getting stables](../use/getting-stables.md) · [FPMM operations](../use/fpmm-operations.md) · [CDP operations](../use/cdp-operations.md)
- [FPMMs](../concepts/fpmm.md) · [Oracles](../concepts/oracles.md) · [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md)
