# SortedOracles

**SortedOracles** stores and maintains the state of oracle reports. Oracle clients insert their rates into a sorted linked list and the contract checks newly inserted rates against the on-chain circuit breaker BreakerBox.sol. If valid, the rate can be used by the protocol to price swaps, otherwise, trading will be halted.

### Unique Rate Feed Identifiers

Each oracle rate, internally called rate feed, is uniquely identified by a `rateFeedID`. It is used when adding oracle rates to the [SortedOracles smart contract](https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/SortedOracles.sol) by calling the [`addOracle`](https://github.com/mento-protocol/mento-core/blob/c2e344ebd5f3018253cf26cb39a50f81d8db7c21/contracts/oracles/SortedOracles.sol#L152) function in a Celo governance proposal:

```solidity
addOracle(address token, address oracleAddress)
```

For `CELO/cStable` rate feeds, the unique identifier is the address of the stable token. Since this doesn't work for more than one pair including the same stable token, which was not initially planned, a new formula is used to create unique rate feed identifiers for rate feeds other than `CELO/cStable`.

These identifiers can be derived using the following formula:

```solidity
address(uint160(uint256(keccak256(${asset0asset1}))))
```

For example, `USDCUSD` inserted gives the following formula:

```solidity
address(uint160(uint256(keccak256("USDCUSD"))))
// == 0xA1A8003936862E7a15092A91898D69fa8bCE290c
```

Rates that are relayed from Chainlink price feeds have the prefix "relayed:" added to the pair.
```solidity
address(uint160(uint256(keccak256("relayed:PHPUSD"))))
// == 0xab921d6ab1057601A9ae19879b111fC381a2a8E9
```

An example can be found in this [Celo Governance Proposal](https://github.com/celo-org/governance/blob/roman/add-usdc-oracles/CGPs/cgp-0071.md#status).
