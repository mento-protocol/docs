# Smart Contracts

### Introduction

The Mento protocol consists of a set of smart contracts, which are deployed on the[ Celo blockchain](https://celo.org/).

### Smart Contracts

****[**Broker**](broker/) is the entry point for interacting with the protocol. It is responsible for managing reserve assets and is the only contract with spender rights of the reserve as well as minting and burning rights over stable assets. For pricing trades, it relies on exchange providers like BiPoolManager.sol. When executing swaps, it enforces trading limits. The Broker also exposes a burn function for burning stable tokens without being subject to trading limits or regular exchange operations.

****[**BiPoolManager**](iexchangeprovider/bipoolmanager/) **** is the first implementation of an IExchangeProvider which manages virtual asset pools that consist of two assets. With its state information on assets and bucket sizes, it prices trades using a pricing module. It also checks if trading is allowed or suspended as decided by the on-chain circuit breaker BreakerBox.sol. It can price trades with constant-product or constant-sum as specified in the respective pricing modules.

****[**TradingLimits**](broker/tradinglimits.md) is a library that implements trading limits, used by the Broker. Limits are configurable for 5-minute and 1-day intervals and a total global limit. It is called by the Broker when requesting swaps. The limits exist to protect the protocol against possible economic exploits or smart contract hacks.

****[**BreakerBox**](breakerbox/)****[ ](breakerbox/)is an on-chain circuit breaker for oracles. It maintains a state for each price feed, whether trading is allowed or suspended. It is modular by design and allows for flexible addition and deletion of price feeds and individual breaking logic. Its conditions are checked and breakers are triggered if necessary by newly added rates in SortedOracles.sol. For each requested swap, BiPoolManager.sol checks against this contract whether trading a specific pair is currently allowed or suspended.

****[**MedianDeltaBreaker**](breakerbox/mediandeltabreaker.md) is a circuit breaker that trips if the median oracle report changes by a configured threshold.

****[**SortedOracles**](sortedoracles.md) stores and maintains the state of oracle reports. Oracle clients insert their rates into a sorted linked list and the contract checks newly inserted rates against the on-chain circuit breaker BreakerBox.sol. If valid, the rate can be used by the protocol to price swaps, otherwise, trading will be halted.

****[**StableToken**](stabletoken.md) implements ERC-20 tokens and Celo-specific features for stable assets. Each stable asset has its own contract, with StableToken.sol for the Celo Dollar, StableTokenEUR.sol for the Celo Euro, and so forth for new stable assets.

****[**Reserve**](reserve.md) **** stores and manages any ERC-20 Mento reserve asset on the Celo blockchain. Assets can be accessed and controlled only by Broker.sol as well as a MultiSig, guarded by trading limits from TradingLimits.sol.

****[**ConstantProductPricingModule**](iexchangeprovider/bipoolmanager/constantproductpricingmodule.md) is a stateless contract that implements a constant-product pricing formula for a two-asset pool.

****[**ConstantSumPricingModule**](iexchangeprovider/bipoolmanager/constantsumpricingmodule.md) is a stateless contract that implements a constant-sum pricing formula for a two-asset pool.
