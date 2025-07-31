# Fixed-Price Market Makers (FPMMs)

Mento's exchange infrastructure enables users to swap between stable assets and collateral at predictable rates. Through Fixed-Price Market Makers (FPMMs) and modular liquidity strategies, the protocol provides deep liquidity while maintaining price stability.

## FPMMs

FPMMs are Mento's approach to on-chain foreign exchange. Unlike traditional AMMs that shift prices along bonding curves, FPMMs quote constant exchange rates anchored to oracle prices. This design delivers several key benefits:

**Low Slippage**: Trades execute at the oracle rate regardless of size. Whether swapping $100 or $1 million, users receive the same price.

**Capital Efficiency**: Liquidity concentrates at the target price rather than spreading across curves. This maximizes available depth at the rates that matter.

**Predictable Execution**: Traders know exact exchange rates before submitting transactions. No surprises from price impact or front-running.

**24/7 Availability**: Pools operate continuously, providing liquidity even when traditional FX markets close.

## How FPMMs Work

Each FPMM manages a pool of two tokens, typically a stablecoin and its collateral. The pool maintains reserves of both assets and facilitates swaps between them at oracle-determined rates.

When users swap:

1. **Oracle Query**: The pool fetches the current exchange rate from decentralized oracles
2. **Fee Calculation**: A small protocol fee is deducted from the input amount
3. **Rate Application**: The output amount is calculated using the oracle rate
4. **Transfer Execution**: Assets transfer at the calculated amounts

The key innovation: **price remains fixed while inventory floats**.&#x20;

This inverts the traditional AMM model where inventory stays constant while price moves.

## Pool Mechanics

FPMMs implement several critical functions:

**Swaps**: Users exchange tokens at the oracle rate minus fees. The pool validates that sufficient liquidity exists and that trading isn't suspended by circuit breakers.

**Minting**: Liquidity providers add balanced amounts of both tokens to receive LP tokens. Initial liquidity follows a square root formula, while subsequent additions are proportional.

**Burning**: LPs can withdraw their share of the pool by burning LP tokens, receiving a proportional amount of both underlying assets.

**Value Preservation**: Every swap must maintain or increase the pool's total value (measured in oracle terms). This invariant prevents value extraction through manipulation.

## Inventory Rebalancing

One-sided trading creates inventory imbalances. When traders consistently buy one asset, pools would eventually exhaust their reserves. Mento solves this through automated rebalancing:

**Drift Detection**: Pools continuously monitor the ratio between their reserves and the oracle price. When this "reserve price" drifts beyond configured thresholds, rebalancing becomes available.

**Flash Swaps**: Authorized liquidity strategies can execute atomic rebalancing transactions. These simultaneously withdraw the surplus asset and inject the deficit asset, restoring balance.

**Keeper Incentives**: Permissionless bots can trigger rebalances and earn rewards. This ensures pools maintain healthy inventories.

**Safety Checks**: Rebalancing must improve the price deviation, avoid overshooting the target, and limit value loss to the allowed incentive amount.

## Liquidity Strategies

Different stablecoin architectures require different liquidity sources. Mento implements three modular strategies:

### Reserve Strategy

For fully-backed stablecoins:

* **Expansion**: Mints new stablecoins against deposited collateral
* **Contraction**: Burns excess stablecoins and releases collateral
* Maintains 1:1 backing through the Mento Reserve

### CDP Strategy

For synthetic stablecoins created through collateralized positions:

* **Stability Pool Integration**: Borrows from or repays to the Stability Pool
* **Atomic Operations**: All rebalancing happens in single transactions
* Supports over-collateralized synthetic assets

### Third-Party Strategy

For externally-created stablecoins:

* **Custom Implementation**: Issuers provide their own rebalancing logic
* **Value Preservation**: Protocol ensures no value loss during operations
* Enables integration of fiat-backed or other external stables

## Pool Configuration

Each FPMM operates with carefully tuned parameters:

* **Protocol Fee**: Trading fee retained by the protocol
* **Rebalance Incentive**: Maximum value loss allowed during rebalancing
* **Rebalance Thresholds**: Price deviation triggering rebalancing eligibility
* **Oracle Configuration**: Which price feed to use and how to interpret it
* **Circuit Breaker Integration**: Connection to the BreakerBox for safety checks

These parameters are governed by MENTO token holders and can be adjusted per pool based on asset characteristics and risk profiles.

## Liquidity Provision

Anyone can provide liquidity to FPMMs:

1. **Deposit**: Add both assets in proportion to current reserves
2. **Receive LP Tokens**: Get pool shares representing your contribution
3. **Earn Fees**: Collect a portion of all trading fees
4. **Withdraw**: Burn LP tokens to reclaim your share of reserves

Unlike traditional AMMs where LPs suffer from impermanent loss, FPMM liquidity providers benefit from:

* Fixed exchange rates that eliminate adverse selection
* Rebalancing mechanisms that maintain inventory health
* Fee accumulation from consistent trading volume

## Technical Architecture

FPMMs are implemented as upgradeable smart contracts with several design principles:

**Modular Design**: Core pool logic separates from liquidity strategies, oracle integration, and safety mechanisms. This enables upgrading individual components without system-wide changes.

**Gas Optimization**: Efficient storage patterns and calculation methods minimize transaction costs. State updates batch together to reduce storage operations.

**Decimal Handling**: Explicit management of token decimals ensures accurate conversions between assets with different precision levels.

**Event Emission**: Comprehensive events enable off-chain monitoring, indexing, and analytics of pool activity.

## Integration and Composability

FPMMs integrate seamlessly with the broader DeFi ecosystem:

* **Aggregators**: DEX aggregators can route through FPMMs for optimal pricing
* **Flash Loans**: The swap callback mechanism enables flash loan patterns
* **Automation**: Keeper networks can build on top of rebalancing incentives
* **Cross-Chain**: The design supports deployment across multiple chains

## Next Steps

To explore how FPMMs enable Mento's ecosystem:

* [Stability Mechanisms](https://www.notion.so/learn-about-mento/core-concepts/stability-mechanisms) - How fixed prices maintain pegs
* [The Reserve](https://www.notion.so/learn-about-mento/core-concepts/the-reserve) - Collateral backing for exchanges
* [Oracles & Price Feeds](https://www.notion.so/learn-about-mento/core-concepts/oracles-price-feeds) - Price discovery for FPMMs
* [Trading Limits & Circuit Breakers](https://www.notion.so/learn-about-mento/core-concepts/trading-limits-circuit-breakers) - Safety mechanisms for pools
