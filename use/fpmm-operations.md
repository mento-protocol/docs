# FPMM operations

**Swap**, **mint/burn** (add/remove liquidity), and **rebalance** (strategies only). What each is, where to do it, where to read more.

---

## Swap

**What:** Send one token, receive the other at **oracle rate** (external price feed minus fee). No curve; value per share unchanged.

**Where:** Celo app (e.g. Valora), any app that integrates v3, or [SDK](../build/sdk.md) / Router. Pair (e.g. CELO/USDm) → amount → confirm.

**Fees:** Basis points; you get slightly less than raw oracle rate. Per-pool: [Deployments](../build/deployments.md) or parameters notes.

**Fails:** [Troubleshooting](troubleshooting.md). Common: oracle invalid/gated, trading limit exceeded, value protection revert.

**More:** [FPMMs](../concepts/fpmm.md).

---

## Mint & burn

**What:**  
- **Mint:** Add **both** tokens in **current pool reserve ratio**; receive LP shares. Value per share at oracle; preserved on swap, mint, burn, rebalance.  
- **Burn:** Return LP shares; receive both tokens in proportion.

Mint is at current pool ratio (Uniswap V2–style), not oracle-valued entry.

**Where:** App that supports v3 LP, or Router/contracts ([Build](../build/README.md)). Need both tokens in pool ratio.

**Risks/rewards:** Share of swap fees; exposure to composition (rebalancing keeps band). **Impermanent loss** (LP value vs holding) path-dependent; rebalance capped. [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md), [Reserve & stability](../concepts/reserve-and-stability.md), [Contracts](../build/contracts.md).

---

## Rebalance

**What:** Pool composition drifts → allowlisted **strategy** (Reserve or CDP) can rebalance: pool sends one token to strategy, gets the other at oracle rate. Incentive capped; pool enforces minimum repayment.

**Who:** Only allowlisted strategies. Pool calls back into strategy. Thresholds/boundaries prevent huge rebalance from tiny trade.

**Docs:** [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md) (concept); [Contracts](../build/contracts.md) (flow, strategies).

---

## Next

- [Getting stables](getting-stables.md) · [CDP operations](cdp-operations.md) · [FPMMs](../concepts/fpmm.md)
