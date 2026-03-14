# CDPs (Smart Contracts)

Mento’s CDP system is a **fork of [Liquity v2](https://www.liquity.org/)** maintained in a **separate repository**: [**mento-protocol/bold**](https://github.com/mento-protocol/bold). Same contract architecture and mechanics as Liquity v2, with **USDm as collateral** and **FX-pegged Mento stables** as the debt token; Mento deploys **one independent instance per FX currency**, each with its own TroveManager, StabilityPool, and FX price feed. In practice, **all Mento CDP deployments are FX CDPs**: borrow `XXXm`, post `USDm`, and price the branch from an FX feed via `FXPriceFeed -> OracleAdapter`. For a protocol-level overview (what you can do, collateral vs debt, Stability Pool, app/SDK usage), see **[CDPs](../../dive-deeper/cdp.md)** in Dive Deeper.

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

## FX Market Hours

Because Mento CDPs use `FXPriceFeed`, and `FXPriceFeed.fetchPrice()` calls `OracleAdapter.getFXRateIfValid(rateFeedID)`, **all Mento CDP branches inherit FX market-hours gating**. When the FX market is closed, price-dependent CDP operations revert instead of using a stale weekend price.

Under the current `MarketHoursBreaker`, FX is treated as closed:

- from **Friday 21:00 UTC** until **Sunday 23:00 UTC**
- on **Dec 25** and **Jan 1**
- after **22:00 UTC** on **Dec 24** and **Dec 31**

### Blocked While FX Markets Are Closed

These operations depend on `priceFeed.fetchPrice()` and therefore are **not available** during weekend / holiday FX closures:

- **Open trove**
- **Adjust trove**: add collateral, withdraw collateral, borrow more, repay, combined adjustments
- **Close trove**
- **Zombie trove adjustment / reactivation**
- **Standard liquidations**
- **Standard redemptions**
- **Some interest-rate / batch-manager operations** when they require a price-dependent upfront-fee or TCR check

### Still Available

These user-facing Stability Pool operations do **not** call `fetchPrice()` and therefore are **still available** during FX closures:

- **Deposit to Stability Pool**
- **Withdraw from Stability Pool**
- **Claim accumulated Stability Pool collateral gains**

The indirect effect is that the Stability Pool usually will **not** receive new liquidation-driven offsets while the FX market is closed, because standard liquidations are themselves blocked.

### Shutdown Exception

If a CDP branch has already entered **shutdown**, `FXPriceFeed` returns `lastValidPrice` instead of calling the live oracle path. In that emergency mode, the branch follows shutdown-specific logic such as **urgent redemption**, rather than the normal market-hours-gated flow.

**Critical risk considerations** (USDm depeg risk, FX exposure for borrowers and SP depositors, Stability Pool FX loss on liquidations, and double liquidation risk from both FX moves and USDm depeg) are summarized in **[CDPs (Dive Deeper)](../../dive-deeper/cdp.md#critical-risk-considerations)** and discussed in depth in the [mento-protocol/bold README](https://github.com/mento-protocol/bold).

---

## Where to find full contract documentation

Contract-level behavior, state variables, and all protocol rules are not re-documented here.

* **[Liquity v2 documentation](https://docs.liquity.org/)** — technical resources and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

**Mento fork:** The [**mento-protocol/bold** README](https://github.com/mento-protocol/bold) describes key differences (USDm collateral, FX-pegged stables, FXPriceFeed, multi-instance architecture) and Mento-specific risks and economics. For deployment addresses, parameter choices, and integration with [CDPLiquidityStrategy](liquidity-strategies.md), see [mento-core](https://github.com/mento-protocol/mento-core) and the [Deployments](../deployments/README.md) section.
