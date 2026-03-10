# CDPs (Collateralized Debt Positions)

Mento’s **CDP** (Collateralized Debt Position) system lets users **borrow Mento stables** (e.g. USDm) by locking **collateral** (e.g. CELO, staked CELO) in **troves**. Each trove has a collateral balance, a debt balance, and a user-set interest rate. Troves can be opened, adjusted (add/withdraw collateral, borrow more, repay), and closed. The system uses a **Stability Pool** and liquidations when troves become undercollateralized.

**Mento CDPs are a fork of [Liquity v2](https://www.liquity.org/).** The core mechanics (troves, collateral types, interest rates, liquidations, Stability Pool) follow the Liquity v2 design.

---

## Where to find full documentation

Contract-level behavior, state variables, and protocol rules (e.g. minimum collateralization, liquidation thresholds, fee flows) are not re-documented here. For that, use the **Liquity v2** documentation:

* **[Liquity v2 documentation](https://docs.liquity.org/)** — protocol overview, technical resources, and contract behavior.
* **[Liquity v2 whitepaper](https://www.liquity.org/blog/liquity-v2-whitepaper)** — design and economics.

Mento’s fork may differ in deployment (e.g. which stables and collateral are supported, governance, and integration with Mento’s [Reserve](reserve.md) and [FPMM](fpmm.md) liquidity). The [mento-core](https://github.com/mento-protocol/mento-core) repository and deployment addresses are the source of truth for Mento-specific CDP contracts.

---

## Integration from apps

* **JavaScript/TypeScript:** Use the **[Mento SDK](../mento-sdk/README.md)** — `mento.borrow` for opening/adjusting/closing troves, reading trove data and system params, and predicting upfront fees. See [Borrow (CDP)](../mento-sdk/guides/borrow.md).
* **On-chain / Solidity:** Interact with the CDP contract suite (BorrowerOperations, TroveManager, etc.) as in Liquity v2; refer to Liquity v2 docs and mento-core for deployed addresses and any Mento-specific interfaces.

---

## Relation to FPMM liquidity

Mento uses **CDPLiquidityStrategy** to rebalance FPMM pools that hold CDP-backed stables. When a pool is rebalanceable, the strategy sources or sinks the stable via the CDP system. See [Liquidity strategies](liquidity-strategies.md).
