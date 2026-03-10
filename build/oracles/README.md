# Oracles

**Who this is for:** Integrators and oracle operators who need the technical details of Mento's price feeds (on-chain SortedOracles, off-chain clients, rate feed IDs). For a conceptual intro to oracles and circuit breakers in FPMMs, see [Oracles, price feeds & circuit breakers](../../dive-deeper/fpmm/oracles-and-circuit-breakers.md).

**See also:** [Smart Contracts](../smart-contracts/README.md) (SortedOracles, BreakerBox) · [Deployments](../deployments/README.md).

Mento Oracles consist of two technical parts: an [on-chain smart contract](../smart-contracts/sortedoracles.md) and [off-chain clients](oracle-client/). In the following pages, you will learn about these components and how price sources are chosen for the oracles to report.

<figure><img src="../../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

### Unique Rate Feed Identifiers

Each oracle rate, internally called rate feed, is uniquely identified by a  `rateFeedID`. It is used when adding oracle rates to the [SortedOracle smart contract](../smart-contracts/sortedoracles.md) by calling the [`addOracle`](https://github.com/mento-protocol/mento-core/blob/develop/contracts/SortedOracles.sol#L152) function in a Celo governance proposal:

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
