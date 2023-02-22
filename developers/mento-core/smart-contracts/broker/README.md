# Broker

The broker executes swaps and keeps track of spending limits per pair.

## exchangeProviders

```solidity
address[] exchangeProviders
```

## isExchangeProvider

```solidity
mapping(address => bool) isExchangeProvider
```

## tradingLimitsState

```solidity
mapping(bytes32 => struct TradingLimits.State) tradingLimitsState
```

## tradingLimitsConfig

```solidity
mapping(bytes32 => struct TradingLimits.Config) tradingLimitsConfig
```

## reserve

```solidity
contract IReserve reserve
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
function initialize(address[] _exchangeProviders, address _reserve) external
```

Allows the contract to be upgradable via the proxy.

### Parameters

| Name                | Type       | Description                                      |
| ------------------- | ---------- | ------------------------------------------------ |
| \_exchangeProviders | address\[] | The addresses of the ExchangeProvider contracts. |
| \_reserve           | address    | The address of the Reserve contract.             |

## addExchangeProvider

```solidity
function addExchangeProvider(address exchangeProvider) public returns (uint256 index)
```

Add an exchange provider to the list of providers.

### Parameters

| Name             | Type    | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| exchangeProvider | address | The address of the exchange provider to add. |

### Return Values

| Name  | Type    | Description                                               |
| ----- | ------- | --------------------------------------------------------- |
| index | uint256 | The index of the newly added specified exchange provider. |

## removeExchangeProvider

```solidity
function removeExchangeProvider(address exchangeProvider, uint256 index) public
```

Remove an exchange provider from the list of providers.

### Parameters

| Name             | Type    | Description                                       |
| ---------------- | ------- | ------------------------------------------------- |
| exchangeProvider | address | The address of the exchange provider to remove.   |
| index            | uint256 | The index of the exchange provider being removed. |

## setReserve

```solidity
function setReserve(address _reserve) public
```

Set the Mento reserve address.

### Parameters

| Name      | Type    | Description                |
| --------- | ------- | -------------------------- |
| \_reserve | address | The Mento reserve address. |

## getAmountIn

```solidity
function getAmountIn(address exchangeProvider, bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountOut) external view returns (uint256 amountIn)
```

Calculate the amount of tokenIn to be sold for a given amountOut of tokenOut

### Parameters

| Name             | Type    | Description                                      |
| ---------------- | ------- | ------------------------------------------------ |
| exchangeProvider | address | the address of the exchange manager for the pair |
| exchangeId       | bytes32 | The id of the exchange to use                    |
| tokenIn          | address | The token to be sold                             |
| tokenOut         | address | The token to be bought                           |
| amountOut        | uint256 | The amount of tokenOut to be bought              |

### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold |

## getAmountOut

```solidity
function getAmountOut(address exchangeProvider, bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256 amountOut)
```

Calculate the amount of tokenOut to be bought for a given amount of tokenIn to be sold

### Parameters

| Name             | Type    | Description                                      |
| ---------------- | ------- | ------------------------------------------------ |
| exchangeProvider | address | the address of the exchange manager for the pair |
| exchangeId       | bytes32 | The id of the exchange to use                    |
| tokenIn          | address | The token to be sold                             |
| tokenOut         | address | The token to be bought                           |
| amountIn         | uint256 | The amount of tokenIn to be sold                 |

### Return Values

| Name      | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| amountOut | uint256 | The amount of tokenOut to be bought |

## swapIn

```solidity
function swapIn(address exchangeProvider, bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin) external returns (uint256 amountOut)
```

Execute a token swap with fixed amountIn.

### Parameters

| Name             | Type    | Description                                           |
| ---------------- | ------- | ----------------------------------------------------- |
| exchangeProvider | address | the address of the exchange provider for the pair.    |
| exchangeId       | bytes32 | The id of the exchange to use.                        |
| tokenIn          | address | The token to be sold.                                 |
| tokenOut         | address | The token to be bought.                               |
| amountIn         | uint256 | The amount of tokenIn to be sold.                     |
| amountOutMin     | uint256 | Minimum amountOut to be received - controls slippage. |

### Return Values

| Name      | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| amountOut | uint256 | The amount of tokenOut to be bought. |

## swapOut

```solidity
function swapOut(address exchangeProvider, bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountOut, uint256 amountInMax) external returns (uint256 amountIn)
```

Execute a token swap with fixed amountOut.

