# Trading Limits

### Introduction

The protocol aims to protect the reserve against possible exploits and smart contract hacks. This is why the Mento Protocol Broker has governable trading limits. Without trading limits, in- and outflow trading limits are implicitly enforced by bucket sizes in the constant-product AMM. Trading limits separate that task from actual slippage. For the Mento Protocol Broker, it is possible to configure three time-window-based absolute trading limits for each token on an exchange.&#x20;

### Trading Limits Implementation

The TradingLimits.sol library provides data structs and utility functions for defining and verifying trading limits on the net flow of an asset. There are three limits that can be enabled. There are two time-window-based limits that reset at a configurable time span and one global limit that does not reset until the limit is disabled via config change. When a trading limit is reached, trading will be suspended until it resets.&#x20;

The library ensures that the net flows are reset during the update phase, but does not control how the full state gets updated if the config changes, this is left to the library consumer.

\
