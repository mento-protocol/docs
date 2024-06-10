# Airdrop

### Overview

**5% of the MENTO total supply** will be distributed to existing community members to reward their past contributions to the development and usage of decentralized Mento Stable Assets or the Celo ecosystem overall.

Eligible addresses can claim their allocation as locked veMENTO, which will be **linearly unlocking over two years** without a cliff.

The **claiming period lasts from** **June 10th until August 9th, 2024**. After the claiming period ends, unclaimed allocations will go to the Mento Community Treasury.

During the claiming period, users can go to [**airdrop.mento.org**](https://airdrop.mento.org) to check their eligibility, verify their identity, and claim their allocation.&#x20;

### Eligibility criteria

To be eligible, an address must fulfill at least one of the following criteria:

* Staked at least $10 (US dollars) worth of CELO (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Held at least $10 (US dollars) worth of stCELO (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Held more than $10 (US dollars) worth of any of Mento's decentralized stable assets (amount based on average balance over 16 monthly snapshots, taken between November 15th, 2022, and February 15th, 2024);
* Transacted in any of Mento's decentralized stable assets with a volume greater than $100 (US dollars) (volume calculated as the cumulative sum over the 16 monthly snapshots between November 15th, 2022, and February 15th, 2024).

Claimable amounts are concave (think square root) in the balances of locked CELO and Mento stablecoins, as well as the Mento stablecoin volumes:

* 50% allocated to locked CELO and stCELO holders
* 50% allocated to Mento stablecoin balances + volume

Smart contract addresses are not eligible to claim, except for [ReleaseGold](https://docs.celo.org/holder/manage/release-gold) (we used the `beneficiary` address of the contract) and Gnosis Safes. Unfortunately, it would have been too much work to accommodate every possible smart contract, and we wanted to prioritize individual community members first and foremost with this airdrop.

Mento stablecoins held in liquidity pools or other DeFi protocols will not be counted directly. It was not feasible to account for all possible pools and DeFi protocols on Celo, but since depositing stablecoins into liquidity pools or DeFi protocols leads to volume, they are counted indirectly.

To verify the methodology, users can review raw snapshot data in [this GitHub repository](https://github.com/mento-protocol/airgrab-snapshot).

### Restricted countries and addresses

To comply with local regulations in various jurisdictions, we have partnered with [**Fractal ID**](https://web.fractal.id/) to ensure that owners of eligible addresses are neither on an AML sanctions list nor residents of one of the restricted countries from the list below. Claimers will be asked to upload their verification documents directly to Fractal ID.

The uploaded data will be deleted after validation and submission of on-chain proof that the user is on or is not on the restriction list. **Neither Mento Community members nor Mento Labs will have access to the personal data uploaded to Fractal ID by users.**

Residents of the countries from the list below will not be able to claim any allocation, even if the wallet address they own is eligible:

* Crimea\*\*
* Cuba\*\*
* Donetsk\*\*
* DPRK (North Korea)\*
* Democratic Republic of the Congo\*
* Iran\*
* Luhansk\*\*
* Mali\*
* Myanmar\*
* South Sudan\*
* Syria\*
* United Kingdom\*\*\*
* United States of America\*\*\*
* Yemen\*

\* Countries are sanctioned on EU and OPAC levels and are considered high-risk jurisdictions in terms of AML/CFT on the EU and FATF level

\*\* Countries are considered “comprehensively sanctioned countries” by OPAC

\*\*\* Countries are blocked for regulatory reasons

Additionally, all eligible addresses were checked against the Chainalysis API to ensure that sanctioned addresses were not included.
