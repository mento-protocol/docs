# Broker

{% hint style="info" %}
This section describes the solidity internals of the Broker and is intended for smart contract developers. Consumers of the protocol will normally use the [SDK](../mento-sdk/) to interact with the protocol. If you want to learn more about the overall design check the [Asset Exchanges](../../protocol-concepts/asset-exchanges/) section.
{% endhint %}

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/swap/Broker.sol" %}
Broker.sol
{% endembed %}

The **Broker** is the entry point for interacting with the protocol. It is responsible for managing reserve assets and is the only contract with spender rights of the reserve as well as minting and burning rights over stable assets. For pricing trades, it relies on exchange providers like BiPoolManager. When executing swaps, it enforces trading limits. The Broker also exposes a burn function for burning stable tokens without being subject to trading limits or regular exchange operations.

### Discovering Exchanges

```solidity
address[] memory exchangeProviders = broker.getExchangeProviders();
IExchangeProvider exchangeProvider = IExchangeProvider(exchangeProviders[0]);
IExchangeProvider.Exchange[] memory exchanges = exchangeProvider.getExchanges();
bytes32 exchangeId = exchanges[0].exchangeId;
address asset0 = exchanges[0].assets[0];
address asset1 = exchanges[0].assets[1];
```

The `getExchangeProviders` function on the broker is used to list all registered exchange providers. We then cast the first one as an **IExchangeProvider** interface and make use of its `getExchanges` to discover the configured exchanges. We then use that to find the id of a desired exchange. This is a contrived example as the discoverability part is best done off-chain via [the SDK](../mento-sdk/).&#x20;

### Estimating Swaps

```solidity
uint256 amountOut = broker.getAmountOut(
    exchangeProvider,
    exchangeId,
    assetIn,
    assetOut,
    amountIn
)
```

This function calculates the expected output tokens you will receive for a given amount of input tokens. To call the function you need to pass the following:

* The **exchangeProvider** address which is used for pricing the trade
* The **exchangeId** (bytes32) that the exchange provider would know about
* The **assetIn** address of the ERC20 token you want to give to the protocol
* The **assetOut** address of the ERC20 token you want to get from the protocol
* The **amountIn** (uint256) of **assetIn** that you want to pay

There is also `getAmountIn` which calculates the required input tokens needed to receive a given amount of output tokens.

### Executing Swaps

```solidity
uint256 amountOut = broker.swapIn(
    exchangeProvider,
    exchangeId,
    assetIn,
    assetOut,
    amountIn,
    minAmountOut
);    
```

This function executes a swap and returns the number of output tokens that the initiator received. In order to execute the function, the initiator must give prior approval to the `broker` to transfer `amountIn` tokens of `assetIn` from the initiator.

The function takes in almost the same arguments as the one for [estimating swaps ](broker.md#estimating-swaps)with the addition of `minAmountOut` that is used for slippage control by causing the function to revert if the final `amountOut` doesn't meet the requirement.

There is also a `swapOut` function that swaps a variable amount of input tokens for a given amount of output tokens. The slippage parameter becomes `maxAmountIn`, limiting how many tokens the broker can spend for a fixed output.
