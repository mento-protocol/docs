# TradingLimits

The `TradingLimits` library provides data structs and utility functions for defining and verifying trading limits on the net flow of an asset. It supports three types of limits:

1. L0: A time-window-based limit that verifies whether the net flow is within the specified limit0 range, resetting every timespan0 seconds.
2. L1: A time-window-based limit that verifies whether the net flow is within the specified limit1 range, resetting every timespan1 seconds.
3. LG: A global (or lifetime) limit that ensures the net flow is within the specified limitGlobal range and doesn't reset until the limit is disabled.

This library is intended to be consumed by other contracts, with all functions marked as `internal` and `pure` or `view` for inlining during compilation to improve gas efficiency.

### Structs

#### Config

```solidity
  struct Config {
    uint32 timestep0;
    uint32 timestep1;
    int48 limit0;
    int48 limit1;
    int48 limitGlobal;
    uint8 flags;
  }

```

The `Config` struct stores the configuration parameters for the trading limits. It is designed to be packed into a single storage slot for efficiency. The struct contains the following fields:

| Attribute   | Type   | Description                                                                                 |
| ----------- | ------ | ------------------------------------------------------------------------------------------- |
| timestep0   | uint32 | Time in seconds for the timewindow-based limit L0, netflow0 resets every timestep0 seconds. |
| timestep1   | uint32 | Time in seconds for the timewindow-based limit L1, netflow1 resets every timestep1 seconds. |
| limit0      | int48  | Limit for the timewindow-based limit L0.                                                    |
| limit1      | int48  | Limit for the timewindow-based limit L1.                                                    |
| limitGlobal | int48  | Limit for the global (or lifetime) limit LG.                                                |
| flags       | uint8  | Bitwise flags that specify which limits are enabled: L0, L1, and LG.                        |

#### State

```solidity
 struct State {
    uint32 lastUpdated0;
    uint32 lastUpdated1;
    int48 netflow0;
    int48 netflow1;
    int48 netflowGlobal;
  }
```

The `State` struct is used to keep track of the trading limits and their respective netflows for a given asset. It contains information about the netflows for each limit (L0, L1, and LG) as well as the timestamps when the limits were last reset.

<table><thead><tr><th width="178">Attribute</th><th width="90.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td>lastUpdated0</td><td>uint32</td><td>Timestamp of the last reset for the netflow0.</td></tr><tr><td>lastUpdated1</td><td>uint32</td><td>Timestamp of the last reset for the netflow1.</td></tr><tr><td>netflow0</td><td>int48</td><td>Netflow for the time-window-based limit L0, resets every timespan0 seconds.</td></tr><tr><td>netflow1</td><td>int48</td><td>Netflow for the time-window-based limit L1, resets every timespan1 seconds.</td></tr><tr><td>netflowGlobal</td><td>int48</td><td>Netflow for the global (or lifetime) limit LG, doesn't reset until the limit is disabled.</td></tr></tbody></table>

\


