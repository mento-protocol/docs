---
description: The Pool exchange structure
---

# PoolExchange

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

| Field            | Type           | Description                                                                                                                                                                                           |
| ---------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| asset0           | address        | ERC20 token address of the 1st asset in the pair. This can only be a StableToken registered with the Reserve.                                                                                         |
| asset1           | address        | ERC20 token address of the 2nd asset in the pair. This can be either a StableToken or any Mento Collateral asset registered with the Reserve.                                                         |
| pricingModule    | IPricingModule | The vAMM pricing function, a contract that implements IPricingModule, like [ConstantProductPricingModule](constantproductpricingmodule.md) or [ConstantSumPricingModule](constantsumpricingmodule.md) |
| bucket0          | uint256        | The amount of asset0 tokens in the pool, updates as a result of swaps and bucket resets.                                                                                                              |
| bucket1          | uint256        | The amount of asset1 tokens in the pool, updates as a result of swaps and bucket resets.                                                                                                              |
| lastBucketUpdate | uint256        | Timestamp of the last bucket reset.                                                                                                                                                                   |
| config           | PoolConfig     | Some extra configuration items are stored in a separate struct because of Solidity version limitations.                                                                                               |

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

| Field                       | Type                 | Description                                                                   |
| --------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| spread                      | FixidityLib.Fraction | The spread or fee charged on swaps                                            |
| referenceRateFeedID         | address              | The oracle rateFeedID used as a reference rate for the `asset0/asset1` pair.  |
| referenceRateResetFrequency | uint256              | How often the buckets reset to the reference rate.                            |
| minimumReports              | uint256              | The amount of on-chain reports required in order to trust the reference rate. |
| stablePoolResetSize         | uint256              | The value that bucket0 resets to when a bucket update happens.                |
