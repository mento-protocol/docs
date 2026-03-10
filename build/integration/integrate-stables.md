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

For precise exchange rates, use the pool’s oracle (see [Oracles, price feeds & circuit breakers](../../dive-deeper/fpmm/oracles-and-circuit-breakers.md)) or the [Mento SDK](https://github.com/mento-protocol/mento-sdk) for quotes.

### Step 5: Enable cross-stable swaps (optional)

If your application needs to swap between Mento stables, use the [Mento SDK](../mento-sdk/) to get quotes and build swap transactions against Mento V3 FPMM pools. Swaps execute at the oracle rate (minus fee). See the SDK [Guides](../mento-sdk/guides/README.md) for getting exchange pairs and initiating a swap, and [Swap & liquidity](../../use/swap-and-liquidity.md) for the user-facing flow.

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

## Next steps

* For swap functionality, see [Mento SDK](../mento-sdk/) and [Swap & liquidity](../../use/swap-and-liquidity.md)
* For accurate price feeds, see [Integrate Oracles](integrate-oracles.md)
* For contract addresses, see [Deployments & addresses](integrate-mento-stables.md) and [Smart Contracts](../smart-contracts/)

