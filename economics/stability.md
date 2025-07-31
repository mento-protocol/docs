# Stability

{% hint style="info" %}
This is a continuation of the introduction to the Mento exchange mechanism in the Protocol Concepts section: [stability.md](../protocol-concepts/stability.md "mention")
{% endhint %}

### Introduction

In theory, a stablecoin will keep its peg as long as demand and supply meet at the target price. A stablecoin with an excess of supply will lead to it being devalued; a stablecoin with a deficit of supply will lead to exceeding the value of its peg.&#x20;

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

An exploration of the economics behind  Mento stable assets, previously called Celo stable assets, can be found in the following article:

{% embed url="https://blog.celo.org/zooming-in-on-the-celo-expansion-contraction-mechanism-446ca7abe4f" %}

### Mechanism&#x20;

Mento stable assets follow an elastic coin supply rule. The Mento Exchange Mechanism sets incentives to allow everyone to stabilize the value of the asset by adjusting supply to match demand. The mechanism balances two conflicting goals:

1. Liquidity: Allowing users to react to large and abrupt changes in demand by allowing large and abrupt changes in supply.
2. Protecting the reserve from oracle price manipulation.

### Typical Economic Oracle Exploit Scenario

The typical economic exploit scenario for Mento would look like the following:

1. Malicious actor manipulates centralized exchange prices for CELO by driving the price up, which results in manipulated oracle reports
2. Malicious actor exchanges Mento stable assets for CELO very cheaply
3. Malicious actor exchanges Mento stable assets for other assets or fiat currencies, making a profit at the expense of the Mento reserve and other Mento stable asset holders.

This exploit scenario could either be launched with the intention to make a profit or to just damage the protocol. To mitigate this risk by making this sort of attack unprofitable, the protocol limits the rate of possible expansion and contraction. The rate of expansion and contraction of Mento stable asset supply is limited in a way that manipulating prices on centralized exchanges would be more expensive than what you could get out of the Mento reserve over time. The downside that comes with it is that this limits the possible speed of expansion and contraction, in a worst-case leading to an imbalance of supply and demand and thus a de-peg.&#x20;

### Mitigating Oracle Risk

Mento uses a virtual automated market maker (vAMM) setup for pricing exchanges between Mento stable and collateral assets. There is no user-provided liquidity like on decentralized exchanges (DEXs), instead, the vAMM is only used for pricing, while exchanges happen directly against the reserve. In a vAMM pool, there are two 'buckets' of assets, one for the stable, and one for the collateral asset. The bucket sizes are now chosen in a way that typical economic exploit scenarios like oracle attacks or price manipulation on centralized exchanges would not be profitable. Technically, this is implemented by bucket sizes that reset at a specified frequency, usually every five minutes.

### Slippage

Below you can find a summary table of different slippage levels for Mento cUSD/CELO and cUSD/USDC pools configured with deployment parameters ([parameters.md](../build-on-mento/deployments/parameters.md "mention")). These values are for a 5min bucket reset period, which can also be understood as the speed of contraction per 5 minutes.&#x20;

<table><thead><tr><th width="155">Exchange</th><th>0.02% slippage</th><th>2% slippage</th><th>25% slippage</th></tr></thead><tbody><tr><td>cUSD/Celo</td><td>-</td><td>~165_600 cUSD</td><td>~2_440_800 cUSD</td></tr><tr><td>cUSD/USDC</td><td>11_988_000 cUSD</td><td>-</td><td>-</td></tr></tbody></table>

In the following paragraphs, you can find more detailed information about what levels of slippage will be incurred in Mento pools. We will present some figures related to slippage and possible contraction amounts over time, which can also be interpreted as speed of contraction.&#x20;

Let us look at the cUSD/CELO constant product pool configured to

```notebook-python
spread = 0.0025 # 0.25%
reset_frequency = 5 # 5 minutes
celo_usd_price = 0.6
stable_asset_bucket_size = 7_200_000
```

