# MedianDeltaBreaker

Breaker contract that will trigger when an updated oracle median rate changes more than a configured relative threshold from the previous one. If this breaker is triggered for a rate feed it should be set to no trading mode.

## sortedOracles

```solidity
contract ISortedOracles sortedOracles
```

## previousMedianRates

```solidity
mapping(address => uint256) previousMedianRates
```

## constructor

```solidity
constructor(uint256 _defaultCooldownTime, uint256 _defaultRateChangeThreshold, contract ISortedOracles _sortedOracles, address[] rateFeedIDs, uint256[] rateChangeThresholds, uint256[] cooldownTimes) public
```

## setCooldownTime

```solidity
function setCooldownTime(address[] rateFeedIDs, uint256[] cooldownTimes) external
```

Sets the cooldown time to the specified value for a rate feed.

_Should be set to 0 to force a manual reset._

### Parameters

| Name          | Type       | Description                 |
| ------------- | ---------- | --------------------------- |
| rateFeedIDs   | address\[] | the targeted rate feed.     |
| cooldownTimes | uint256\[] | The new cooldownTime value. |

## setDefaultCooldownTime

```solidity
function setDefaultCooldownTime(uint256 cooldownTime) external
```

Sets the cooldownTime to the specified value for a rate feed.

_Should be set to 0 to force a manual reset._

### Parameters

| Name         | Type    | Description                 |
| ------------ | ------- | --------------------------- |
| cooldownTime | uint256 | The new cooldownTime value. |

## setDefaultRateChangeThreshold

```solidity
function setDefaultRateChangeThreshold(uint256 _defaultRateChangeThreshold) external
```

Sets rateChangeThreshold.

### Parameters

| Name                         | Type    | Description                        |
| ---------------------------- | ------- | ---------------------------------- |
| \_defaultRateChangeThreshold | uint256 | The new rateChangeThreshold value. |

## setRateChangeThresholds

```solidity
function setRateChangeThresholds(address[] rateFeedIDs, uint256[] rateChangeThresholds) external
```

Configures rate feed to rate threshold pairs.

### Parameters

| Name                 | Type       | Description                             |
| -------------------- | ---------- | --------------------------------------- |
| rateFeedIDs          | address\[] | Collection of the addresses rate feeds. |
| rateChangeThresholds | uint256\[] | Collection of the rate thresholds.      |

## setSortedOracles

```solidity
function setSortedOracles(contract ISortedOracles _sortedOracles) public
```

Sets the address of the sortedOracles contract.

### Parameters

| Name            | Type                    | Description                                     |
| --------------- | ----------------------- | ----------------------------------------------- |
| \_sortedOracles | contract ISortedOracles | The new address of the sorted oracles contract. |

## shouldTrigger

```solidity
function shouldTrigger(address rateFeedID) public returns (bool triggerBreaker)
```

Check if the current median report rate for a rate feed change, relative to the last median report, is greater than the configured threshold. If the change is greater than the threshold the breaker will trip.

### Parameters

| Name       | Type    | Description                  |
| ---------- | ------- | ---------------------------- |
| rateFeedID | address | The rate feed to be checked. |

### Return Values

| Name           | Type | Description                                                                        |
| -------------- | ---- | ---------------------------------------------------------------------------------- |
| triggerBreaker | bool | A bool indicating whether or not this breaker should be tripped for the rate feed. |

## shouldReset

```solidity
function shouldReset(address rateFeedID) external returns (bool resetBreaker)
```

Checks whether or not the conditions have been met for the specified rate feed to be reset.

### Return Values

| Name         | Type | Description                                                                         |
| ------------ | ---- | ----------------------------------------------------------------------------------- |
| resetBreaker | bool | A bool indicating whether or not this breaker can be reset for the given rate feed. |
