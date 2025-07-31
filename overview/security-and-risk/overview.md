# Overview

## Understanding Risk in Decentralized Stable Assets

Creating stable assets on a blockchain introduces unique challenges that traditional financial systems don't face. When you remove central authorities and replace them with smart contracts and algorithms, you gain transparency and accessibility but you also inherit new categories of risk that require sophisticated mitigation strategies.

The Mento Protocol operates in an adversarial environment where economic incentives, technical vulnerabilities, and market dynamics constantly interact. This overview explains the primary risks facing the protocol and the specific mechanisms we've built to address them.

## Economic Risks and Market Dynamics

### The Reserve Challenge

The fundamental challenge for any hybrid stable asset system is maintaining its peg during periods of market stress. Unlike purely algorithmic designs, Mento combines algorithmic supply adjustments with robust reserve backing. This hybrid approach provides multiple lines of defense, but still faces the core challenge: ensuring the Reserve can always honor redemptions when demand contracts sharply.

During market turmoil, users may rush to redeem their Mento stables for underlying collateral. The protocol must have sufficient reserves not just in nominal terms, but in liquid, accessible assets. This drives Mento's over-collateralization strategy, with the Reserve holding a diversified basket including USDC, DAI, and other stable collateral well above 100% of outstanding supply.

### Liquidity and Market Depth

Having adequate reserves means little if deploying them would cause excessive slippage. Mento addresses this through multiple liquidity venues, primarily the Fixed-Price Market Makers (FPMMs) that provide zero-slippage exchanges at oracle prices.

Trading limits provide another protection layer. Time-weighted caps spread large operations across multiple blocks or hours, preventing both market manipulation and cascade effects from large redemptions. These limits adjust based on market conditions and available liquidity depth.

## Technical Security Architecture

### Smart Contract Security

The Mento Protocol consists of dozens of interconnected smart contracts managing billions in value. Every major upgrade undergoes multiple independent audits from firms like Macro and Sherlock.

The architecture provides defense through modularity. Core contracts handling value storage are immutable and battle-tested. Peripheral contracts for governance and trading can be upgraded through time-locked procedures, giving the community time to review changes.

### Oracle Integrity

Price oracles represent a critical dependency. If an attacker manipulates the oracle price, they could extract value by trading at artificial rates. Mento addresses this through multiple defensive layers.

The protocol sources prices from multiple independent providers—currently Chainlink and RedStone—and takes the median, ensuring no single provider can unilaterally influence prices. The BreakerBox system monitors these feeds in real-time, automatically halting trading if prices deviate beyond expected bounds or feeds go stale.

Different breaker types handle different scenarios. Median-Delta Breakers protect volatile pairs by comparing sequential updates. Value-Delta Breakers ensure stable pairs stay within tight bands. Even successful oracle manipulation would have limited impact—corrupted prices trigger circuit breakers before trades can execute.

### Operational Security

Beyond technical vulnerabilities, the protocol defends against operational attacks through the Watchdog multisig—a 3-of-8 group with veto power over any governance action within 48 hours. Watchdog members review every proposal's technical implementation to ensure code matches stated intent.

All privileged operations require multiple signatures and time delays. This transparency gives the community time to analyze changes and coordinate responses to potentially harmful actions.

## Governance and Systemic Risks

### Decentralization and Voting Power

Decentralized governance only provides security if voting power is actually distributed. Mento addresses this through veMENTO, requiring token holders to lock MENTO for periods up to four years to gain voting weight. This makes it expensive for attackers to accumulate power quickly—they must lock significant capital for extended periods.

The initial distribution supports decentralization: 45% to community treasury, 30% to contributors with vesting, plus ecosystem airdrops. No single entity controls a majority.

### Parameter Bounds

The protocol implements limits at the smart contract level. Governance can adjust parameters within reasonable ranges but cannot set clearly destructive values. These bounds themselves require special procedures with higher quorums and longer delays to modify.

## Learning from Past Failures

The DeFi space's history informs Mento's design. Iron Finance showed the dangers of reflexive tokens. Terra/Luna demonstrated how purely algorithmic stability can fail catastrophically. Oracle manipulations have extracted hundreds of millions from vulnerable protocols.

Mento's hybrid model combining algorithmic mechanisms with reserve backing provides resilience these systems lacked. Circuit breakers handle extreme events, and we assume all external data sources are potentially hostile.

## Ongoing Security Efforts

Security requires continuous effort. The protocol conducts regular reviews of both code and economic assumptions. Community members run independent monitoring infrastructure, providing distributed security no centralized team could match.

Public dashboards display real-time metrics, allowing anyone to monitor for anomalies. This transparency and community involvement create multiple detection layers for potential issues.

## Next Steps

To explore specific aspects of Mento's security architecture:

* [Audit Reports](https://www.notion.so/mentolabs/audit-reports) - Comprehensive security assessments from leading firms
* [Trading Limits & Circuit Breakers](https://www.notion.so/trading-limits-circuit-breakers) - Deep dive into protective mechanisms
* [Watchdogs & Safety](https://www.notion.so/watchdogs-safety) - Governance safeguards and veto powers
* [Analytics & Dashboards](https://www.notion.so/analytics-dashboards) - Monitor security metrics in real-time