which is what the pool has initially been deployed with, as in [parameters.md](../build-on-mento/deployments/parameters.md "mention"). The spread is determined by the constant product formula, implemented as&#x20;

$$
amountOut = \frac{tokenOutBucketSize * amountIn * (1-spread) } {tokenInBucketSize + amountIn * (1-spread)}
$$

contractingWhat you can see in the plot below is the slippage a trade would experience on the y-axis for a given cUSD trade size on the x-axis. A \~165\_600 cUSD exchange to CELO would experience 2% slippage, while a \~2\_440\_800 cUSD exchange would experience 25% slippage for one 5min bucket reset period. When thinking about speed of contraction, at 2% slippage the Mento cUSD/CELO pool allows contracting at a speed of \~165\_600 cUSD/5min, and at 25% slippage at a speed of \~2\_440\_800 cUSD/5min.

<figure><img src="../.gitbook/assets/Screenshot 2023-03-16 at 10.48.54.png" alt=""><figcaption><p>cUSD/Celo slippage per 5 minute bucket update</p></figcaption></figure>

The next plot shows how much cUSD can be exchanged or contracted with CELO at 2% slippage including spread over time.

<figure><img src="../.gitbook/assets/Screenshot 2023-03-16 at 10.48.11.png" alt=""><figcaption><p>cUSD/Celo amount of cUSD contraction at 2% slippage over time</p></figcaption></figure>

Let us look at the cUSD/axlUSDC constant sum pool configured to

```notebook-python
spread = 0.0002 # 0.25%
reset_frequency = 5 # 5 minutes
celo_usd_price = 1
stable_asset_bucket_size = 12_000_000
```

which is what the pool has initially been deployed with, as in [parameters.md](../build-on-mento/deployments/parameters.md "mention"). The slippage is determined by the constant sum formula, implemented as&#x20;

$$
amountOut = amountIn * (1 - spread)
$$

What you can see in the plot below is the slippage a trade would experience on the y-axis for a given cUSD trade size on the x-axis. Since this is a constant sum pool, the whole bucket size of 12\_000\_000 cUSD can be traded at zero slippage, only paying the spread of 0.02%. When thinking about speed of contraction, at 0.02% slippage the Mento cUSD/axlUSDC pool allows contracting at a speed of \~12\_000\_000 cUSD/5min.

<figure><img src="../.gitbook/assets/Screenshot 2023-03-16 at 10.48.21.png" alt=""><figcaption><p>cUSD/USDC slippage per 5 minute bucket update</p></figcaption></figure>

The next plot shows how much cUSD can be exchanged or contracted with USDC at 0.02% slippage including spread over time.

<figure><img src="../.gitbook/assets/Screenshot 2023-03-16 at 10.48.29 (1).png" alt=""><figcaption><p>amount of cUSD contraction at 2% slippage over time</p></figcaption></figure>

### Economics Parameters

Here you can find a list of parameters that determine the slippage and speed of contraction over time:

* Reference rate reset parameter (vAMM bucket updates) in time frequency: [https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L87](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L87)
* Stable pool bucket reset size in the number of tokens: [https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L89](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L89)
* Pool spread, which contributes to slippage/fees paid: [https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L86](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L86)
* Trading limits
  * 5min:[ ](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L133C9-L133C9)[https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L133C9-L133C9](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L133C9-L133C9)
  * 1 day: [https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L136](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L136)
  * global: [https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L139](https://github.com/mento-protocol/mento-deployment/blob/53b5102119dba566e3f820f9211815a47f1f9a3f/script/upgrades/MU01/Config.sol#L139)

The current on-chain parameters can be found with the [addresses.md](../build-on-mento/deployments/addresses.md "mention")and respective block explorers. The deployed parameters can be found in the [parameters.md](../build-on-mento/deployments/parameters.md "mention") section.
