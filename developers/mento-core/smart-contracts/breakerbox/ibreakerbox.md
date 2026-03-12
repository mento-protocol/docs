# IBreakerBox

Defines the basic interface for the Breaker Box

## TradingModeInfo

```solidity
struct TradingModeInfo {
  uint64 tradingMode;
  uint64 lastUpdatedTime;
  uint128 lastUpdatedBlock;
}
```

## BreakerAdded

```solidity
event BreakerAdded(address breaker)
```

Emitted when a new breaker is added to the breaker box.

### Parameters

| Name    | Type    | Description                     |
| ------- | ------- | ------------------------------- |
| breaker | address | The address of the new breaker. |

## BreakerRemoved

```solidity
event BreakerRemoved(address breaker)
```

Emitted when a breaker is removed from the breaker box.

### Parameters

| Name    | Type    | Description                                  |
| ------- | ------- | -------------------------------------------- |
| breaker | address | The address of the breaker that was removed. |

## BreakerTripped

```solidity
event BreakerTripped(address breaker, address rateFeedID)
```

Emitted when a breaker is tripped by a rate feed.

### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| breaker    | address | The address of the breaker that was tripped. |
| rateFeedID | address | The address of the rate feed.                |

## RateFeedAdded

```solidity
event RateFeedAdded(address rateFeedID)
```

Emitted when a new rate feed is added to the breaker box.

### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| rateFeedID | address | The address of the rate feed that was added. |

## RateFeedRemoved

```solidity
event RateFeedRemoved(address rateFeedID)
```

Emitted when a rate feed is removed from the breaker box.

### Parameters

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| rateFeedID | address | The rate feed that was removed. |

## TradingModeUpdated

```solidity
event TradingModeUpdated(address rateFeedID, uint256 tradingMode)
```

Emitted when the trading mode for a rate feed is updated

### Parameters

| Name        | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| rateFeedID  | address | The address of the rataFeedID.         |
| tradingMode | uint256 | The new trading mode of the rate feed. |

## ResetSuccessful

```solidity
event ResetSuccessful(address rateFeedID, address breaker)
```

Emitted after a reset attempt is successful.

### Parameters

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| rateFeedID | address | The address of the rate feed. |
| breaker    | address | The address of the breaker.   |

## ResetAttemptCriteriaFail

```solidity
event ResetAttemptCriteriaFail(address rateFeedID, address breaker)
```

Emitted after a reset attempt fails when the rate feed fails the breakers reset criteria.

### Parameters

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| rateFeedID | address | The address of the rate feed. |
| breaker    | address | The address of the breaker.   |

## ResetAttemptNotCool

```solidity
event ResetAttemptNotCool(address rateFeedID, address breaker)
```

Emitted after a reset attempt fails when cooldown time has not elapsed.

### Parameters

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| rateFeedID | address | The address of the rate feed. |
| breaker    | address | The address of the breaker.   |

## SortedOraclesUpdated

```solidity
event SortedOraclesUpdated(address newSortedOracles)
```

Emitted when the sortedOracles address is updated.

### Parameters

| Name             | Type    | Description                           |
| ---------------- | ------- | ------------------------------------- |
| newSortedOracles | address | The address of the new sortedOracles. |

## BreakerStatusUpdated

```solidity
event BreakerStatusUpdated(address breaker, address rateFeedID, bool status)
```

Emitted when the breaker is enabled or disabled for a rate feed.

### Parameters

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| breaker    | address | The address of the breaker.   |
| rateFeedID | address | The address of the rate feed. |
| status     | bool    | Indicating the status.        |

## getBreakers

```solidity
function getBreakers() external view returns (address[])
```

Retrives an ordered array of all breaker addresses.

## isBreaker

```solidity
function isBreaker(address breaker) external view returns (bool)
```

Checks if a breaker with the specified address has been added to the breaker box.

### Parameters

| Name    | Type    | Description                          |
| ------- | ------- | ------------------------------------ |
| breaker | address | The address of the breaker to check; |

### Return Values

| Name | Type | Description                                                  |
| ---- | ---- | ------------------------------------------------------------ |
| \[0] | bool | A bool indicating whether or not the breaker has been added. |

## checkAndSetBreakers

```solidity
function checkAndSetBreakers(address rateFeedID) external
```

Checks breakers for the rateFeedID and sets correct trading mode if any breakers are tripped or need to be reset.

### Parameters

| Name       | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| rateFeedID | address | The registryId of the rateFeedID to run checks for. |

## getRateFeedTradingMode

```solidity
function getRateFeedTradingMode(address rateFeedID) external view returns (uint256 tradingMode)
```

Gets the trading mode for the specified rateFeedID.

### Parameters

| Name       | Type    | Description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| rateFeedID | address | The address of the rateFeedID to retrieve the trading mode for. |
