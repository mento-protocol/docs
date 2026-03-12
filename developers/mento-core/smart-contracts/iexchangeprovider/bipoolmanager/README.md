# BiPoolManager

An exchange manager that manages asset exchanges consisting of two assets

## broker

```solidity
address broker
```

## exchanges

```solidity
mapping(bytes32 => struct IBiPoolManager.PoolExchange) exchanges
```

## exchangeIds

```solidity
bytes32[] exchangeIds
```

## reserve

```solidity
contract IReserve reserve
```

## breakerBox

```solidity
contract IBreakerBox breakerBox
```

## sortedOracles

```solidity
contract ISortedOracles sortedOracles
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
function initialize(address _broker, contract IReserve _reserve, contract ISortedOracles _sortedOracles, contract IBreakerBox _breakerBox) external
```

Allows the contract to be upgradable via the proxy.

### Parameters

| Name            | Type                    | Description                                 |
| --------------- | ----------------------- | ------------------------------------------- |
| \_broker        | address                 | The address of the broker contract.         |
| \_reserve       | contract IReserve       | The address of the reserve contract.        |
| \_sortedOracles | contract ISortedOracles | The address of the sorted oracles contract. |
| \_breakerBox    | contract IBreakerBox    | The address of the breaker box contract.    |

## onlyBroker

```solidity
modifier onlyBroker()
```

## getPoolExchange

```solidity
function getPoolExchange(bytes32 exchangeId) public view returns (struct IBiPoolManager.PoolExchange exchange)
```

Get a PoolExchange from storage.

### Parameters

| Name       | Type    | Description     |
| ---------- | ------- | --------------- |
| exchangeId | bytes32 | the exchange id |

## getExchangeIds

```solidity
function getExchangeIds() external view returns (bytes32[])
```

Get all exchange IDs.

### Return Values

| Name | Type       | Description                          |
| ---- | ---------- | ------------------------------------ |
| \[0] | bytes32\[] | exchangeIds List of the exchangeIds. |

## getExchanges

```solidity
function getExchanges() public view returns (struct IExchangeProvider.Exchange[] _exchanges)
```

Get all exchanges (used by interfaces)

_We don't expect the number of exchanges to grow to astronomical values so this is safe gas-wise as is._

## getAmountOut

```solidity
function getAmountOut(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256 amountOut)
```

Calculate amountOut of tokenOut received for a given amountIn of tokenIn

### Parameters

| Name       | Type    | Description                                    |
| ---------- | ------- | ---------------------------------------------- |
| exchangeId | bytes32 | The id of the exchange i.e PoolExchange to use |
| tokenIn    | address | The token to be sold                           |
| tokenOut   | address | The token to be bought                         |
| amountIn   | uint256 | The amount of tokenIn to be sold               |

### Return Values

| Name      | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| amountOut | uint256 | The amount of tokenOut to be bought |

## getAmountIn

```solidity
function getAmountIn(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountOut) external view returns (uint256 amountIn)
```

Calculate amountIn of tokenIn for a given amountOut of tokenOut

### Parameters

| Name       | Type    | Description                                    |
| ---------- | ------- | ---------------------------------------------- |
| exchangeId | bytes32 | The id of the exchange i.e PoolExchange to use |
| tokenIn    | address | The token to be sold                           |
| tokenOut   | address | The token to be bought                         |
| amountOut  | uint256 | The amount of tokenOut to be bought            |

### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold |

## setBroker

```solidity
function setBroker(address _broker) public
```

Sets the address of the broker contract.

### Parameters

| Name     | Type    | Description                             |
| -------- | ------- | --------------------------------------- |
| \_broker | address | The new address of the broker contract. |

## setReserve

```solidity
function setReserve(contract IReserve _reserve) public
```

Sets the address of the reserve contract.

### Parameters

| Name      | Type              | Description                              |
| --------- | ----------------- | ---------------------------------------- |
| \_reserve | contract IReserve | The new address of the reserve contract. |

## setBreakerBox

```solidity
function setBreakerBox(contract IBreakerBox _breakerBox) public
```

