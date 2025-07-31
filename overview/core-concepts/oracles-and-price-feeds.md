# Oracles & Price Feeds

Oracles provide the real-world price data that enables Mento's stability mechanisms. They feed accurate exchange rates to the protocol, allowing stablecoins to maintain their pegs through arbitrage and fixed-price swaps.

## How Mento Oracles Work

Mento uses a decentralized oracle system where multiple independent data providers report prices on-chain. The protocol aggregates these reports to determine reliable exchange rates while protecting against manipulation or faulty data.

The oracle system consists of three main components:

**Data Providers**: Independent entities that source exchange rates from various markets. Each provider monitors real-world FX rates and cryptocurrency prices.

**Oracle Relayers**: Services that collect reports from data providers and submit them on-chain. Relayers batch multiple reports together to save gas while ensuring timely price updates.

**On-Chain Contracts**: Smart contracts that verify reports, aggregate prices, and make them available to the protocol. These contracts maintain sorted lists of prices and timestamps from each oracle provider.

## Price Aggregation

When oracle reports arrive on-chain, the protocol doesn't simply use individual prices. Instead, it employs multiple layers of aggregation and validation:

**Sorted Lists**: Each rate feed maintains sorted linked lists of reported values and their timestamps. This structure enables efficient median calculation and expired report removal.

**Median Calculation**: The protocol takes the median of all valid reports, reducing the impact of outliers or manipulated values. The median updates automatically as new reports arrive or old ones expire.

**Report Expiry**: Reports older than the configured expiry time (set per rate feed or using a global default) are considered stale and can be removed, ensuring only fresh data influences prices.

## Oracle Providers

Mento integrates with established oracle networks to ensure reliable price feeds:

**Chainlink**: Industry-standard decentralized oracles with large node networks and proven reliability across DeFi protocols.

**RedStone**: Fast, gas-efficient oracle infrastructure that enables high-frequency updates with lower costs.

The protocol can integrate additional oracle providers through governance, ensuring no single point of failure in price discovery.

## Rate Feed IDs

Rate feed identifiers are the report targets for oracles. They feature in governance proposals mainly for:

1. Whitelisting oracles to report for a rate feed
2. Setting reference rates for exchanges
3. Configuring circuit breakers in the BreakerBox

<details>

<summary>Active Rate Feeds</summary>

