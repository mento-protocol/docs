# IBreaker

Defines the basic interface for a Breaker

## SortedOraclesUpdated

```solidity
event SortedOraclesUpdated(address newSortedOracles)
```

Emitted when the sortedOracles address is updated.

### Parameters

| Name             | Type    | Description                           |
| ---------------- | ------- | ------------------------------------- |
| newSortedOracles | address | The address of the new sortedOracles. |

## getCooldown

```solidity
function getCooldown(address rateFeedID) external view returns (uint256 cooldown)
```

Retrieve the cooldown time for the breaker.

_when cooldown is 0 auto reset will not be attempted._

### Parameters

| Name       | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| rateFeedID | address | The rate feed to get the cooldown for |

### Return Values

| Name     | Type    | Description                                                     |
| -------- | ------- | --------------------------------------------------------------- |
| cooldown | uint256 | The amount of time that must pass before the breaker can reset. |

## shouldTrigger

```solidity
function shouldTrigger(address rateFeedID) external returns (bool triggerBreaker)
```

Check if the criteria have been met, by a specified rateFeedID, to trigger the breaker.

### Parameters

| Name       | Type    | Description                                            |
| ---------- | ------- | ------------------------------------------------------ |
| rateFeedID | address | The address of the rate feed to run the check against. |

### Return Values

| Name           | Type | Description                                                                                  |
| -------------- | ---- | -------------------------------------------------------------------------------------------- |
| triggerBreaker | bool | A boolean indicating whether or not the breaker should be triggered for the given rate feed. |

## shouldReset

```solidity
function shouldReset(address rateFeedID) external returns (bool resetBreaker)
```

Check if the criteria to automatically reset the breaker have been met.

_Allows the definition of additional critera to check before reset. If no additional criteria is needed set to !shouldTrigger();_

### Parameters

| Name       | Type    | Description                                                      |
| ---------- | ------- | ---------------------------------------------------------------- |
| rateFeedID | address | The address of rate feed the criteria should be checked against. |

### Return Values

| Name         | Type | Description                                                                       |
| ------------ | ---- | --------------------------------------------------------------------------------- |
| resetBreaker | bool | A boolean indicating whether the breaker should be reset for the given rate feed. |
