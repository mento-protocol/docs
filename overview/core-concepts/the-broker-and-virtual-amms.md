# The Broker & Virtual AMMs

The Broker serves as the central exchange router in Mento V2, orchestrating all asset swaps through virtual Automated Market Makers (vAMMs). This architecture provides efficient exchanges between stable assets and collateral.

> Note: This page describes Mento V2 architecture, which is currently in production. The next generation (V3) will transition to direct FPMM interactions without the Broker intermediary. See [Fixed-Price Market Makers](https://www.notion.so/Fixed-Price-Market-Makers-FPMMs-22ba2148cc5c803187f4f6e097589625?pvs=21) for the future architecture.

## Architecture Overview

The V2 exchange system consists of three main components working together:

1. **The Broker**: Central contract that handles all swaps, manages permissions, and enforces trading limits
2. **Exchange Providers**: Modular pricing engines (currently BiPoolManager) that calculate exchange rates
3. **Virtual AMMs**: Pools that maintain virtual buckets and execute pricing logic without holding actual assets

This separation of concerns enables flexible exchange mechanisms while maintaining security and upgradability.

## The Broker

The Broker is the only contract with permission to mint and burn stable assets or transfer collateral from the Reserve. It serves as a secure gateway that:

**Validates Exchanges**: Ensures the requested exchange provider exists and has sufficient reserve backing for collateral assets.

**Enforces Limits**: Applies trading limits to prevent excessive flows that could destabilize the system.

**Routes Swaps**: Delegates price calculations to exchange providers while handling the actual asset transfers.

**Manages Providers**: Maintains a registry of approved exchange providers and their associated reserves.

### Key Functions

When users swap through the Broker:

1. **Quote Request**: `getAmountIn()` or `getAmountOut()` queries the exchange provider for pricing
2. **Validation**: Checks exchange provider status, reserve balances, and trading limits
3. **Execution**: `swapIn()` or `swapOut()` performs the actual exchange
4. **Settlement**: Transfers assets between user, Broker, and Reserve as needed

## Virtual AMMs (vAMMs)

Unlike traditional AMMs that hold liquidity, Mento's virtual AMMs maintain theoretical "buckets" representing the relative values of assets. These buckets:

* Reset periodically based on oracle prices
* Adjust ratios during swaps (for constant product) or maintain them (for constant sum)
* Enable efficient pricing without locking actual capital

### BiPoolManager

The BiPoolManager implements the virtual AMM logic for two-asset pools. Each pool tracks:

**Virtual Buckets**: Theoretical reserves that determine exchange rates without holding real assets.

**Oracle Integration**: Reference rate feeds that provide external price anchors for bucket resets.

**Pricing Modules**: Pluggable strategies for calculating swap amounts.

### Pricing Strategies

V2 supports two pricing modules:

**Constant Sum**: Maintains fixed exchange rates between bucket resets. Ideal for stable-to-stable swaps where external oracle prices should dominate. Buckets reset to match oracle rates but don't change during swaps.

**Constant Product**: Uses the classic `x * y = k` formula. Suitable for stable-to-volatile pairs where price discovery happens on-chain. Buckets adjust with each swap to reflect supply and demand.

## Trading Limits Integration

The Broker enforces configurable trading limits on each exchange:

* **Time-based limits**: Restrict flow over specific time windows (L0, L1)
* **Global limits**: Absolute caps on cumulative flow (LG)
* **Bidirectional tracking**: Monitors both inflows and outflows

These limits work alongside circuit breakers to protect the protocol during volatile conditions.

## How V2 Exchanges Work

A typical swap flow:

1. **User initiates swap** through the Broker
2. **Broker queries BiPoolManager** for exchange rate
3. **BiPoolManager checks oracles** and updates buckets if needed
4. **Pricing module calculates** output amount based on bucket state
5. **Broker validates** trading limits and reserve balances
6. **Assets transfer**:
   * Stable assets: minted to/burned from user
   * Collateral: transferred between Reserve and user
7. **Buckets update** (for constant product only)

## Migration Path to V3

While V2's Broker architecture has served Mento well, V3's direct FPMM approach offers:

* Simplified architecture with fewer intermediary contracts
* True liquidity provision with real assets in pools
* More efficient gas usage
* Better composability with DeFi protocols

During the transition period, both systems will operate in parallel, allowing gradual migration of liquidity and users.

## Technical Reference

For developers integrating with V2:

* Use the Broker as your entry point for all swaps
* Query available exchanges via `getExchangeProviders()`
* Check trading limits before large swaps
* Monitor oracle freshness for accurate pricing

See the [Developer Documentation](https://www.notion.so/build-on-mento) for detailed integration guides and contract addresses.

### Next Steps

To understand how V2 components work together:

* [Trading Limits & Circuit Breakers](https://www.notion.so/learn-about-mento/core-concepts/trading-limits-circuit-breakers) - Protection mechanisms
* [Oracles & Price Feeds](https://www.notion.so/learn-about-mento/core-concepts/oracles-price-feeds) - External price anchoring
* [The Reserve](https://www.notion.so/learn-about-mento/core-concepts/the-reserve) - Asset backing for exchanges

To learn about the future architecture:

* [Fixed-Price Market Makers](https://www.notion.so/learn-about-mento/core-concepts/fixed-price-market-makers) - Mento V3's approach
