# Stability Mechanisms

Mento maintains stable asset pegs through economic incentives that allow market participants to profit from correcting price deviations. This approach creates a self-regulating system where stability emerges from rational market behavior combined with algorithmic bucket management.

## How Stability Works

When a Mento stablecoin's market price deviates from its peg, the protocol creates arbitrage opportunities through its AMM pools that naturally restore the correct price.

**Above peg**: Arbitrageurs can buy stablecoins from Mento pools at rates determined by the AMM curve and sell them at the higher market price. This increases circulating supply and pushes market prices down.

**Below peg**: Arbitrageurs can buy cheap stablecoins from the market and sell them to Mento pools, reducing circulating supply and pushing market prices up.

The AMM pools periodically reset their virtual buckets based on oracle prices, ensuring the on-chain rates stay anchored to real-world FX rates.

This mechanism operates continuously and permissionlessly, anyone can participate in maintaining the peg while earning profits from their actions.

## **Elastic Supply**

Mento stable assets maintain their peg through virtual AMM buckets that reset periodically based on oracle prices.&#x20;

The system uses two pricing modules:&#x20;

**Constant Sum**: Used for stable-to-stable pairs (like USDm/EURm), provides minimal slippage around the oracle rate.

**Constant Product**: Used for volatile pairs (like USDm/CELO), follows a traditional x\*y=k curve.

When the virtual buckets drift from the target ratio set by oracles, the system resets them, effectively:

* Minting new stablecoins when demand has increased
* Burning stablecoins when demand has decreased

This creates an elastic supply that automatically adjusts to match real market demand without manual intervention.

## Bucket Resets and Rebalancing

The protocol monitors the ratio between assets in its virtual buckets. When trading activity causes significant drift from the oracle-determined ratio, the buckets reset to restore the target balance.

These resets occur when:

* Sufficient time has passed since the last reset (governance parameter)
* Oracle prices have been updated and are fresh
* The price deviation exceeds the minimum thresholds

This periodic rebalancing ensures pools maintain an adequate inventory of both assets while keeping prices aligned with real-world FX rates.

## Decentralized Stability

The protocol's stability doesn't depend on any single component or actor. Multiple oracle providers (Chainlink and RedStone) feed prices, any market participant can arbitrage, and the bucket resets happen automatically based on pre-defined rules.

Each participant profits from their role: arbitrageurs from price corrections, liquidity providers from fees, and keepers from rebalancing fees. These aligned incentives create a sustainable system where maintaining stability is profitable for all involved.

## Hybrid Stability Model

Mento combines market-driven incentives with dynamic controls. While arbitrageurs provide the immediate response to price deviations, the periodic bucket resets ensure long-term alignment with oracle prices.

This hybrid approach means:

* Short-term stability comes from arbitrage incentives
* Long-term accuracy comes from oracle-based resets
* The system self-corrects without manual intervention

The result is a robust equilibrium where stablecoin prices naturally gravitate toward their pegs through both market forces and dynamic adjustments.

## Protection Mechanisms

During extreme market conditions, additional safeguards activate automatically:

* Circuit breakers pause trading if oracle prices deviate excessively
* Trading limits cap maximum flows over specific time periods
* Modular components can fail safely without system-wide impact

These mechanisms operate based on pre-defined parameters, ensuring protection without requiring emergency interventions.

## Next Steps

To understand the complete stability architecture:

* [The Broker & Virtual AMMS](the-broker-and-virtual-amms.md) - How swaps execute
* [Oracles & Price Feeds](oracles-and-price-feeds.md) - Accurate pricing for stability
* [Trading Limits & Circuit Breakers](trading-limits-and-circuit-breakers.md) - Protection during volatility
* [The Reserve](the-reserve.md) - Collateral backing for stable assets
