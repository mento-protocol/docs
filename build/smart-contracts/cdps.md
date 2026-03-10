# CDPs (Smart Contracts)

Mento’s CDP system is a **fork of [Liquity v2](https://www.liquity.org/)**: same contract architecture and mechanics, with **USDm as collateral** and **Mento stables (e.g. GBPm) as the debt token** per deployment. For a protocol-level overview (what you can do, collateral vs debt, Stability Pool, app/SDK usage), see **[CDPs](../../use/cdp-operations.md)** in Dive Deeper.

---

## Contract overview

The CDP system is implemented by the standard Liquity v2 contract suite (and Mento’s fork of it in [mento-core](https://github.com/mento-protocol/mento-core)):

| Role | Purpose |
|------|--------|
| **BorrowerOperations** | Open, adjust, and close troves; add/withdraw collateral, borrow, repay. |
| **TroveManager** | Trove state, collateralization checks, liquidations, redemption order. |
| **Stability Pool** | Holds debt-token deposits; absorbs debt from liquidated troves in exchange for collateral; used by CDPLiquidityStrategy for expansion rebalancing. |
| **CollateralToken / DebtToken** | In Mento’s fork, collateral is USDm (or configured stable) and debt is e.g. GBPm. |
| **SystemParams** | Minimum debt, liquidation penalties, CCR/MCR/BCR, redemption fee floor, gas compensation, etc. |

Liquidations, redemptions, gas compensation, and fee flows work as in Liquity v2; the main Mento-specific difference is **which assets** are collateral and debt.

---

## Where to find full contract documentation

Contract-level behavior, state variables, and all protocol rules are not re-documented here. Use the **Liquity v2** documentation:

* **[Liquity v2 documentation](https://docs.liquity.org/)** — technical resources and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

For Mento deployment addresses, parameter choices, and integration with [CDPLiquidityStrategy](liquidity-strategies.md), see [mento-core](https://github.com/mento-protocol/mento-core) and the [Deployments](deployments/README.md) section.
