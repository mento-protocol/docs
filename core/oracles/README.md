---
description: >-
  How the SortedOracles smart contract uses governance to collect reports and
  maintain the oraclized rate or the Celo dollar.
---

# Oracles

### SortedOracles Smart Contract[​](https://docs.celo.org/celo-codebase/protocol/stability/oracles#sortedoracles-smart-contract)

The stability mechanism needs to know the market price of CELO with respect to the US dollar. This value is made available on-chain in the [SortedOracles smart contract](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/stability/SortedOracles.sol).

### Collecting Reports[​](https://docs.celo.org/celo-codebase/protocol/stability/oracles#collecting-reports)

Through governance, a whitelist of reporters is selected. These addresses are allowed to make reports to the SortedOracles smart contract. The smart contract keeps a list of most recent reports from each reporter. To make it difficult for a dishonest reporter to manipulate the oraclized rate, the official value of the oracle is taken to be the _median_ of this list.

### Maintaining Oracle Values[​](https://docs.celo.org/celo-codebase/protocol/stability/oracles#maintaining-oracle-values) <a href="#maintaining-oracle-values" id="maintaining-oracle-values"></a>

To ensure the oracle's value doesn't go stale due to inactive reporters, any reports that are too old can be removed from the list. "Too old" here is defined based on a protocol parameter that can be modified via governance.

### Celo-Oracle Repository[​](https://docs.celo.org/celo-codebase/protocol/stability/oracles#celo-oracle-repository) <a href="#celo-oracle-repository" id="celo-oracle-repository"></a>

You can find more information about the technical specification of the Celo Oracles feeding data to the reserve in the [GitHub repository here](https://github.com/celo-org/celo-oracle).
