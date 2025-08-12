# Integrate Oracles

This guide walks through integrating Mento's on-chain price feeds into your application. The [`SortedOracles`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/stability/SortedOracles.sol) contract aggregates FX rates from multiple oracle providers (Chainlink, Redstone) to provide reliable exchange rates for stable asset pairs. Mento relayers continuously push these rates on-chain to ensure fresh pricing data.

## Common Use Cases

### DeFi Protocols

Use real-time FX rates for cross-currency calculations, collateral valuation, and liquidation thresholds.

### Price Feed Aggregators

Aggregate Mento's FX rates with other sources to provide comprehensive currency data.

### Cross-Border Applications

Build remittance calculators, multi-currency wallets, or international payment systems using accurate FX rates.

### Stable Asset Pricing

Understand how Mento pools price swaps between stable assets using these oracle rates.

## Integration Steps

### Step 1: Connect to SortedOracles Contract

Mento oracle data is available through the `SortedOracles` contract:

```solidity
// Mainnet SortedOracles address
address constant SORTED_ORACLES = 0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33;

// Interface
interface ISortedOracles {
  function medianRate(address rateFeedId) external view returns (uint256, uint256);
  function numRates(address rateFeedId) external view returns (uint256);
}
```

See [Smart Contracts > Deployments](https://docs.mento.org/mento/developers/deployments/addresses) for testnet addresses.

### Step 2: Query Exchange Rates

Get FX rates from the sorted oracles contract. Note that rate feed IDs can be either:

* Stable token addresses (legacy format, e.g., cUSD address for CELO/USD)
* Derived addresses for specific currency pairs (e.g., `keccak256("NGNUSD")` for NGN/USD)

> **Note:** For the full list of rate feed IDs check out the [Oracles & Price Feeds page](../../overview/core-concepts/oracles-and-price-feeds.md#active-rate-feeds)

```solidity
// Example: Get CELO/USD rate using cUSD address as rate feed ID
ISortedOracles oracles = ISortedOracles(SORTED_ORACLES);
address rateFeedId = cUSD_ADDRESS; // Rate feed ID for CELO/USD

(uint256 numerator, uint256 denominator) = oracles.medianRate(rateFeedId);

// Rate represents how much CELO equals 1 USD (with 24 decimal precision)
uint256 celoPerUsd = numerator / denominator;
```

For cross-currency rates:

```solidity
// Example: Get NGN/USD rate for cUSD/cNGN pool pricing
address ngnUsdFeedId = 0xC13D42556f1baeab4a8600C735afcd5344048d3C; // keccak256("relayed:NGNUSD")

// This gives USD per 1 NGN
(uint256 ngnUsdRate, uint256 denominator) = oracles.medianRate(ngnUsdFeedId);
```

### Step 3: Implement Rate Conversion

Use the FX rates for currency conversions. Note that rates in SortedOracles represent various currency pairs:

```solidity
// Example: Using NGN/USD rate for conversions
function ngnToUsd(uint256 ngnAmount) public view returns (uint256) {
 address ngnUsdFeedId = 0xC13D42556f1baeab4a8600C735afcd5344048d3C;
  (uint256 rate, uint256 denominator) = oracles.medianRate(ngnUsdFeedId);
  
  // rate represents USD per 1 NGN (e.g., 0.000654)
  return ngnAmount.mul(rate).div(denominator);
}

function usdToNgn(uint256 usdAmount) public view returns (uint256) {
  address ngnUsdFeedId = 0xC13D42556f1baeab4a8600C735afcd5344048d3C;
  (uint256 rate, uint256 denominator) = oracles.medianRate(ngnUsdFeedId);
  
  // To convert USD to NGN, we need to invert the rate
  return usdAmount.mul(denominator).div(rate);
}
```

These rates are crucial for Mento's pools - they determine the exchange ratios between stable assets (e.g., cUSD/cNGN uses the NGN/USD rate).

### Step 4: Check Oracle Health

Verify that oracle data is fresh and reliable:

```solidity
// Check report freshness (rates are relayed, so typically only 1 report)
(bool isExpired, ) = oracles.isOldestReportExpired(rateFeedId);
require(!isExpired, "Oracle rate is expired");

// Optional: Check the median timestamp for additional validation
uint256 medianTime = oracles.medianTimestamp(rateFeedId);
require(block.timestamp - medianTime < MAX_AGE, "Rate too old");
```

## Working with Oracle Data

### Rate Format

* Rates use 24 decimal fixed-point precision (1e24)
* `numerator / denominator` gives the exchange rate
* For FX pairs, the rate represents **Quote per 1 Base**:
  * **NGN/USD**: How much USD per 1 NGN (e.g., 0.000654 USD = 1 NGN)
  * **GBP/USD**: How much USD per 1 GBP
  * **EUR/XOF**: How much XOF per 1 EUR
* For CELO pairs (legacy format), the rate represents **Base per 1 Quote**:
  * **CELO/USD**: How much CELO per 1 USD

### Report Expiry

Oracle reports expire after a configured time period. Expired reports are automatically excluded from median calculations.

## Best Practices

### Rate Validation

Always validate oracle data before use:

* Verify rate is within expected bounds
* Consider implementing circuit breakers for extreme values

### Gas Optimization

Cache oracle results when multiple operations use the same rate within a transaction.

### Error Handling

Handle cases where:

* No oracle reports exist for a token
* All reports have expired
* Rate calculation results in zero denominator

## Advanced Usage

### Historical Data

While the contract stores current reports, historical data analysis requires:

* Monitoring MedianUpdated events
* Maintaining off-chain data stores
* Using indexing services like The Graph

## JavaScript Integration

### Using ethers

```tsx
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const sortedOraclesABI = [...]; // Contract ABI
const sortedOracles = new ethers.Contract(SORTED_ORACLES_ADDRESS, sortedOraclesABI, provider);

// Get exchange rate
const rateFeedId = '0xC13D42556f1baeab4a8600C735afcd5344048d3C'; // NGN/USD
const result = await sortedOracles.medianRate(rateFeedId);
const rate = result.numerator.div(result.denominator);
```

### Using viem

```tsx
import { createPublicClient, http } from 'viem';
import { celo } from 'viem/chains';

const client = createPublicClient({
  chain: celo,
  transport: http(RPC_URL),
});

const sortedOraclesABI = [...]; // Contract ABI

// Get exchange rate
const rateFeedId = '0xC13D42556f1baeab4a8600C735afcd5344048d3C'; // NGN/USD
const result = await client.readContract({
  address: SORTED_ORACLES_ADDRESS,
  abi: sortedOraclesABI,
  functionName: 'medianRate',
  args: [rateFeedId],
});

const rate = Number(result.numerator) / Number(result.denominator);
```

## Support

* **Discord**: #general for integration questions
* **Contract Reference**: [SortedOracles.sol](https://github.com/mento-protocol/mento-core/blob/main/contracts/stability/SortedOracles.sol)

## Next Steps

* For swap functionality using oracle rates, see [Integrate the Broker](integrate-the-broker.md)
* For contract addresses and ABIs, see [Smart Contracts](../smart-contracts/)

