# BreakerBox

The BreakerBox checks the criteria defined in separate breaker contracts to determine whether or not buying or selling should be allowed for a specified rateFeedIDs. The contract stores references to all breakers that hold criteria to be checked, rateFeedIDs that can make use of the BreakerBox & their current trading.

## rateFeedIDs

```solidity
address[] rateFeedIDs
```

## rateFeedTradingModes

```solidity
mapping(address => struct IBreakerBox.TradingModeInfo) rateFeedTradingModes
```

## tradingModeBreaker

```solidity
mapping(uint64 => address) tradingModeBreaker
```

## breakerTradingMode

```solidity
mapping(address => uint64) breakerTradingMode
```

## breakerEnabled

```solidity
mapping(address => mapping(address => bool)) breakerEnabled
```

## sortedOracles

```solidity
contract ISortedOracles sortedOracles
```

## onlyValidBreaker

```solidity
modifier onlyValidBreaker(address breaker, uint64 tradingMode)
```

## constructor

```solidity
constructor(bool test) public
```

Sets initialized == true on implementation contracts.

### Parameters

| Name | Type | Description                                        |
| ---- | ---- | -------------------------------------------------- |
| test | bool | Set to true to skip implementation initialization. |

## initialize

```solidity
function initialize(address[] _rateFeedIDs, contract ISortedOracles _sortedOracles) external
```

### Parameters

| Name            | Type                    | Description                                      |
| --------------- | ----------------------- | ------------------------------------------------ |
| \_rateFeedIDs   | address\[]              | rateFeedIDs to be added.                         |
| \_sortedOracles | contract ISortedOracles | The address of the Celo sorted oracles contract. |

## setSortedOracles

```solidity
function setSortedOracles(contract ISortedOracles _sortedOracles) public
```

Sets the address of the sortedOracles contract.

### Parameters

| Name            | Type                    | Description                                     |
| --------------- | ----------------------- | ----------------------------------------------- |
| \_sortedOracles | contract ISortedOracles | The new address of the sorted oracles contract. |

## addBreaker

```solidity
function addBreaker(address breaker, uint64 tradingMode) public
```

Adds a breaker to the end of the list of breakers & the tradingMode-Breaker mapping.

### Parameters

| Name        | Type    | Description                                  |
| ----------- | ------- | -------------------------------------------- |
| breaker     | address | The address of the breaker to be added.      |
| tradingMode | uint64  | The trading mode of the breaker to be added. |

## insertBreaker

```solidity
function insertBreaker(address breaker, uint64 tradingMode, address prevBreaker, address nextBreaker) external
```

Adds a breaker to the list of breakers at a specified position.

### Parameters

| Name        | Type    | Description                                                         |
| ----------- | ------- | ------------------------------------------------------------------- |
| breaker     | address | The address of the breaker to be added.                             |
| tradingMode | uint64  | The trading mode of the breaker to be added.                        |
| prevBreaker | address | The address of the breaker that should come before the new breaker. |
| nextBreaker | address | The address of the breaker that should come after the new breaker.  |

## removeBreaker

```solidity
function removeBreaker(address breaker) external
```

Removes the specified breaker from the list of breakers.

_Will set any rateFeedID using this breakers trading mode to the default trading mode because if its tripped and if we remove it rateFeed will be stuck in the trading mode._

### Parameters

| Name    | Type    | Description                               |
| ------- | ------- | ----------------------------------------- |
| breaker | address | The address of the breaker to be removed. |

## toggleBreaker

```solidity
function toggleBreaker(address breakerAddress, address rateFeedId, bool isEnabled) public
```

Enables or disables a breaker for the specified rate feed.

_If the breaker is being disabled and the rateFeed is using the same trading mode as the breaker, the rateFeed will be set to the default trading mode._

### Parameters

| Name           | Type    | Description                                                                                  |
| -------------- | ------- | -------------------------------------------------------------------------------------------- |
| breakerAddress | address | The address of the breaker.                                                                  |
| rateFeedId     | address | The id of the rate feed.                                                                     |
| isEnabled      | bool    | Boolean indicating whether the breaker should be enabled or disabled for the given rateFeed. |

## addRateFeed

```solidity
function addRateFeed(address rateFeedID) public
```

Adds a rateFeedID to the mapping of monitored rateFeedIDs.

### Parameters

| Name       | Type    | Description                                |
| ---------- | ------- | ------------------------------------------ |
| rateFeedID | address | The address of the rateFeedID to be added. |

## addRateFeeds

```solidity
function addRateFeeds(address[] newRateFeedIDs) public
```

Adds the specified rateFeedIDs to the mapping of monitored rateFeedIDs.

### Parameters

| Name           | Type       | Description                                    |
| -------------- | ---------- | ---------------------------------------------- |
| newRateFeedIDs | address\[] | The array of rateFeedID addresses to be added. |

## removeRateFeed

```solidity
function removeRateFeed(address rateFeedID) external
```

Removes a rateFeedID from the mapping of monitored rateFeedIDs.

### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| rateFeedID | address | The address of the rateFeedID to be removed. |

## setRateFeedTradingMode

```solidity
function setRateFeedTradingMode(address rateFeedID, uint64 tradingMode) public
```

Sets the trading mode for the specified rateFeedID.

### Parameters

| Name        | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| rateFeedID  | address | The address of the rateFeedID.       |
| tradingMode | uint64  | The trading mode that should be set. |

## getBreakers

```solidity
function getBreakers() external view returns (address[])
```

Returns an array of breaker addresses from start to end.

### Return Values

| Name | Type       | Description                  |
| ---- | ---------- | ---------------------------- |
| \[0] | address\[] | An ordered list of breakers. |

## isBreaker

```solidity
function isBreaker(address breaker) public view returns (bool)
```

Checks whether a breaker with the specifed address has been added.

## getrateFeeds

```solidity
function getrateFeeds() external view returns (address[])
```

Returns addresses of rateFeedIDs that have been added.

## getRateFeedTradingMode

```solidity
function getRateFeedTradingMode(address rateFeedID) external view returns (uint256 tradingMode)
```

Returns the trading mode for the specified rateFeedID.

### Parameters

| Name       | Type    | Description                                                     |
| ---------- | ------- | --------------------------------------------------------------- |
| rateFeedID | address | The address of the rateFeedID to retrieve the trading mode for. |

## isBreakerEnabled

```solidity
function isBreakerEnabled(address breaker, address rateFeedID) external view returns (bool)
```

Checks if a breaker is enabled for a specific rate feed.

### Parameters

| Name       | Type    | Description                                    |
| ---------- | ------- | ---------------------------------------------- |
| breaker    | address | The address of the breaker we're checking for. |
| rateFeedID | address | The address of the rateFeedID.                 |

## checkAndSetBreakers

```solidity
function checkAndSetBreakers(address rateFeedID) external
```

Checks breakers for the rateFeedID with the specified id and sets correct trading mode if any breakers are tripped or need to be reset.

### Parameters

| Name       | Type    | Description                                         |
| ---------- | ------- | --------------------------------------------------- |
| rateFeedID | address | The registryId of the rateFeedID to run checks for. |
