# Stability

### Introduction

Mento allows everyone to create and exchange crypto assets pegged to fiat currencies, baskets of goods, or other reference prices. The Mento stability protocol can be thought of as a mechanism for over-collateralized, decentralized and transparent stable assets in which a crypto reserve is used to allow users to adjust the supply of Mento stable assets in response to changes in demand.

The protocol allows users to exchange Mento stable assets with [reserve collateral assets](https://reserve.mento.org). Users can expand the supply of a stable asset by sending one reference unit worth of a [reserve collateral asset](https://reserve.mento.org/) to the reserve and receiving one stable asset in exchange. Users can also contract the supply of a stable asset by sending one stable asset to the reserve in exchange for one reference unit worth of a [reserve collateral asset](https://reserve.mento.org/).

<figure><img src="../.gitbook/assets/image (7) (1).png" alt=""><figcaption><p>A visualization of the exchange mechanism. The Mento reserve was previously called the Celo reserve. </p></figcaption></figure>

### Exchange Mechanism

In economic terms, Mento stable assets follow an elastic coin supply rule. The Mento Exchange Mechanism sets incentives to allow everyone to stabilize the value of the asset by adjusting supply to match demand. The over-collateralized, decentralized and transparent reserve of crypto-assets bears the risk of a decrease in stablecoin demand. In essence, the protocol shifts volatility risk from the stable asset holders to the reserve of crypto-assets.

Let us dive into an example with the Celo Dollar: When demand for the Mento Dollar rises and the market price is above the $1 peg, arbitrageurs can profit by purchasing $1 worth of CELO or bridged USDC, exchanging it with the protocol for one Mento Dollar, and selling that Mento Dollar for the market price, pocketing the difference. Similarly, when demand for the Mento Dollar falls and the market price is below the peg, arbitrageurs can profit by purchasing a Mento Dollar for the market price, exchanging it with the protocol for $1 worth of CELO or bridged USDC, and selling the reserve asset to the market. These actions drive the market price of the Mento Dollar back towards $1.

A good YouTube introduction video on the Mento stability mechanism, previously, called the Celo stability mechanism, [can be found here](https://www.youtube.com/watch?v=kYhDUmKuGCY).

A good introductory blog post on the Mento stability mechanism can be found here:

{% embed url="https://blog.celo.org/diving-into-the-celo-price-stability-protocol-d7afd210609e" %}

An advanced dive into the economics of the Mento stability mechanism can be found here:&#x20;

{% embed url="https://blog.celo.org/zooming-in-on-the-celo-expansion-contraction-mechanism-446ca7abe4f" %}

And for a more quantitative exploration of the capabilities and risks of the Mento Stability setup you can visit the Economics section on [stability.md](../economics/stability.md "mention").