Sets the address of the BreakerBox.

### Parameters

| Name         | Type                 | Description                 |
| ------------ | -------------------- | --------------------------- |
| \_breakerBox | contract IBreakerBox | The new BreakerBox address. |

## setSortedOracles

```solidity
function setSortedOracles(contract ISortedOracles _sortedOracles) public
```

Sets the address of the sortedOracles contract.

### Parameters

| Name            | Type                    | Description                                     |
| --------------- | ----------------------- | ----------------------------------------------- |
| \_sortedOracles | contract ISortedOracles | The new address of the sorted oracles contract. |

## createExchange

```solidity
function createExchange(struct IBiPoolManager.PoolExchange _exchange) external returns (bytes32 exchangeId)
```

Creates a new exchange using the given parameters.

### Parameters

| Name       | Type                               | Description                 |
| ---------- | ---------------------------------- | --------------------------- |
| \_exchange | struct IBiPoolManager.PoolExchange | the PoolExchange to create. |

### Return Values

| Name       | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| exchangeId | bytes32 | The id of the newly created exchange. |

## destroyExchange

```solidity
function destroyExchange(bytes32 exchangeId, uint256 exchangeIdIndex) external returns (bool destroyed)
```

Destroys a exchange with the given parameters if it exists and frees up the collateral and stable allocation it was using.

### Parameters

| Name            | Type    | Description                                  |
| --------------- | ------- | -------------------------------------------- |
| exchangeId      | bytes32 | the id of the exchange to destroy            |
| exchangeIdIndex | uint256 | The index of the exchangeId in the ids array |

### Return Values

| Name      | Type | Description                                                                  |
| --------- | ---- | ---------------------------------------------------------------------------- |
| destroyed | bool | A boolean indicating whether or not the exchange was successfully destroyed. |

## swapIn

```solidity
function swapIn(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn) external returns (uint256 amountOut)
```

Execute a token swap with fixed amountIn

### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| exchangeId | bytes32 | The id of exchange, i.e. PoolExchange to use |
| tokenIn    | address | The token to be sold                         |
| tokenOut   | address | The token to be bought                       |
| amountIn   | uint256 | The amount of tokenIn to be sold             |

### Return Values

| Name      | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| amountOut | uint256 | The amount of tokenOut to be bought |

## swapOut

```solidity
function swapOut(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountOut) external returns (uint256 amountIn)
```

Execute a token swap with fixed amountOut

### Parameters

| Name       | Type    | Description                                  |
| ---------- | ------- | -------------------------------------------- |
| exchangeId | bytes32 | The id of exchange, i.e. PoolExchange to use |
| tokenIn    | address | The token to be sold                         |
| tokenOut   | address | The token to be bought                       |
| amountOut  | uint256 | The amount of tokenOut to be bought          |

### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold |

## executeSwap

```solidity
function executeSwap(bytes32 exchangeId, struct IBiPoolManager.PoolExchange exchange, address tokenIn, uint256 amountIn, uint256 amountOut, bool bucketsUpdated) internal
```

Execute a swap against the in memory exchange and write the new bucket sizes to storage.

### Parameters

| Name           | Type                               | Description                                |
| -------------- | ---------------------------------- | ------------------------------------------ |
| exchangeId     | bytes32                            | The id of the exchange                     |
| exchange       | struct IBiPoolManager.PoolExchange | The exchange to operate on                 |
| tokenIn        | address                            | The token to be sold                       |
| amountIn       | uint256                            | The amount of tokenIn to be sold           |
| amountOut      | uint256                            | The amount of tokenOut to be bought        |
| bucketsUpdated | bool                               | wether the buckets updated during the swap |

## \_getAmountOut

```solidity
function _getAmountOut(struct IBiPoolManager.PoolExchange exchange, address tokenIn, address tokenOut, uint256 amountIn) internal view returns (uint256 amountOut, bool bucketsUpdated)
```

Calculate amountOut of tokenOut received for a given amountIn of tokenIn

### Parameters

