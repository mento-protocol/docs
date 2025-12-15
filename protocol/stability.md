# Stability

### Introduction

Mento allows partners to create crypto assets pegged to fiat currencies, basket of goods or other reference prices. The Mento stability protocol can be thought of as a mechanism for over-collateralized, decentralized & transparent stable assets in which a crypto reserve is used to adjust the supply of Mento stable assets in response to changes in demand.

The protocol relies on a number of oracle rates external to the blockchain to maintain the peg. It allows users to mint new Mento stable assets by sending one reference unit worth of a reserve asset to the reserve, or to burn Mento stable assets by redeeming  one stable asset for one reference unit worth of a reserve asset from the reserve.

### Issuance and Redemption Mechanism

In economic terms, Mento stable assets follow an elastic coin supply rule that sets incentives to stabilize the value of the coin by adjusting the supply of the coin to match the demand. The over-collateralized, decentralized & transparent reserve of crypto-assets bears the risk of a decrease in stablecoin demand. In essence, the protocol shifts volatility risk from the stable asset holders to the reserve of crypto-assets.

Currently this expansion and contraction is possible with the reserve assets CELO and USDCet, which isUSDC bridged via the Portal Token Bridge of Wormhole.

Let us dive into an example with the Mento Dollar: When demand for the Mento Dollar rises and the market price is above the $1 peg, arbitrageurs can profit by purchasing $1 worth of CELO or USDCet, exchanging it with the protocol for one Mento Dollar, and selling that Mento Dollar for the market price, pocketing the difference. Similarly, when demand for the Mento Dollar falls and the market price is below the peg, arbitrageurs can profit by purchasing a Mento Dollar for the market price, exchanging it with the protocol for $1 worth of CELO or USDCet, and selling the reserve asset to the market. These actions drive the market price of the Mento Dollar back towards $1.



### Stability Analysis

A stability analysis was conducted that investigates the stability characteristics of Mento stable value assets through a series of simulations under various market conditions. In this analysis, simulation techniques are used to understand the behavior of the protocol and its potential vulnerabilities over a wide range of possible developments — including severe shocks, attacks, extremely positive and extremely negative market movements. A wide range of possibilities was modeled, rather than relying on historical data, because the space is too new to rely on historical prices for modeling purposes.

{% embed url="https://celo.org/papers/stability" %}
Stability Analysis&#x20;
{% endembed %}



