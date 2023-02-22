# TradingLimits

This library provides data structs and utility functions for defining and verifying trading limits on the netflow of an asset. There are three limits that can be enabled:

* L0: A timewindow based limit, verifies that: -1 \* limit0 <= netflow0 <= limit0, for a netflow0 that resets every timespan0 seconds.
* L1: A timewindow based limit, verifies that: -1 \* limit1 <= netflow1 <= limit1, for a netflow1 that resets every timespan1 second.
* LG: A global (or lifetime) limit that ensures that: -1 \* limitGlobal <= netflowGlobal <= limitGlobal, for a netflowGlobal that doesn't reset until the limit is disabled.

\_All contained functions are pure or view and marked internal to be inlined on consuming contracts at compile time for gas efficiency. Both State and Config structs are designed to be packed in one storage slot each. In order to pack both the state and config into one slot each, some assumptions are made:

1. limit{0,1,Global} and netflow{0,1,Global} are recorded with ZERO decimals precision to fit in an int48. Any subunit delta in netflow will be rounded up to one unit.
2. netflow{0,1,Global} have to fit in int48, thus have to fit in the range: -140\_737\_488\_355\_328 to 140\_737\_488\_355\_328, which can cover most tokens of interest, but will break down for tokens which trade in large unit values.
3. timespan{0,1} and lastUpdated{0,1} have to fit in int32 therefore the timestamps will overflow sometime in the year 2102.

* The library ensures that netflow0 and netflow1 are reset during the update phase, but does not control how the full State gets updated if the Config changes, this is left to the library consumer.\_

## State

```solidity
struct State {
  uint32 lastUpdated0;
  uint32 lastUpdated1;
  int48 netflow0;
  int48 netflow1;
  int48 netflowGlobal;
}
```

## Config

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

## validate

```solidity
function validate(struct TradingLimits.Config self) internal pure
```

Validate a trading limit configuration.

_Reverts if the configuration is malformed._

### Parameters

| Name | Type                        | Description                 |
| ---- | --------------------------- | --------------------------- |
| self | struct TradingLimits.Config | the Config struct to check. |

## verify

```solidity
function verify(struct TradingLimits.State self, struct TradingLimits.Config config) internal pure
```

Verify a trading limit State with a provided Config.

_Reverts if the limits are exceeded._

### Parameters

| Name   | Type                        | Description                                |
| ------ | --------------------------- | ------------------------------------------ |
| self   | struct TradingLimits.State  | the trading limit State to check.          |
| config | struct TradingLimits.Config | the trading limit Config to check against. |

## reset

```solidity
function reset(struct TradingLimits.State self, struct TradingLimits.Config config) internal pure returns (struct TradingLimits.State)
```

Reset an existing state with a new config. It keps netflows of enabled limits and resets when disabled. It resets all timestamp checkpoints to reset time-window limits on next swap.

### Parameters

| Name   | Type                        | Description                          |
| ------ | --------------------------- | ------------------------------------ |
| self   | struct TradingLimits.State  | the trading limit state to reset.    |
| config | struct TradingLimits.Config | the updated config to reset against. |

### Return Values

| Name | Type                       | Description      |
| ---- | -------------------------- | ---------------- |
| \[0] | struct TradingLimits.State | the reset state. |

## update

```solidity
function update(struct TradingLimits.State self, struct TradingLimits.Config config, int256 _deltaFlow, uint8 decimals) internal view returns (struct TradingLimits.State)
```

Updates a trading limit State in the context of a Config with the deltaFlow provided.

_Reverts if the values provided cause overflows._

### Parameters

| Name        | Type                        | Description                                               |
| ----------- | --------------------------- | --------------------------------------------------------- |
| self        | struct TradingLimits.State  | the trading limit State to update.                        |
| config      | struct TradingLimits.Config | the trading limit Config for the provided State.          |
| \_deltaFlow | int256                      | the delta flow to add to the netflow.                     |
| decimals    | uint8                       | the number of decimals the \_deltaFlow is denominated in. |

### Return Values

| Name | Type                       | Description              |
| ---- | -------------------------- | ------------------------ |
| \[0] | struct TradingLimits.State | State the updated state. |

## safeINT48Add

```solidity
function safeINT48Add(int48 a, int48 b) internal pure returns (int48)
```

Safe add two int48s.

_Reverts if addition causes over/underflow._

### Parameters

| Name | Type  | Description    |
| ---- | ----- | -------------- |
| a    | int48 | number to add. |
| b    | int48 | number to add. |

### Return Values

| Name | Type  | Description               |
| ---- | ----- | ------------------------- |
| \[0] | int48 | int48 result of addition. |
