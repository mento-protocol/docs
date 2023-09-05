# SortedOracles

**SortedOracles** stores and maintains the state of oracle reports. Oracle clients insert their rates into a sorted linked list and the contract checks newly inserted rates against the on-chain circuit breaker BreakerBox.sol. If valid, the rate can be used by the protocol to price swaps, otherwise, trading will be halted.

### Unique Rate Feed Identifiers

Each oracle rate, internally called rate feed, is uniquely identified by a `rateFeedID`. It is used when adding oracle rates to the [SortedOracle smart contract](sortedoracles.md) by calling the [`addOracle`](https://github.com/mento-protocol/mento-core/blob/develop/contracts/SortedOracles.sol#L152) function in a Celo governance proposal:

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

An example can be found in this [Celo Governance Proposal](https://github.com/celo-org/governance/blob/roman/add-usdc-oracles/CGPs/cgp-0071.md#status).
