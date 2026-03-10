# CDPs (Collateralized Debt Positions)

Mento’s **CDP** (Collateralized Debt Position) system lets users **borrow one Mento stable** (e.g. **GBPm**) by locking **another stable as collateral** (in practice **USDm**). You open a **trove**: you deposit collateral (USDm), choose how much to borrow (e.g. GBPm), and set your interest rate. Troves can be adjusted (add/withdraw collateral, borrow more, repay) and closed. The system uses a **Stability Pool** and liquidations when troves become undercollateralized.

**Collateral vs debt in Mento:** Mento CDPs use **USDm as the collateral asset**. Users **borrow** other stables such as **GBPm** (and in other deployments, e.g. EURm). So you lock USDm and receive GBPm (or the configured debt token for that CDP instance). This is a **stable-on-stable** setup rather than crypto collateral.

**Mento CDPs are a fork of [Liquity v2](https://www.liquity.org/).** The core mechanics (troves, interest rates, liquidations, Stability Pool, redemptions) follow the Liquity v2 design. Liquity v2 uses ETH/LSTs as collateral and BOLD as the debt token; Mento’s fork swaps in **USDm as collateral** and **a Mento stable (e.g. GBPm) as the debt token** per deployment.

---

## Where to find full documentation

Contract-level behavior, state variables, and protocol rules (e.g. minimum collateralization, liquidation thresholds, fee flows, redemption mechanics) are not re-documented here. For that, use the **Liquity v2** documentation:

* **[Liquity v2 documentation](https://docs.liquity.org/)** — protocol overview, technical resources, and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

Mento’s fork differs in **what counts as collateral and debt**: USDm (and possibly other stables) as collateral, and stables like GBPm as the borrowed token. Deployment-specific parameters (which stable is debt, system params, governance) and integration with Mento’s [Reserve](reserve.md) and [FPMM](fpmm.md) are in the [mento-core](https://github.com/mento-protocol/mento-core) repository and deployment config.

---

## Integration from apps

* **JavaScript/TypeScript:** Use the **[Mento SDK](../mento-sdk/README.md)** — `mento.borrow` for opening/adjusting/closing troves, reading trove data and system params, and predicting upfront fees. See [Borrow (CDP)](../mento-sdk/guides/borrow.md). The SDK takes the **debt token** (the stable you borrow, e.g. GBPm) to identify the CDP system.
* **On-chain / Solidity:** Interact with the CDP contract suite (BorrowerOperations, TroveManager, etc.) as in Liquity v2; refer to Liquity v2 docs and mento-core for deployed addresses and Mento-specific collateral/debt configuration.

---

## Relation to FPMM liquidity

Mento uses **CDPLiquidityStrategy** to rebalance FPMM pools that hold the CDP-backed stable (e.g. GBPm). On **expansion**, the strategy draws debt from the Stability Pool; on **contraction**, it sources collateral (USDm) via redemptions. See [Liquidity strategies](liquidity-strategies.md).
