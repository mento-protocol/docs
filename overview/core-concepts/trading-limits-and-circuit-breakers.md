# Trading Limits & Circuit Breakers

Mento protects its stability mechanisms through automated safeguards that monitor trading activity and oracle behavior. These protective layers ensure the protocol can weather extreme market conditions while maintaining continuous operation during normal times.

## Why Protection Matters

On-chain trading systems face unique risks. When oracle prices diverge from market rates, whether due to volatility, manipulation, or technical issues, traders could drain protocol reserves before prices correct. Mento addresses this through two complementary systems:

1. Trading limits that cap flow rates
2. Circuit breakers that halt trading during abnormal conditions.

## Trading Limits

Trading limits restrict how much value can flow through the protocol over specific time windows. These limits prevent excessive drainage during market dislocations while allowing normal trading to proceed unimpeded.

### How Limits Work

The protocol enforces limits at three levels:

**L0 - Short-term limits** (typically 5 minutes): Caps immediate trading volume, particularly important between oracle updates. This prevents draining reserves if prices temporarily diverge.

**L1 - Daily limits**: Acts as a fail-safe by limiting total daily volume. Even if short-term limits are repeatedly hit, the daily cap provides absolute protection.

**LG - Global limits**: Lifetime limits that can pause specific pairs if cumulative flow exceeds safety thresholds. These require governance action to reset.

### Dynamic Configuration

Each token pair can have different limits based on:

* Collateral liquidity and volatility
* Oracle update frequency
* Historical trading patterns
* Risk tolerance parameters

For example, a CELO/USD pair might allow higher volumes than an emerging market pair due to deeper liquidity and more frequent oracle updates.

## Circuit Breakers

While trading limits bound flow rates, circuit breakers provide binary on/off protection when oracle feeds behave abnormally. The BreakerBox system monitors all price feeds and can instantly halt trading if safety conditions are violated.

### Types of Breakers

**MedianDeltaBreaker**: Designed for volatile pairs like CELO/USD. Compares new median prices against an exponential moving average, tripping if movement exceeds thresholds. This catches sudden price spikes while allowing gradual trends.

**ValueDeltaBreaker**: Built for stable pairs like USDC/USD. Compares prices against fixed reference values, tripping on small deviations. This ensures stablecoins remain near their pegs.

### Breaker Lifecycle

The protection flow operates automatically:

1. **Monitor**: Each oracle update is checked against breaker rules
2. **Trip**: If thresholds are exceeded, the breaker trips immediately
3. **Halt**: Trading for affected pairs pauses automatically
4. **Cool Down**: A waiting period prevents premature reactivation
5. **Reset**: Once prices normalize and cooldown expires, trading resumes

Different pairs have different cooldowns, CELO/USD might wait 30 minutes after extreme volatility, while USDC/USD could reset in seconds after brief deviations.

## Real-World Protection

These mechanisms have proven effective in practice:

**Market Crash Protection**: During significant CELO price drops, MedianDeltaBreakers have automatically paused trading, preventing reserve drainage while markets found new equilibrium.

**Stablecoin Depeg Events**: When stablecoins like USDC briefly lost their dollar peg, ValueDeltaBreakers protected the protocol by halting affected pairs until prices stabilized.

**Oracle Anomalies**: If oracle feeds report suspicious values or stop updating, breakers activate to prevent exploitation of stale or incorrect prices.

## Coordinated Defense

Trading limits and circuit breakers work together as complementary defenses:

* **Normal conditions**: Only trading limits apply, allowing continuous operation
* **Moderate stress**: Limits throttle flow while monitoring continues
* **Extreme events**: Breakers halt trading entirely until safety returns

This layered approach balances accessibility with protection, keeping markets open whenever safely possible.

## Governance Control

All protection parameters are governed by MENTO token holders:

* Setting breaker thresholds and cooldown periods
* Configuring trading limits for each pair
* Adding new breaker types as markets evolve
* Emergency actions if manual intervention is needed

However, the protective actions themselves are fully automated, no manual intervention is required during market stress.

## Design Philosophy

Mento's protection mechanisms follow key principles:

**Automatic**: All safeguards trigger without human intervention based on pre-set rules

**Transparent**: Parameters and current states are visible on-chain

**Proportional**: Responses scale with threat levels, minor issues throttle flow, major ones halt trading

**Self-Healing**: Systems automatically resume normal operation once conditions improve

### Next Steps

To understand how these protections fit into Mento's architecture:

* [Oracles & Price Feeds](oracles-and-price-feeds.md) - The data that triggers protections
* [The Broker & Virtual AMMs](the-broker-and-virtual-amms.md) - What gets protected
* [Stability Mechanisms](stability-mechanisms.md) - Why protection enables stability
* [Research & Economics](research-and-economics.md) - Academic foundations of risk management
