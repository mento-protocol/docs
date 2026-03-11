# CDPs (Smart Contracts)

Mento’s CDP system is a **fork of [Liquity v2](https://www.liquity.org/)** maintained in a **separate repository**: [**mento-protocol/bold**](https://github.com/mento-protocol/bold). Same contract architecture and mechanics as Liquity v2, with **USDm as collateral** and **FX-pegged Mento stables (e.g. GBPm) as the debt token**; Mento deploys **one independent instance per FX currency**, each with its own TroveManager, StabilityPool, and FX price feed. For a protocol-level overview (what you can do, collateral vs debt, Stability Pool, app/SDK usage), see **[CDPs](../../dive-deeper/cdp.md)** in Dive Deeper.

---

## Contract overview

The CDP system is implemented by the Liquity v2 contract suite. Mento’s fork lives in [mento-protocol/bold](https://github.com/mento-protocol/bold) (not in mento-core):

| Role | Purpose |
|------|--------|
| **BorrowerOperations** | Open, adjust, and close troves; add/withdraw collateral, borrow, repay. |
| **TroveManager** | Trove state, collateralization checks, liquidations, redemption order. |
| **Stability Pool** | Holds debt-token deposits; absorbs debt from liquidated troves in exchange for collateral; used by CDPLiquidityStrategy for expansion rebalancing. |
| **Collateral / Debt** | In Mento’s fork: collateral is **USDm**; debt is the FX-pegged stable (e.g. GBPm) for that instance. |
| **FXPriceFeed** | Mento-specific: fetches FX rates (e.g. GBP/USD) from Mento’s OracleAdapter; supports watchdog-triggered shutdown. |
| **SystemParams** | Minimum debt, liquidation penalties, CCR/MCR/BCR, redemption fee floor, gas compensation, etc. |

Liquidations, redemptions, gas compensation, and fee flows follow Liquity v2; Mento’s fork differs in **collateral (USDm)**, **debt (FX-pegged tokens)**, **oracles (FXPriceFeed)**, and **multi-instance deployment**.

**Critical risk considerations** (USDm depeg risk, FX exposure for borrowers and SP depositors, Stability Pool FX loss on liquidations, and double liquidation risk from both FX moves and USDm depeg) are summarized in **[CDPs (Dive Deeper)](../../dive-deeper/cdp.md#critical-risk-considerations)** and discussed in depth in the [mento-protocol/bold README](https://github.com/mento-protocol/bold).

---

## Where to find full contract documentation

Contract-level behavior, state variables, and all protocol rules are not re-documented here.

* **[Liquity v2 documentation](https://docs.liquity.org/)** — technical resources and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

**Mento fork:** The [**mento-protocol/bold** README](https://github.com/mento-protocol/bold) describes key differences (USDm collateral, FX-pegged stables, FXPriceFeed, multi-instance architecture) and Mento-specific risks and economics. For deployment addresses, parameter choices, and integration with [CDPLiquidityStrategy](liquidity-strategies.md), see [mento-core](https://github.com/mento-protocol/mento-core) and the [Deployments](deployments/README.md) section.
