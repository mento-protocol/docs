# FPMM operations

On Mento v3 FPMM pools you can **swap**, **mint and burn** (add/remove liquidity), and (as a strategy or operator) **rebalance**. This page describes each operation: what it is, where to do it, and where to read more.

---

## Swap

**What it is:** You send one token to the pool and receive the other at the **oracle rate** (minus a small fee). There is no reserve-based curve—no curve slippage. Value per share at the oracle is unchanged.

**Where to do it:** Use a Celo app (e.g. Valora) or another app that integrates Mento v3, or integrate via the [SDK](../build/sdk.md) / Router. Select the pair (e.g. CELO/cUSD), enter amount, confirm. Execution is at the oracle rate minus fee.

**Fees:** A fee (e.g. in basis points) is applied; you get slightly less than the raw oracle rate. Exact fee per pool is in [Deployments](../build/deployments.md) or the parameters notes.

**If swap fails:** See [Troubleshooting (users)](troubleshooting.md). Common causes: oracle invalid or gated, trading limit exceeded, or value protection revert.

**More:** [FPMMs](../concepts/fpmm.md) (invariant, comparison with CFMM).

---

## Mint & burn

**What it is:**  
- **Mint:** You add **both** tokens to the pool in the **current pool reserve ratio** and receive LP shares. You’re providing liquidity; your share of the pool is proportional. Value per share is at the oracle; it’s preserved on swap, mint, burn, and rebalance.  
- **Burn:** You return LP shares and receive both tokens back (proportional to your share of the pool).

Mint in v3 is at the **current pool ratio** (Uniswap V2–style), not “oracle-valued” entry. You get pool-implied value for your deposit.

**Where to do it:** Use an app that supports LP for Mento v3 pools, or the Router / contracts (see [Build](../build/README.md)). You need both tokens in the correct ratio for the pool.

**What you get / risks:** You earn a share of swap fees and are exposed to pool composition (rebalancing keeps it in a band). Impermanent loss is path-dependent; see concept docs. Rebalancing is capped so incentive gaming is limited.

**More:** [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md), [Reserve & stability](../concepts/reserve-and-stability.md), [Contracts](../build/contracts.md).

---

## Rebalance

**What it is:** When the pool’s composition drifts from the target (e.g. too much of one token), an **allowlisted liquidity strategy** (Reserve or CDP) can rebalance: the pool sends one token to the strategy, and the strategy returns the other token at the oracle rate. The strategy may retain a small **capped** incentive; the pool enforces a minimum repayment so value transfer is bounded.

**Who triggers:** Only allowlisted strategies (protocol Reserve or CDP strategy). Not permissionless; the pool calls back into the strategy. Thresholds and boundaries ensure you can’t trigger a huge rebalance with a tiny trade.

**Where it’s documented:** [Rebalancing & strategies](../concepts/rebalancing-and-strategies.md) (concept); [Contracts](../build/contracts.md) (FPMM rebalance flow, strategies). Implementation details: `notes/fpmm.tex`, `notes/fpmm-mento-v3-implementation.tex`.

---

## Next

- [Getting stables](getting-stables.md) — Entry point for getting cUSD, EURm, GBPm.
- [CDP operations](cdp-operations.md) — Borrow, repay, stability pool (GBPm).
- [Concepts: FPMMs](../concepts/fpmm.md) — Invariant, comparison table.
