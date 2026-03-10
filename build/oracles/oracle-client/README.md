# Oracle Client

Mento Oracle Clients are off-chain programs that query and calculate exchange rates from centralized cryptocurrency exchanges and report them to the on-chain [SortedOracle](https://github.com/mento-protocol/mento-core/blob/develop/contracts/SortedOracles.sol) smart contract. The reported exchange rate is calculated as the volume-weighted average mid-price of configured exchange rates that are not excluded by safety conditions.&#x20;

As of March 2023, there are ten off-chain oracle clients per exchange rate, of which Mento Labs manages eight. Ongoing decentralization efforts exist[ to add partners, community members, and validators](https://forum.celo.org/t/decentralized-oracles/3610). Two of the ten oracle clients are operated by community members. One by Celo and Mento community member Di Wu (RAinUsTa#0502 on Discord), and one by T-Systems MMS, a subsidiary of Deutsche Telekom.&#x20;

{% embed url="https://github.com/celo-org/celo-oracle" %}

<figure><img src="../../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

## Configuration

Each Oracle client application is configured for one exchange rate and requires a set of configuration parameters. They determine which exchange rates to query, data aggregation, and safeguards.&#x20;

The full set of client parameters is explained in more detail here:

{% embed url="https://github.com/celo-org/celo-oracle/blob/main/README-config.md" %}

And the deployment config for exchange rate and safe guard parameters can be found in this directory for different exchange rates:&#x20;

{% embed url="https://github.com/celo-org/celo-monorepo/tree/master/packages/helm-charts/oracle" %}

## Safeguards

#### **Off-chain Client Circuit Breaker**

If extreme market volatility is detected, the “circuit breaker” will shut down the Oracle. The current implementation assumes that all participating Oracles are operating with a circuit breaker and using the same configuration. The coordinated shutdown of all Oracles prevents the on-chain exchange rate from being updated. Until the circuit breakers are reset, the on-chain exchange rate adjusts dynamically. One-sided trading with the reserve will push the exchange rate towards the current market price, while limiting the effect on the reserve of having a rate that is "wrong".

#### **Minimum Number of Exchanges**

The concept here: the more exchanges contributing data, the more accurate the final price. The minimum number of exchanges is a configurable threshold. If the number of exchanges with usable data is below this threshold, the Oracle application does not try to calculate the current price and will not report.

#### **Maximum Bid-Ask Spread**

Ticker data contains the current _bid_ and _ask_ on that exchange. The bid refers to the price at which a buyer is willing to buy a specified asset, and the ask refers to the price at which a seller is willing to sell. There is generally a gap, or a "spread", between these, and the actual price is somewhere in between. If the spread is small, the Oracle can be relatively certain of the price. If it is large, it may be less certain.

Using this safeguard, the Oracle ignores tickers with a spread that is deemed too large.

#### **Maximum Volume Share per Exchange**

The current price calculation is volume-weighted. This means that the price on an exchange with high trading volume has a larger effect on the price calculation than an exchange with lower trading volume.

This configurable threshold allows setting a cap on how much weight any one exchange can have in the calculation.

#### **Maximum Deviation of Prices**

If the prices from different sources (i.e. exchanges) deviate too much, it suggests there is too much uncertainty in the current market conditions. When a set threshold is exceeded, the Oracle will avoid reporting a new value until the sources are in closer agreement.