| **Rate Feed** | **ID**                                     | **Explanation**                  |
| ------------- | ------------------------------------------ | -------------------------------- |
| CELO/USD      | 0x765DE816845861e75A25fCA122bb6898B8B1282a | The cUSD contract address        |
| CELO/EUR      | 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73 | The cEUR contract address        |
| CELO/BRL      | 0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787 | The cREAL contract address       |
| CELO/XOF      | 0x73F93dcc49cB8A239e2032663e9475dd5ef29A08 | The eXOF contract address        |
| CELO/KES      | 0x456a3D042C0DbD3db53D5489e98dFb038553B0d0 | The cKES contract address        |
| CELO/PHP      | 0xaFc02368A174Cd08e01c373de6D0B537CECF43C8 | Derived from "relayed:CELOPHP"\* |
| CELO/COP      | 0x32ABF1cBdFdcD56790f427694be2658d4B1A83bC | Derived from "relayed:CELOCOP"\* |
| CELO/GHS      | 0x5AD3817fE11971c1fd79c7D88485af560eD5470C | Derived from "relayed:CELOGHS"\* |
| CELO/GBP      | 0x6732fEF1b6EE8003A06a3D7eECFF1a36550CFDF5 | Derived from "relayed:CELOGBP"\* |
| CELO/ZAR      | 0xD064b6CcFF2AE8968bA6725e9A92f3F0431bf5D0 | Derived from "relayed:CELOZAR"\* |
| CELO/CAD      | 0x15339E57E761F006834893CD5134138339e7bfCb | Derived from "relayed:CELOCAD"\* |
| CELO/AUD      | 0x1aA86eAd81936a1E9707c6B4A7AEfb2B4A538B58 | Derived from "relayed:CELOAUD"\* |
| CELO/CHF      | 0xD808031cC050CFC81e7609156002361af6a579A6 | Derived from "relayed:CELOCHF"\* |
| CELO/JPY      | 0xd5800BbeC4Fb58b549C8de50635654E919c3Cd5D | Derived from "relayed:CELOJPY"\* |
| CELO/NGN      | 0xd9D1A7FAA5deFe7E0301Ac5363E6ca18eB78c9D7 | Derived from "relayed:CELONGN"\* |
| USDC/USD      | 0xA1A8003936862E7a15092A91898D69fa8bCE290c | Derived from "USDCUSD"           |
| USDC/EUR      | 0x206B25Ea01E188Ee243131aFdE526bA6E131a016 | Derived from "USDCEUR"           |
| USDC/BRL      | 0x25F21A1f97607Edf6852339fad709728cffb9a9d | Derived from "USDCBRL"           |
| EUROC/EUR     | 0x26076B9702885d475ac8c3dB3Bd9F250Dc5A318B | Derived from "EUROCEUR"          |
| EUROC/XOF     | 0xed35e46b095197da30ddffa5b91d386886d5ce0d | Derived from "EUROCXOF"          |
| EUR/XOF       | 0x40dc8528167557353fdcd98548ab2139a670dd0b | Derived from "EURXOF"            |
| KES/USD       | 0xbAcEE37d31b9f022Ef5d232B9fD53F05a531c169 | Derived from "KESUSD"            |
| USDT/USD      | 0xE06C10C63377cD098b589c0b90314bFb55751558 | Derived from "USDTUSD"           |
| PHP/USD       | 0xab921d6ab1057601A9ae19879b111fC381a2a8E9 | Derived from "relayed:PHPUSD"\*  |
| COP/USD       | 0x0196D1F4FdA21fA442e53EaF18Bf31282F6139F1 | Derived from "relayed:COPUSD"\*  |
| GHS/USD       | 0x44D99a013a0DAdbB4C06F9Cc9397BFd3AC12b017 | Derived from "relayed:GHSUSD"\*  |
| GBP/USD       | 0xf590b62f9cfcc6409075b1ecAc8176fe25744B88 | Derived from "relayed:GBPUSD"\*  |
| ZAR/USD       | 0x17ef04Af0c52465694a841552fc2415169b1114c | Derived from "relayed:ZARUSD"\*  |
| CAD/USD       | 0x20869cF54Ead821C45DFb2aB0C23d2e10Fbb65A4 | Derived from "relayed:CADUSD"\*  |
| AUD/USD       | 0x646bD504C3864Ea5b8A6B6D25743721f61864A07 | Derived from "relayed:AUDUSD"\*  |
| CHF/USD       | 0x0f61BA9c30ef7CaEE7E5CC1F96BFFCb0f52ccD64 | Derived from "relayed:CHFUSD"\*  |
| JPY/USD       | 0xFDE35B45cBd2504FB5dC514F007bC2DE27034274 | Derived from "relayed:JPYUSD"\*  |
| NGN/USD       | 0xC13D42556f1baeab4a8600C735afcd5344048d3C | Derived from "relayed:NGNUSD"\*  |

{% hint style="info" %}
Rate feeds with "relayed:" prefix use data relayed from Chainlink Price Feed contracts.
{% endhint %}



</details>

## Quality Assurance

Multiple mechanisms ensure oracle data quality:

**Oracle Authorization**: Each oracle must be explicitly added to a rate feed's whitelist through governance. Only authorized oracles can submit reports.

**Automatic Expiry**: Old reports are automatically invalidated after the expiry period, preventing stale data from affecting current prices.

**Median Filtering**: Using the median rather than average prices provides natural resistance to manipulation, as an attacker would need to control multiple oracles to shift the median significantly.

## Integration with Protocol

Oracle prices flow through the protocol to enable core functions:

1. **Price Discovery**: Exchange contracts query median rates to determine swap prices(ℹconsider footnote to clarify what exchange contract is(family of contrtacts vs V1 contract). The broad term makes sense)
2. **Circuit Breaker Monitoring**: The circuit breaker checks oracle updates for abnormal movements
3. **Multi-Asset Support**: Different rate feeds track various currency pairs and asset prices

## Technical Architecture

The oracle system uses gas-optimized designs for efficiency:

**Sorted Linked Lists**: Enable O(1) median calculation while maintaining sorted order for efficient updates.

**Batch Updates**: Oracles can update prices in a single transaction, with automatic median recalculation.

**Modular Design**: Oracle management, price aggregation, and breaker integration are cleanly separated for maintainability.

**Event Emission**: All significant actions emit events for off-chain monitoring and indexing.

## Oracle Governance

Oracle system parameters are managed through decentralized governance:

* Adding or removing oracle providers
* Setting report expiry times
* Managing equivalent token mappings
* Configuring rate feed parameters

This ensures the oracle system evolves with the protocol's needs while maintaining decentralization.

## Next Steps

To understand how oracles enable Mento's operations:

* [Stability Mechanisms](stability-mechanisms.md) - How oracle prices enable arbitrage
* [Trading Limits & Circuit Breakers](trading-limits-and-circuit-breakers.md) - Oracle monitoring for safety
* [The Broker & Virtual AMMs](the-broker-and-virtual-amms.md) - Using oracle prices in swaps
* [GitHub: Oracle Relayer](https://github.com/mento-protocol/oracle-relayer) - Technical implementation details

