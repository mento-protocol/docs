# Smart Contracts

### Introduction

The Mento protocol consists of a set of smart contracts, which are currently deployed on the [Celo blockchain](https://celo.org/).

### Smart Contracts

**Broker.sol** is the entry point for traders. It is responsible for requesting and executing swaps. It is the only contract with spender rights over the reserve and minting & burning rights over stable assets. When executing swaps, it enforces trading limits. The broker orchestrates swaps by calling BiPoolManager.sol. The Broker also exposes a burn function for burning stable tokens without subject to trading limits or regular exchange operations.

**BiPoolManager.sol** is responsible for storing and managing the state of configured asset pools, which can consist of two assets. With its state information on assets and bucket sizes it prices trades using a pricing module. It also checks if trading is allowed or suspended as decided by the on-chain circuit breaker BreakerBox.sol. Currently, it can price trades with constant-product or constant-sum as specified in the respective pricing modules.

**TradingLimits.sol** stores and keeps track of trading limits for all exchange pairs. Limits are configurable for 5-minute and 1-day intervals, as well as a total global limit. It is called by Broker.sol when requesting swaps. The limits exist to protect the protocol against possible economic exploits or smart contract hacks.

**BreakerBox.sol** is an on-chain circuit breaker for oracle reports. It maintains a state for each price feed, whether trading is allowed or suspended. It is modular by design and allows for flexible addition and deletion of price feeds and individual breaking logic. It’s conditions are checked and breakers triggered if necessary by newly added rates in SortedOracles.sol. For each requested swap, BiPoolManager.sol checks against this contract whether trading a specific pair is currently allowed or suspended.

**MedianDeltaBreaker.sol** implements a median delta breaker check for the on-chain circuit breaker managed by BreakerBox.sol.

**SortedOracles.sol** stores and maintains the state of oracle reports. Oracle clients insert their rate into a sorted linked list and the contract checks newly inserted rates against the on-chain circuit breaker BreakerBox.sol. If valid, the rate can be used by the protocol to price swaps, otherwise trading will be halted.

**StableToken.sol** implements ERC-20 tokens and Celo-specific features.

**Reserve.sol** stores and manages any ERC-20 Mento reserve asset on the Celo blockchain. Assets can be accessed and controlled only by Broker.sol, guarded by trading limits from TradingLimits.sol.

**ConstantProductPricingModule.sol** is a stateless contract that implements a constant-product pricing formula for a two-asset pool.

**ConstantSumPricingModule.sol** is a stateless contract that implements a constant-sum pricing formula for a two-asset pool.
