# IExchangeProvider

The IExchangeProvider interface is the interface that the Broker uses to communicate with different exchange manager implementations like the BiPoolManager

## Exchange

```solidity
struct Exchange {
  bytes32 exchangeId;
  address[] assets;
}
```

## getExchanges

```solidity
function getExchanges() external view returns (struct IExchangeProvider.Exchange[] exchanges)
```

Get all exchanges supported by the ExchangeProvider.

### Return Values

| Name      | Type                                 | Description                   |
| --------- | ------------------------------------ | ----------------------------- |
| exchanges | struct IExchangeProvider.Exchange\[] | An array of Exchange structs. |

## swapIn

```solidity
function swapIn(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn) external returns (uint256 amountOut)
```

Execute a token swap with fixed amountIn

### Parameters

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| exchangeId | bytes32 | The id of the exchange to use    |
| tokenIn    | address | The token to be sold             |
| tokenOut   | address | The token to be bought           |
| amountIn   | uint256 | The amount of tokenIn to be sold |

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

| Name       | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| exchangeId | bytes32 | The id of the exchange to use       |
| tokenIn    | address | The token to be sold                |
| tokenOut   | address | The token to be bought              |
| amountOut  | uint256 | The amount of tokenOut to be bought |

### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold |

## getAmountOut

```solidity
function getAmountOut(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256 amountOut)
```

Calculate amountOut of tokenOut received for a given amountIn of tokenIn

### Parameters

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| exchangeId | bytes32 | The id of the exchange to use    |
| tokenIn    | address | The token to be sold             |
| tokenOut   | address | The token to be bought           |
| amountIn   | uint256 | The amount of tokenIn to be sold |

### Return Values

| Name      | Type    | Description                         |
| --------- | ------- | ----------------------------------- |
| amountOut | uint256 | The amount of tokenOut to be bought |

## getAmountIn

```solidity
function getAmountIn(bytes32 exchangeId, address tokenIn, address tokenOut, uint256 amountOut) external view returns (uint256 amountIn)
```

Calculate amountIn of tokenIn needed for a given amountOut of tokenOut

### Parameters

| Name       | Type    | Description                         |
| ---------- | ------- | ----------------------------------- |
| exchangeId | bytes32 | The id of the exchange to use       |
| tokenIn    | address | The token to be sold                |
| tokenOut   | address | The token to be bought              |
| amountOut  | uint256 | The amount of tokenOut to be bought |

### Return Values

| Name     | Type    | Description                      |
| -------- | ------- | -------------------------------- |
| amountIn | uint256 | The amount of tokenIn to be sold |
