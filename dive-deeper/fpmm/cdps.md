# CDPs (collateralized debt positions)

Mento V3 uses **collateralized debt positions (CDPs)** to back **synthetic** stablecoins such as **GBPm**. The Mento CDP system is a **fork of [Liquity V2](https://docs.liquity.org/)**. For mechanics (troves, stability pool, liquidations, interest rates), the [Liquity V2 documentation](https://docs.liquity.org/) is the primary reference; this page summarizes how CDPs fit into Mento V3.

---

## Role in Mento V3

- **CDP-backed stables** (e.g. GBPm) are minted when users deposit **USDm** as collateral and open a trove (borrow the synthetic stable). There is no high-quality fiat-backed GBP stablecoin integrated at scale yet, so CDPs allow these stables to exist with USDm as collateral.
- **Stability pool** — Users can deposit CDP-backed stables (e.g. GBPm) into a **stability pool** and earn rewards when liquidations occur. The pool also acts as a **liquidity source** for the **CDP liquidity strategy**: when an FPMM pool needs to rebalance (e.g. needs more GBPm), the strategy can source it from the stability pool or from borrowing/repayment flows.
- **FPMM rebalancing** — The **CDP strategy** is allowlisted on pools that pair a CDP-backed stable (e.g. GBPm) with another asset. When the pool is imbalanced, the strategy returns the required token using the stability pool and CDP mechanics. See [Rebalancing & strategies](rebalancing-and-strategies.md).

---

## Relation to Liquity V2

Mento CDPs are a **fork of Liquity V2**. For detailed design (user-set interest rates, collateral types, troves, stability pool, liquidations), see the **[Liquity V2 documentation](https://docs.liquity.org/)**. Mento adapts the system to use **USDm** as collateral and to mint **synthetic fiat-pegged stables** (e.g. GBPm) for use in Mento’s FX-focused FPMMs.

---

## Next steps

- [Liquity V2 docs](https://docs.liquity.org/) — Full CDP/trove/stability-pool mechanics.
- [Rebalancing & strategies](rebalancing-and-strategies.md) — How the CDP strategy rebalances FPMM pools.
- [The Reserve](../the-reserve.md) — Reserve-backed stables (USDm, EURm) vs CDP-backed stables (GBPm, etc.).