| Name     | Type                               | Description                      |
| -------- | ---------------------------------- | -------------------------------- |
| exchange | struct IBiPoolManager.PoolExchange | The exchange to operate on       |
| tokenIn  | address                            | The token to be sold             |
| tokenOut | address                            | The token to be bought           |
| amountIn | uint256                            | The amount of tokenIn to be sold |

### Return Values

| Name           | Type    | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| amountOut      | uint256 | The amount of tokenOut to be bought              |
| bucketsUpdated | bool    | Wether the buckets were updated during the quote |

## \_getAmountIn

```solidity
function _getAmountIn(struct IBiPoolManager.PoolExchange exchange, address tokenIn, address tokenOut, uint256 amountOut) internal view returns (uint256 amountIn, bool bucketsUpdated)
```

Calculate amountIn of tokenIn for a given amountOut of tokenOut

### Parameters

| Name      | Type                               | Description                         |
| --------- | ---------------------------------- | ----------------------------------- |
| exchange  | struct IBiPoolManager.PoolExchange | The exchange to operate on          |
| tokenIn   | address                            | The token to be sold                |
| tokenOut  | address                            | The token to be bought              |
| amountOut | uint256                            | The amount of tokenOut to be bought |

### Return Values

| Name           | Type    | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| amountIn       | uint256 | The amount of tokenIn to be sold                 |
| bucketsUpdated | bool    | Wether the buckets were updated during the quote |

## updateBucketsIfNecessary

```solidity
function updateBucketsIfNecessary(struct IBiPoolManager.PoolExchange exchange) internal view returns (struct IBiPoolManager.PoolExchange, bool updated)
```

If conditions are met, update the exchange bucket sizes.

_This doesn't checkpoint the exchange, just updates the in-memory one so it should be used in a context that then checkpoints the exchange._

### Parameters

| Name     | Type                               | Description                 |
| -------- | ---------------------------------- | --------------------------- |
| exchange | struct IBiPoolManager.PoolExchange | The exchange being updated. |

### Return Values

| Name    | Type                               | Description                         |
| ------- | ---------------------------------- | ----------------------------------- |
| \[0]    | struct IBiPoolManager.PoolExchange | exchangeAfter The updated exchange. |
| updated | bool                               |                                     |

## shouldUpdateBuckets

```solidity
function shouldUpdateBuckets(struct IBiPoolManager.PoolExchange exchange) internal view returns (bool)
```

Determine if a exchange's buckets should be updated based on staleness of buckets and oracle rates.

### Parameters

| Name     | Type                               | Description       |
| -------- | ---------------------------------- | ----------------- |
| exchange | struct IBiPoolManager.PoolExchange | The PoolExchange. |

### Return Values

| Name | Type | Description  |
| ---- | ---- | ------------ |
| \[0] | bool | shouldUpdate |

## getUpdatedBuckets

```solidity
function getUpdatedBuckets(struct IBiPoolManager.PoolExchange exchange) internal view returns (uint256 bucket0, uint256 bucket1)
```

Calculate the new bucket sizes for a exchange.

### Parameters

| Name     | Type                               | Description                  |
| -------- | ---------------------------------- | ---------------------------- |
| exchange | struct IBiPoolManager.PoolExchange | The PoolExchange in context. |

### Return Values

| Name    | Type    | Description          |
| ------- | ------- | -------------------- |
| bucket0 | uint256 | The size of bucket0. |
| bucket1 | uint256 | The size of bucket1. |

## getOracleExchangeRate

```solidity
function getOracleExchangeRate(address target) internal view returns (uint256, uint256)
```

Get the exchange rate as numerator,denominator from sorted oracles and protect in case of a 0-denominator.

### Parameters

| Name   | Type    | Description                                 |
| ------ | ------- | ------------------------------------------- |
| target | address | the reportTarget to read from SortedOracles |

### Return Values

| Name | Type    | Description     |
| ---- | ------- | --------------- |
| \[0] | uint256 | rateNumerator   |
| \[1] | uint256 | rateDenominator |
