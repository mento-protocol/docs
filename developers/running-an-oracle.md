# Running an Oracle

Oracles on Celo for Mento are an essential part of the stability mechanism. As of December 2022, there are 10 oracle clients, of which Mento Labs manages 8. There are[ ongoing decentralization efforts to add partners, community members, and validators](https://forum.celo.org/t/decentralized-oracles/3610). As of December 2022, one oracle is operated by a community member, and one by T-Systems MMS, a subsidiary of Deutsche Telekom.

The plan is to move these oracles to different entities, ecosystem projects, and potentially even validators of the Celo Protocol, to have community members run the majority of oracles.

## Requirements

If you are a developer or entity with relevant technical skills, you are welcome to run an Oracle yourself.

In order to run an oracle, you can not have any conflicts of interest and have the technical ability to maintain and update oracles as needed. That means some experience with running software in the cloud, IT security, maintaining them, and setting up and responding to alerts.

## Oracle client code

The public repository for the oracle client, including technical documentation, can be found[ here](https://github.com/celo-org/celo-oracle) on GitHub.

## How to get added as an oracle provider

If you are interested in running an oracle,[ please read this forum post in the Celo forum](https://forum.celo.org/t/decentralized-oracles/3610) for a first overview.

Generally, oracle reports on Celo are controlled by Celo governance and the next steps outline the process of how you can be added as a provider.

1. Express your interest in running an oracle in the[ Celo forum](https://forum.celo.org/) and on the[ #oracle-provider Discord channel](https://discord.com/channels/966739027782955068/1044219395553120276) to initiate the discussion. Here you can get in touch with Mento Labs engineers who can help you in the process, and get first feedback from the Celo community on whether there is support or objection.
2. From that discussion, you can get our technical runbook and deploy an oracle client on the Celo testnet Alfajores. Mento Labs engineers can help with this.
3. The next step would be to deploy oracles on Celo mainnet, ensure they are live and working correctly, and have the addresses ready for a governance proposal.
4. Now it is time to get a security review from the cLabs security team, for this please get in touch on the[ #oracle-provider Discord channel](https://discord.com/channels/966739027782955068/1044219395553120276).
5. Then it is time to prepare and propose a governance proposal. Examples of previous oracle provider additions are here for[ Di Wu](https://celo.stake.id/#/proposal/74) and[ T-Systems.](https://celo.stake.id/#/proposal/77) This includes the compensation.
6. If the proposal passes Celo governance, your client addresses will be able to report to the on-chain oracle and your compensation will be initiated.

## Compensation

[The Celo community informally agreed](https://forum.celo.org/t/decentralized-oracles-rewards-proposal/4110/19) on the following compensation, pending a successful governance vote for each added provider.

V3 Revised Reward Payment Framework for Operators

1. Initial Startup Payment - $6,000
   * Will cover initial startup costs
   * Paid at time of activating oracle in CELO
2. On-going Monthly Reward - Dependent on the number of cStables reported on
   * Tier 1: Up to 5 cStables - $1500 / month
   * Tier 2: Up to 10 cStables - $2000 / month
   * Tier 3: 10+ cStables - $2500 / month
3. Initial payment for new cStable launch - $300
   * Each new stablecoin launch will have a one-time payment of $300
   * This will cover costs to support a new cStable as we grow.

Rewards are paid in CELO using a [Celo ReleaseGold](https://docs.celo.org/holder/manage/release-gold#what-is-releasegold) contract and will be locked for 3 months. This allows time for partners to prove the reliability of their infrastructure.

\


