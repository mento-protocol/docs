# Oracles

{% hint style="info" %}
These pages describe the technical details of Oracles on Mento. For an introduction to Oracles and how they work on Mento, please see [oracles.md](../../protocol-concepts/oracles.md "mention") in the [Broken link](broken-reference "mention") section.
{% endhint %}

Mento Oracles consist of two technical parts: An [on-chain smart contract](../smart-contracts/sortedoracles.md) and [off-chain clients](oracle-client/). In the following pages, you will learn about these two components as well as about the research behind choosing price sources for the oracles to report.&#x20;

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
