# BiPoolManager

{% hint style="info" %}
This section describes the solidity internals of the BiPoolManager and is intended for smart contract developers. Consumers of the protocol will normally use the [SDK](../mento-sdk/) to interact with the protocol. If you want to learn more about the overall design check the [Asset Exchanges ](../../protocol-concepts/asset-exchanges/)section.
{% endhint %}

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/swap/BiPoolManager.sol" %}
BiPoolManager.sol
{% endembed %}

**BiPoolManager** is the first implementation of an [IExchangeProvider](https://github.com/mento-protocol/mento-core/blob/main/contracts/interfaces/IExchangeProvider.sol) which manages virtual asset pools that consist of two assets. It is responsible for managing pools and using their state to price swaps. It also checks if trading is allowed or suspended as decided by the on-chain circuit breaker via the [BreakerBox](breakerbox.md) contract.

### Pool Structures

The `PoolExchange` and `PoolConfig` structures are the underlying data structures used by the BiPoolManager to implement a vAMM bi-pool (i.e. a pool with two assets).&#x20;

{% embed url="https://github.com/mento-protocol/mento-core/blob/develop/contracts/interfaces/IBiPoolManager.sol#L19-L41" %}
Structure definition
{% endembed %}

### PoolExchange

```solidity
struct PoolExchange {
  address asset0;
  address asset1;
  IPricingModule pricingModule;
  uint256 bucket0;
  uint256 bucket1;
  uint256 lastBucketUpdate;
  PoolConfig config;
}
```

<table><thead><tr><th width="193.33333333333331">Field</th><th width="150">Type</th><th>Description</th></tr></thead><tbody><tr><td>asset0</td><td>address</td><td>ERC20 token address of the 1st asset in the pair. This can only be a StableToken registered with the Reserve.</td></tr><tr><td>asset1</td><td>address</td><td>ERC20 token address of the 2nd asset in the pair. This can be either a StableToken or any Mento Collateral asset registered with the Reserve.</td></tr><tr><td>pricingModule</td><td>IPricingModule</td><td>The vAMM pricing function, a contract that implements <a href="pricing-modules.md">IPricingModule</a>, like <a href="pricing-modules.md#constantproductpricingmodule">ConstantProductPricingModule</a> or <a href="pricing-modules.md#constantsumpricingmodule">ConstantSumPricingModule</a></td></tr><tr><td>bucket0</td><td>uint256</td><td>The amount of asset0 tokens in the pool, updates as a result of swaps and bucket resets.</td></tr><tr><td>bucket1</td><td>uint256</td><td>The amount of asset1 tokens in the pool, updates as a result of swaps and bucket resets.</td></tr><tr><td>lastBucketUpdate</td><td>uint256</td><td>Timestamp of the last bucket reset.</td></tr><tr><td>config</td><td>PoolConfig</td><td>Some extra configuration items are stored in a separate struct because of Solidity version limitations.</td></tr></tbody></table>

### PoolConfig

```solidity
struct PoolConfig {
  FixidityLib.Fraction spread;
  address referenceRateFeedID; // rateFeedID of the price that this pool follows (i.e. it's reference rate)
  uint256 referenceRateResetFrequency;
  uint256 minimumReports;
  uint256 stablePoolResetSize;
}
```

<table><thead><tr><th width="281.3333333333333">Field</th><th width="183">Type</th><th>Description</th></tr></thead><tbody><tr><td>spread</td><td>FixidityLib.Fraction</td><td>The spread or fee charged on swaps</td></tr><tr><td>referenceRateFeedID</td><td>address</td><td>The oracle rateFeedID used as a reference rate for the <code>asset0/asset1</code> pair.</td></tr><tr><td>referenceRateResetFrequency</td><td>uint256</td><td>How often the buckets reset to the reference rate.</td></tr><tr><td>minimumReports</td><td>uint256</td><td>The amount of on-chain reports required in order to trust the reference rate.</td></tr><tr><td>stablePoolResetSize</td><td>uint256</td><td>The value that bucket0 resets to when a bucket update happens.</td></tr></tbody></table>

### Discovering Exchanges

```solidity
IExchangeProvider.Exchange[] memory exchanges = biPoolManager.getExchanges();
bytes32 exchangeId = exchanges[0].exchangeId;
address asset0 = exchanges[0].assets[0];
address asset1 = exchanges[0].assets[1];
```

This returns the generic exchange structures that are shared between all implementers of the **IExchangeProvider** interface, this is why the `assets` is an array, to account for potential 3-asset pools in the future.

You can then also query the internal representation:

```solidity
IBiPoolManager.PoolExchange pool = biPoolManager.getPoolExchange(exchangeId);
```

### Estimating Swaps

```solidity
uint256 amountOut = biPoolManager.getAmountOut(
    exchangeId,
    assetIn,
    assetOut,
    amountIn
)
```

This function calculates the expected output tokens you will receive for a given amount of input tokens. It is what the Broker uses internally in its own [estimating swaps function](broker.md#estimating-swaps).

There is also `getAmountIn` which calculates the required input tokens needed to receive a given amount of output tokens.

### Executing Swaps

```solidity
uint256 amountOut = biPoolManager.swapIn(
    exchangeId,
    assetIn,
    assetOut,
    amountIn
);    
```

This function executes, in that it prices the swap and, specifically when interacting with PoolExchanges utilizing the ConstantProduct pricing module, updates the virtual bucket sizes. However, it’s important to note that for PoolExchanges configured with the ConstantSum pricing module, bucket sizes remain unchanged during swaps. The Broker uses the return value to determine how many output tokens to transfer to the initiator for the input tokens received. Similarly, there's a swapOut function that fixes the output tokens and returns a variable amount of input tokens required.

{% hint style="info" %}
Both the `swapIn` and `swapOut` functions on the BiPoolManager only deal with virtual token amounts. The Broker is responsible for making sure that the initiator has actually given the protocol the tokens required or that the Reserve has enough tokens to pay the initator.
{% endhint %}
