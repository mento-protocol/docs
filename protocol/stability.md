# Stability

### Introduction

Mento allows people to create crypto assets pegged to fiat currencies or a basket of goods. The Mento stability protocol can be thought of as a hybrid crypto-collateralization / seigniorage-style model in which the reserve is used to adjust the supply of Mento stable assets in response to changes in demand.

The protocol relies on a number of [Broken link](broken-reference "mention") external to the blockchain to provide feeds of the Mento stable assets in their respective fiat denomination. To maintain the peg, the protocol allows users to create new Mento stable assets by sending 1 fiat unit worth of a reserve asset to the reserve, or to destroy Mento stable assets by redeeming 1 fiat unit worth of a reserve asset from the reserve.&#x20;

### Issuance and Redemption Mechanism

In economic terms, Mento stable assets follow a elastic coin supply rule, that sets incentives to stabilize the value of the coin by adjusting the supply of the coin to match the demand. The reserve of crypto-assets bears the risk of a decrease in stablecoin demand (and receives a reward in the case of an increase in stablecoin demand). In essence, the protocol shifts volatility risk from the stable asset holders to the reserve of crypto-assets.

Currently this expansion and contraction is possible with the reserve assets CELO and USDCet, which is bridged USDC from the Portal Token Bridge from Wormhole.

Let us dive into an example with the Mento Dollar: When demand for the Mento Dollar rises and the market price is above the $1 peg, arbitrageurs can profit by purchasing $1 worth of CELO or USDCet, exchanging it with the protocol for one Mento Dollar, and selling that Mento Dollar for the market price, pocketing the difference. Similarly, when demand for the Mento Dollar falls and the market price is below the peg, arbitrageurs can profit by purchasing a Mento Dollar for the market price, exchanging it with the protocol for $1 worth of CELO or USDCet, and selling the reserve asset to the market. These actions drive the market price of the Mento Dollar back towards $1.

### Stability Analysis

Before the launch of at the time Celo, now Mento stable assets, a stability analysis investigated the stability characteristics of Mento stable value assets through a series of simulations under various market conditions. In this analysis, we used simulation techniques to understand the behavior of the protocol and its potential vulnerabilities over a wide range of possible developments — including severe shocks, attacks, extremely positive and extremely negative market movements. We model a wide range of possibilities, rather than relying on historical data, because the space is too new to rely on historical prices for modeling purposes.&#x20;

{% embed url="https://celo.org/papers/stability" %}
Stability Analysis&#x20;
{% endembed %}



