# Airdrop

### Overview

**5% of the MENTO total supply** was distributed to existing community members to reward their past contributions to the development and usage of decentralized Mento Stable Assets or the Celo ecosystem overall.

Eligible addresses could claim their allocation as locked veMENTO, **linearly unlocking over two years** without a cliff.

The **claiming period** ran from **June 10th until August 9th, 2024**. After the claiming period ended, unclaimed allocations reverted to the Mento Community Treasury.

For current MENTO distribution and tokenomics, see [MENTO Tokenomics](mento-tokenomics.md).

### Eligibility criteria (historical)

To have been eligible, an address had to fulfill at least one of the following criteria:

* Staked at least $10 (US dollars) worth of CELO (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Held at least $10 (US dollars) worth of stCELO (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Held more than $10 (US dollars) worth of any of Mento's decentralized stable assets (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Transacted in any of Mento's decentralized stable assets with a volume greater than $100 (US dollars) (volume calculated as the cumulative sum over the 16 monthly snapshots between November 15th, 2022, and February 15th, 2024).

Claimable amounts were concave (square root) in the balances of locked CELO and Mento stablecoins, as well as the Mento stablecoin volumes:

* 50% allocated to locked CELO and stCELO holders
* 50% allocated to Mento stablecoin balances + volume

To verify the methodology, users could review raw snapshot data in the [airgrab-snapshot GitHub repository](https://github.com/mento-protocol/airgrab-snapshot).
