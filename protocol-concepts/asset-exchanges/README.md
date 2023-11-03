---
description: The Mento components that orchestrate asset exchanges
---

# Asset exchanges

The Mento protocol provides a mechanism to exchange assets with the Mento Reserve. This mechanism serves two roles. The first role is in **service of the stability** of the protocol by providing arbitrageurs a way to trade stables assets with the reserve at a protocol-enforced rate with respect to the collateral, thus closing the arbitrage cycle with other markets (DEXs or CEXs) and enforcing the stable asset pegs. The second role is as a **distribution mechanism** for Mento stable assets by providing low slippage, and high bandwidth expansion capability against forms of collateral that support that.

Asset swaps in the Mento protocol happen with the aid of these components:

* The [**Broker**](broker.md) is responsible for orchestrating exchanges, managing the treasury, and enforcing trading limits.
* [**Exchange providers**](exchange-providers.md) are abstract components responsible for pricing asset swaps, that implement a unified interface. The **Broker** relies on them when orchestrating the trades.
* The [**BiPoolManager**](../../developers/smart-contracts/bipoolmanager.md) is the first **exchange provider** implemented. It is a generalization of the vAMM pools in Mento v1.0.0.
