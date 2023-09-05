# Pricing Modules

Pricing Modules are utility contracts that implement the IPricingModule interface and are used by the BiPoolManager during swaps to price the swaps. A pricing module has to implement two functions:

```solidity
uint256 amountOut = pricingModule.getAmountOut(inBucket, outBucket, spread, amountIn);
uint256 amountIn = pricingModule.getAmountIn(inBucket, outBucket, spread, amountOut);
```

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/interfaces/IPricingModule.sol" %}
IPricingModule.sol
{% endembed %}

### ConstantSumPricingModule

$$
X * p + Y = K \newline
(X +x)*p + Y-y = K
$$

Where $$X$$is the bucket size of _TokenIn,_ $$Y$$is the bucket size of _TokenOut,_ $$x$$ is the _amountIn,_ $$y$$ is the amountOut, $$K$$is a constant, and $$p$$ is the value of _tokenIn_ quoted in _tokenOut_.



**ConstantSumPricingModule** is an IPricingModule that implements a constant-sum pricing formula for a two-asset pool.&#x20;

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/swap/ConstantSumPricingModule.sol" %}
ConstantSumPricingModule.sol
{% endembed %}

### ConstantProductPricingModule

$$
X*p*Y=K \newline
(X + x)*p*( Y - y) = K
$$

Where $$X$$is the bucket size of _TokenIn,_ $$Y$$is the bucket size of _TokenOut,_ $$x$$is the _amountIn,_ $$y$$ is the amountOut, $$K$$is a constant, and $$p$$ is the value of _tokenIn_ quoted in _tokenOut_.

**ConstantProductPricingModule** is an IPricingModule that implements a constant-product pricing formula for a two-asset pool.

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/swap/ConstantProductPricingModule.sol" %}
ConstantProductPricingModule.sol
{% endembed %}
