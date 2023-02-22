# ConstantSumPricingModule

The ConstantSumPricingModule calculates the amount in and the amount out for a constant sum AMM.

## getAmountOut

```solidity
function getAmountOut(uint256, uint256 tokenOutBucketSize, uint256 spread, uint256 amountIn) external view returns (uint256 amountOut)
```

Calculates the amount of tokens that should be received based on the given parameters

_amountOut = (1 - spread) \* amountIn_

### Parameters

| Name               | Type    | Description                                   |
| ------------------ | ------- | --------------------------------------------- |
|                    | uint256 |                                               |
| tokenOutBucketSize | uint256 | The bucket size of the token swapt out.       |
| spread             | uint256 | The spread that is applied to a swap.         |
| amountIn           | uint256 | The amount of tokens in wei that is swapt in. |

### Return Values

| Name      | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| amountOut | uint256 | The amount of tokens in wei that should be received. |

## getAmountIn

```solidity
function getAmountIn(uint256, uint256 tokenOutBucketSize, uint256 spread, uint256 amountOut) external view returns (uint256 amountIn)
```

Calculates the amount of tokens that should be provided in order to receive the desired amount out.

_amountIn = amountOut / (1 - spread)_

### Parameters

| Name               | Type    | Description                                           |
| ------------------ | ------- | ----------------------------------------------------- |
|                    | uint256 |                                                       |
| tokenOutBucketSize | uint256 | The bucket size of the token swapt out.               |
| spread             | uint256 | The spread that is applied to a swap.                 |
| amountOut          | uint256 | The amount of tokens in wei that should be swapt out. |

### Return Values

| Name     | Type    | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| amountIn | uint256 | The amount of tokens in wei that should be provided. |

## name

```solidity
function name() external view returns (string)
```

Returns the AMM that the IPricingModule implements

### Return Values

| Name | Type   | Description   |
| ---- | ------ | ------------- |
| \[0] | string | Constant Sum. |