### Parameters

| Name             | Type    | Description                                        |
| ---------------- | ------- | -------------------------------------------------- |
| exchangeProvider | address | the address of the exchange provider for the pair. |
| exchangeId       | bytes32 | The id of the exchange to use.                     |
| tokenIn          | address | The token to be sold.                              |
| tokenOut         | address | The token to be bought.                            |
| amountOut        | uint256 | The amount of tokenOut to be bought.               |
| amountInMax      | uint256 | Maximum amount of tokenIn that can be traded.      |

### Return Values

| Name     | Type    | Description                       |
| -------- | ------- | --------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold. |

## burnStableTokens

```solidity
function burnStableTokens(address token, uint256 amount) public returns (bool)
```

Permissionless way to burn stables from msg.sender directly.

### Parameters

| Name   | Type    | Description                             |
| ------ | ------- | --------------------------------------- |
| token  | address | The token getting burned.               |
| amount | uint256 | The amount of the token getting burned. |

### Return Values

| Name | Type | Description                   |
| ---- | ---- | ----------------------------- |
| \[0] | bool | True if transaction succeeds. |

## configureTradingLimit

```solidity
function configureTradingLimit(bytes32 exchangeId, address token, struct TradingLimits.Config config) public
```

Configure trading limits for an (exchangeId, token) touple.

_Will revert if the configuration is not valid according to the TradingLimits library. Resets existing state according to the TradingLimits library logic. Can only be called by owner._

### Parameters

| Name       | Type                        | Description                    |
| ---------- | --------------------------- | ------------------------------ |
| exchangeId | bytes32                     | the exchangeId to target.      |
| token      | address                     | the token to target.           |
| config     | struct TradingLimits.Config | the new trading limits config. |

## transferOut

```solidity
function transferOut(address payable to, address token, uint256 amount) internal
```

Transfer a specified Mento asset to the given address. If the specified asset is a stable asset it will be minted directly to the address. If the asset is a collateral asset it will be transferred from the reserve to the given address.

### Parameters

| Name   | Type            | Description                              |
| ------ | --------------- | ---------------------------------------- |
| to     | address payable | The address receiving the asset.         |
| token  | address         | The asset to transfer.                   |
| amount | uint256         | The amount of `token` to be transferred. |

## transferIn

```solidity
function transferIn(address payable from, address token, uint256 amount) internal
```

Transfer a specified Mento asset into the reserve or the broker. If the specified asset is a stable asset it will be transfered to the broker and burned. If the asset is a collateral asset it will be transferred to the reserve.

### Parameters

| Name   | Type            | Description                              |
| ------ | --------------- | ---------------------------------------- |
| from   | address payable | The address to transfer the asset from.  |
| token  | address         | The asset to transfer.                   |
| amount | uint256         | The amount of `token` to be transferred. |

## guardTradingLimits

```solidity
function guardTradingLimits(bytes32 exchangeId, address _tokenIn, uint256 amountIn, address _tokenOut, uint256 amountOut) internal
```

Verify trading limits for a trade in both directions.

_Reverts if the trading limits are met for outflow or inflow._

### Parameters

| Name       | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| exchangeId | bytes32 | the ID of the exchange being used.    |
| \_tokenIn  | address | the address of the token flowing in.  |
| amountIn   | uint256 | the amount of token flowing in.       |
| \_tokenOut | address | the address of the token flowing out. |
| amountOut  | uint256 | the amount of token flowing out.      |

## guardTradingLimit

```solidity
function guardTradingLimit(bytes32 tradingLimitId, int256 deltaFlow, address token) internal
```

Updates and verifies a trading limit if it's configured.

_Will revert if the trading limit is exceeded by this trade._

### Parameters

| Name           | Type    | Description                                                             |
| -------------- | ------- | ----------------------------------------------------------------------- |
| tradingLimitId | bytes32 | the ID of the trading limit associated with the token                   |
| deltaFlow      | int256  | the deltaflow of this token, negative for outflow, positive for inflow. |
| token          | address | the address of the token, used to lookup decimals.                      |

## getExchangeProviders

```solidity
function getExchangeProviders() external view returns (address[])
```

Get the list of registered exchange providers.

_This can be used by UI or clients to discover all pairs._

### Return Values

| Name | Type       | Description                                                |
| ---- | ---------- | ---------------------------------------------------------- |
| \[0] | address\[] | exchangeProviders the addresses of all exchange providers. |
