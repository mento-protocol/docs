# CDPs (Collateralized Debt Positions)

On Mento V3, some stablecoins (e.g. **GBPm**) are **synthetic**: they are created when users **borrow** against collateral. Mento’s CDP system uses **USDm as the collateral asset**: you lock USDm and **borrow** other stables such as **GBPm**. This is a **stable-on-stable** setup rather than crypto collateral.

---

## What you can do

- **Borrow** — Deposit collateral (USDm) and borrow the stablecoin (e.g. GBPm). You open a **trove**, set your interest rate, and can run multiple troves per address.
- **Repay** — Return the borrowed stable to reduce or close your debt and free collateral.
- **Stability pool** — Deposit the debt token (e.g. GBPm) into a stability pool used in liquidations; you may earn rewards.

Troves can be **adjusted** (add/withdraw collateral, borrow more, repay) and **closed**. The system uses a **Stability Pool** and **liquidations** when troves become undercollateralized.

---

## How to do it

**Via the Mento app:** Use the **[Mento app](https://app.mento.org/)** for borrow, repay, and stability pool flows. Connect your wallet (e.g. on Celo), select the CDP product (e.g. GBPm), deposit USDm as collateral, and borrow the stable.

**Via the SDK:** For programmatic or integrator use, the **[Mento SDK](../build/mento-sdk/README.md)** provides `mento.borrow`: open/adjust/close troves, read trove data and system params, and predict upfront fees. See [Borrow (CDP)](../build/mento-sdk/guides/borrow.md). The SDK identifies each CDP system by the **debt token** (the stable you borrow, e.g. GBPm).

---

## Mento CDPs and Liquity v2

**Mento CDPs are a fork of [Liquity v2](https://www.liquity.org/).** The CDP contracts live in a **separate repository**: [mento-protocol/bold](https://github.com/mento-protocol/bold). The core mechanics (troves, user-set interest rates, liquidations, Stability Pool, redemptions) follow the Liquity v2 design. Liquity v2 uses ETH/LSTs as collateral and BOLD as the debt token; Mento’s fork uses **USDm as collateral** and **FX-pegged stables (e.g. GBPm) as the debt token**, with **one independent instance per FX currency** (each with its own TroveManager, StabilityPool, and FX price feed).

For full protocol and contract documentation (state variables, liquidation thresholds, fee flows, redemption mechanics), use the **Liquity v2** documentation:

* **[Liquity v2 documentation](https://docs.liquity.org/)** — protocol overview, technical resources, and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

For **Mento-specific** implementation (USDm collateral, FX oracles, multi-instance architecture, risks, and FXPriceFeed), see the **[mento-protocol/bold README](https://github.com/mento-protocol/bold)**. Deployment addresses and integration with Mento’s [Reserve](../build/smart-contracts/reserve.md) and [FPMM](../build/smart-contracts/fpmm.md) are documented in [mento-core](https://github.com/mento-protocol/mento-core) and the Build [Deployments](../build/deployments/README.md) section.

---

## Relation to FPMM liquidity

Mento uses **CDPLiquidityStrategy** to rebalance FPMM pools that hold the CDP-backed stable (e.g. GBPm). On **expansion**, the strategy draws debt from the Stability Pool; on **contraction**, it sources collateral (USDm) via redemptions. See [Rebalancing & strategies](../dive-deeper/fpmm/rebalancing-and-strategies.md) and [Liquidity strategies](../build/smart-contracts/liquidity-strategies.md) in Smart Contracts.

---

**See also:** [Getting Mento stables](getting-mento-stables/README.md) · [Overview](../README.md) · [CDP smart contracts](../build/smart-contracts/cdps.md) (Build) · [Troubleshooting (integrators)](../build/troubleshooting.md)
