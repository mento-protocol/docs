# Integrate Stables

This guide walks through adding support for Mento stable assets in your application. Mento stables are ERC-20 tokens that track the value of fiat currencies.

## Available Stable Assets

Mento supports a growing ecosystem of stable assets that track various fiat currencies, including USD, EUR, BRL, KES, GBP, and many more. Each stable asset is an ERC-20 token that maintains a peg to its respective fiat currency.

For the complete list of available stables and their contract addresses, see:

* [**Mento Reserve**](https://reserve.mento.org/) - Live view of all supported stables with supply information
* [**Contract Deployments**](https://docs.mento.org/mento/developers/deployments/addresses) - Smart contract addresses for all supported stables

## Common Use Cases

### DeFi Protocols

Accept Mento stables as collateral, enable lending/borrowing, or create liquidity pools with stable pairs.

### Wallets

Display balances, enable transfers, and show accurate fiat values for Mento stable assets.

### Payment Applications

Process merchant payments, remittances, or payroll using region-specific stable currencies.

### Exchanges & Aggregators

List Mento stable pairs for spot trading or include in routing algorithms.

## Integration Steps

### Step 1: Add Token Contracts

Add the contract addresses for the stables you want to support:

```jsx
// Example addresses (USDm and EURm on mainnet)
const STABLE_ADDRESSES = {
  USDm: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  EURm: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
  // ... add other stables as needed
};
```

For the complete list of stable addresses across all networks, see [Smart Contracts > Deployments](https://docs.mento.org/mento/developers/deployments/addresses).

### Step 2: Configure Token Metadata

Add token symbols, decimals, and display information:

```tsx
const TOKEN_CONFIG = {
  USDm: {
    symbol: "USDm",
    decimals: 18,
    name: "Mento Dollar",
    icon: "path/to/usdm-icon.svg"
  },
  // ... other tokens*
};
```

> **Note**: All token metadata can be read from the smart contract using standard ERC-20 metadata functions (`name()`, `symbol()`, `decimals()`). Token icons are available in the [frontend monorepo](https://github.com/mento-protocol/frontend-monorepo/tree/main/apps/app.mento.org/public/tokens).

### Step 3: Implement Standard ERC-20 Operations

Use your existing ERC-20 handling for:

* Reading balances: `balanceOf(address)`
* Transfers: `transfer(to, amount)`
* Approvals: `approve(spender, amount)`
* Allowances: `allowance(owner, spender)`

### Step 4: Handle Fiat Display Values

Mento stables maintain a peg with their respective fiat currencies under normal conditions (e.g., 1 USDm ≈ 1 USD, 1 EURm ≈ 1 EUR).

For precise exchange rates, especially during high volatility, [query Sorted Oracles](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/stability/SortedOracles.sol).

### Step 5: Enable Cross-Stable Swaps (Optional)

If your application needs to swap between Mento stables:

```tsx
import { Wallet, providers, utils } from "ethers";
import { Mento } from "@mento-protocol/mento-sdk";

// Using Mento SDK V1 & Ethers V5
const STABLE_ADDRESSES = {
  USDm: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  EURm: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
  // ... add other stables as needed*
};

// Initialize SDK
const provider = new providers.JsonRpcProvider(
  "https://forno.celo.org"
);
const signer = new Wallet(privateKey, provider);
const mento = await Mento.create(signer);

// Find the tradable pair path for the tokens to swap through the router
const tradablePair = await mento.findPairForTokens(
  STABLE_ADDRESSES.USDm,
  STABLE_ADDRESSES.EURm
);

// Convert 0.01 tokens to Wei (18 decimal places: 0.01 * 10^18)
const amountIn = utils.parseUnits("0.01", 18);

// Get a quote for a swap with the given amount in
const quoteAmountOut = await mento.getAmountOut(
  STABLE_ADDRESSES.USDm,
  STABLE_ADDRESSES.EURm,
  amountIn,
  tradablePair
);

// Increase USDm allowance of the broker by amount in
const allowanceTxObj = await mento.increaseTradingAllowance(
    USDmTokenAddr,
    amountIn,
    tradablePair
  );
const allowanceTx = await signer.sendTransaction(allowanceTxObj);
const allowanceReceipt = await allowanceTx.wait();

// Allow 1% slippage from quote
const expectedAmountOut = quoteAmountOut.mul(99).div(100);

// Build swap tx
const swapTxObj = await mento.swapIn(
  USDmTokenAddr,
  EURmTokenAddr,
  amountIn,
  expectedAmountOut,
  tradablePair
);

// Send swap tx
const swapTx = await signer.sendTransaction(swapTxObj);
const swapTxReceipt = await swapTx.wait();
```

See [Integrate the Broker](integrate-the-broker.md) for detailed swap integration.

## Working Examples

For complete, runnable examples of integrating Mento stables and swaps, check out the [Mento SDK Examples repository](https://github.com/mento-protocol/mento-sdk-examples). It includes:

* Pair discovery queries
* Swap implementations
* TypeScript examples

## Best Practices

### Decimal Handling

All Mento stables use 18 decimals. Always use appropriate libraries for decimal math to avoid precision errors.

### Gas Optimization

When supporting multiple operations, consider batching transactions or using multicall patterns.

### User Experience

* Show both token amounts and fiat values
* Use familiar currency symbols ($, €, R$, CFA)

### Network Support

Mento stables are native to Celo. For cross-chain use cases, work with official bridges:

* Wormhole (USDm)
* Portal Bridge

## Testing

1. Get testnet CELO from the [Celo Faucet](https://faucet.celo.org/), then swap for your desired token on the [Mento App](https://app.mento.org)
2. Use Alfajores testnet addresses for development
3. Test all ERC-20 operations (transfer, approve, etc.)
4. Verify fiat value display matches user expectations

## Support

* **Discord**: #general for any questions
* **Token Icons**: Available in the [frontend monorepo](https://github.com/mento-protocol/frontend-monorepo)

## Next Steps

* For swap functionality, see [Integrate the Broker](integrate-the-broker.md)
* For accurate price feeds, see [Integrate Oracles](integrate-oracles.md)
* For technical reference, see [Smart Contracts](../smart-contracts/)

