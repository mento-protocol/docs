# Integrate the Broker

This guide walks through integrating with Mento's Broker contract to execute swaps between stable assets and their collateral. The Broker serves as the main entry point for all Mento exchanges, handling trading limits, mint/burn operations, and routing to appropriate exchange providers.

## Common Use Cases

### DEX Aggregators

Route trades through Mento for optimal stable asset pricing, accessing deep on-chain liquidity with minimal slippage.

### Trading Interfaces

Offer direct stable asset swaps to users through your UI, leveraging Mento's oracle-anchored rates.

### Arbitrage Bots

Access Mento liquidity for market making between Mento pools and external venues.

### Wallets

Enable in-app swaps between stable assets and collateral directly within your wallet interface.

## Integration Steps

### Step 1: Connect to the Broker Contract

The Broker is the main interface for executing swaps:

```solidity
// Mainnet Broker address
address constant BROKER = 0x777B8E2F5F356c5c284342aFbF009D6552450d69;

// Interface
interface IBroker {
    function getAmountOut(
        address exchangeProvider,
        bytes32 exchangeId,
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256 amountOut);
    
    function swapIn(
        address exchangeProvider,
        bytes32 exchangeId,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin
    ) external returns (uint256 amountOut);
    
    function getExchangeProviders() external view returns (address[] memory)
}
```

See [Smart Contracts > Deployments](https://docs.mento.org/mento/developers/deployments/addresses) for testnet addresses.

### Step 2: Discover Available Exchange Providers

Query the Broker for registered exchange providers and their supported pairs:

```solidity
interface IExchangeProvider {
  struct Exchange {
    bytes32 exchangeId;
    address[] assets;
  }
  
  function getExchanges() external view returns (Exchange[] memory exchanges);
}

// Get all exchange providers
address[] memory providers = broker.getExchangeProviders();

// For each provider, query available exchanges
for (uint i = 0; i < providers.length; i++) {
    IExchangeProvider provider = IExchangeProvider(providers[i]);
    IExchangeProvider.Exchange[] memory exchanges = provider.getExchanges();
    
    // Each exchange contains the trading pair info
    for (uint j = 0; j < exchanges.length; j++) {
        bytes32 exchangeId = exchanges[j].exchangeId;
        address asset0 = exchanges[j].assets[0];
        address asset1 = exchanges[j].assets[1];
    }
}
```

### Step 3: Get Swap Quotes

Before executing a swap, query the expected output amount:

```solidity
// Example: Quote cUSD to cEUR swap
uint256 amountIn = 100 * 1e18; // 100 cUSD

uint256 expectedOut = broker.getAmountOut(
    exchangeProvider,  // Address of the exchange provider
    exchangeId,        // ID of the specific exchange pool
    cUSD_ADDRESS,      // Token in
    cEUR_ADDRESS,      // Token out
    amountIn          // Amount in
);
```

### Step 4: Execute Swaps

Perform the actual swap with slippage protection:

```solidity
// Approve Broker to spend your tokens
IERC20(tokenIn).approve(address(broker), amountIn);

// Execute swap with minimum output protection
uint256 minAmountOut = expectedOut * 99 / 100; // 1% slippage tolerance

uint256 actualOut = broker.swapIn(
    exchangeProvider,
    exchangeId,
    tokenIn,
    tokenOut,
    amountIn,
    minAmountOut  // Reverts if output is less than this
);
```

## Working Examples

For complete integration examples including quote aggregation and multi-hop swaps, see the [Mento SDK Examples repository](https://github.com/mento-protocol/mento-sdk-examples).

## Key Concepts

### Exchange Providers and IDs

* **Exchange Provider**: A contract managing one or more trading pools (e.g., BiPoolManager)
* **Exchange ID**: Unique identifier for a specific trading pair within a provider
* Multiple providers can offer the same pair with different parameters

### Token Types

* **Stable Assets**: Minted/burned on demand (cUSD, cEUR, etc.)
* **Collateral Assets**: Held in reserve (CELO, USDC, etc.)
* The Broker automatically handles minting/burning for stable assets

### Trading Limits

The Broker enforces per-token trading limits to protect against large flows:

* Limits are configured per exchange and token
* Both time-based and absolute limits may apply
* Transactions revert if limits are exceeded

## Best Practices

### Slippage Protection

Always use `amountOutMin` parameter to protect against unfavorable price movements between quote and execution.

### Gas Optimization

* Query multiple exchanges in a single call using multicall patterns
* Cache exchange IDs and provider addresses instead of querying repeatedly

### Error Handling

Common revert reasons:

* `"ExchangeProvider does not exist"` - Invalid provider address
* `"amountOutMin not met"` - Slippage tolerance exceeded
* `"Insufficient balance in reserve"` - Not enough collateral available
* Trading limit errors - Flow restrictions triggered
