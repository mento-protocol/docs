# Oracles

### Introduction

Mento oracles on Celo are an essential part of the stability mechanism. Off-chain oracle clients deliver the necessary price data for our stable assets to an on-chain smart contract. As of December 2022, there are 10 off-chain oracle clients, of which 8 are managed by Mento Labs. There are [ongoing decentralization efforts to add partners, community members, and validators](https://forum.celo.org/t/decentralized-oracles/3610). As of December 2022, two of the ten oracle clients are operated by community members. One by Celo and Mento community member Di Wu (RAinUsTa#0502 on Discord), and one by T-Systems MMS, a subsidiary of Deutsche Telekom.

The plan is to move more oracles to different entities, ecosystem projects, and potentially even validators of the Celo Protocol, to have community members run the majority of oracles.&#x20;

### Off-chain Oracle Clients

Off-chain oracle clients send their reports to the on-chain `SortedOracles` contract. The contract uses governance to collect reports and maintain the rates needed to run the Mento protocol.

Through governance, a whitelist of reporters is selected. These addresses are allowed to make reports to the SortedOracles smart contract. The smart contract keeps a list of most recent reports from each reporter. To make it difficult for a dishonest reporter to manipulate the oraclized rate, the official value of the oracle is taken to be the _median_ of this list.

### Maintaining Oracle Values[​](https://docs.celo.org/protocol/stability/oracles#maintaining-oracle-values) <a href="#maintaining-oracle-values" id="maintaining-oracle-values"></a>

To ensure the oracle's value doesn't go stale due to inactive reporters, any reports that are too old can be removed from the list. "Too old" here is defined based on a protocol parameter that can be modified via governance.

### Celo-Oracle Repository[​](https://docs.celo.org/protocol/stability/oracles#celo-oracle-repository) <a href="#celo-oracle-repository" id="celo-oracle-repository"></a>

You can find more information about the technical specification of the Celo Oracles feeding data to the reserve in the [GitHub repository here](https://github.com/celo-org/celo-oracle).
