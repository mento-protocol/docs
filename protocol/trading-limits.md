# Trading Limits

### Introduction

The protocol wants to protect itself and the reserve against possible exploits and smart contract hacks. This why the Mento Protocol Broker has governable trading limits. Without trading limits, in- and outflow trading limits are implicitly enforced by bucket sizes in the constant-product AMM. Trading Limits separate that task from actual slippage. For the Mento protocol Broker, it is possible to configure 3 time window based absolute trading limits for each token on an exchange.

### Trading Limits Implementation

The TradingLimits.sol library provides data structs and utility functions for defining and verifying trading limits on the netflow of an asset. There are three limits that can be enabled:

* L0: A time window based limit, verifies for a $netflow\_0$ that resets every $timespan\_0$ seconds that: $$-1 * limit_0 <= netflow_0 <= limit_0$$
* L1: A time window based limit, verifies for a $netflow\_1$ that resets every $timespan\_0$ second that: $$-1 * limit_1 <= netflow_1 <= limit_1$$
* LG: A global (or lifetime) limit for a $netflow\_{global}$, that doesn't reset until the limit is disabled, ensuring that: $$-1 * limit_{global} <= netflow_{global} <= limit_{global}$$

All contained functions are pure or view and marked internal to be inlined on consuming contracts at compile time for gas efficiency. Both State and Config structs are designed to be packed in one storage slot each.

In order to pack both the state and config into one slot each, some assumptions are made:

1. $$limit_{0, 1, global}$$ and $$netflow_{0, 1, global}$$are recorded with ZERO decimals precision to fit in an `int48`. Any subunit delta in $$netflow_{0, 1, global}$$ will be rounded up to one unit.
2. $$netflow_{0, 1, global}$$ has to fit in `int48`, thus have to fit in the range: -140\_737\_488\_355\_328 to 140\_737\_488\_355\_328, which can cover most tokens of interest, but will break down for tokens which trade in large unit values.
3. $$timespan_{0, 1}$$ and $$lastUpdated_{0, 1}$$ have to fit in `int32` therefore the timestamps will overflow sometime in the year 2102.

The library ensures that $$netflow_0$$ and $$netflow_1$$ are reset during the update phase, but does not control how the full state gets updated if the config changes, this is left to the library consumer.
