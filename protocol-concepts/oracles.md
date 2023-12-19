# Oracles

## What are Mento Oracles?

On blockchains, oracles bring off-chain information on-chain, making that information accessible in smart contracts. In the Mento Protocol, exchange rates from centralized cryptocurrency exchanges are used to enable the creation and exchange of stable value assets.

Oracles usually consist of an off-chain client and one or multiple on-chain smart contracts. The Mento Protocol includes a [SortedOracles](https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/SortedOracles.sol) smart contract which receives and stores a collection of exchange rate reports between Mento collateral assets and other currencies and makes these available to other smart contracts. The smart contract receives these exchange rates from off-chain client programs, which in turn query them from centralized cryptocurrency exchanges.

## How does the protocol use oracles?

Oracles on Celo for Mento are an essential part of the stability mechanism. The protocol uses the reported rates to allow the exchange of Mento collateral with stable assets at correct market prices. For this, the oracles report one exchange rate, internally also referenced as rate feed, for each exchange pair.&#x20;



<figure><img src="../.gitbook/assets/Screenshot 2023-12-12 at 14.03.17.png" alt=""><figcaption><p>How the protocol uses oracles</p></figcaption></figure>
