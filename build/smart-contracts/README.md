# Smart Contracts

**Who this is for:** Integrators and auditors who need the contract layout and behavior of Mento V3 (FPMM pools, oracles, limits, strategies). The Mento protocol consists of a set of smart contracts deployed on supported chains (e.g. [Celo](https://celo.org/)).

> **For app and frontend developers:** This section describes the Solidity internals and is intended for smart contract developers. To quote swaps, discover pools, and execute trades from JavaScript/TypeScript, the **[Mento SDK](../mento-sdk/README.md)** is usually the easiest path. Each contract page below includes **code snippets** showing how to call the contracts directly from Solidity when you are building on-chain integrations or tooling.

**See also:** [Integration](../integration/README.md) — integration paths; [Mento SDK](../mento-sdk/README.md) — JS/TS library; [Deployments](../deployments/README.md) — addresses and verification.

## Mento V3: FPMM-based exchange

In V3, the main exchange is built from **FPMM** (Fixed-Price Market Maker) pools. The following pages give precise contract-level documentation:

| Contract / topic | Doc | Role |
|------------------|-----|------|
| **FPMM** | [FPMM](fpmm.md) | Pool: two-token reserves, swap at oracle rate (minus fee), value protection, mint/burn, rebalance by allowlisted strategies, TradingLimitsV2. |
| **FPMMFactory** | [FPMMFactory](fpmmfactory.md) | Deploys FPMM proxies, token order, default params and caps, pool registry. |
| **OracleAdapter** | [OracleAdapter](oracleadapter.md) | Supplies the pool with a valid rate: `getFXRateIfValid(rateFeedID)`; combines SortedOracles, BreakerBox (trading mode), and FX market hours. |
| **Router** | [Router](router.md) | Quoting (`getAmountsOut`) and executing swaps; multihop via pool `getAmountOut`; uses FactoryRegistry and default factory. |
| **Liquidity strategies** | [Liquidity strategies](liquidity-strategies.md) | Base + ReserveLiquidityStrategy + CDPLiquidityStrategy; who may call rebalance, callback flow, incentive split. |
| **TradingLimitsV2** | [TradingLimitsV2](tradinglimits.md) | Per-token 5-min and 1-day net-flow caps; applied after each swap. |
| **BreakerBox** | [BreakerBox](breakerbox.md) | Circuit breakers; OracleAdapter reads trading mode; FPMM reverts when rate invalid. |
| **Reserve** | [Reserve](reserve.md) | Holds collateral for Reserve-backed stables; used by ReserveLiquidityStrategy. |
| **StableToken** | [StableToken](stabletoken.md) | ERC-20 Mento stables (USDm, EURm, GBPm, …). |
| **CDPs** | [CDPs](cdps.md) | Collateralized debt positions (troves): borrow stables against collateral. Mento CDPs are a **fork of Liquity v2** — see [Liquity v2 docs](https://docs.liquity.org/) for full contract and protocol documentation. |
| **Audits** | [Audits](audits.md) | ChainSecurity V3 and Liquity v2 fork; historical audits. |

**Contracts:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core)
