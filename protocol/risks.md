# Risks

### Introduction

As human behaviour and financial markets are subject to randomness, there are risks involved with the creation of stable assets.

### Economic Risks

The primary risk to Celo Dollar stability is a scenario in which there is a decrease in demand for Celo Dollars greater than the total value of the reserves. In such a scenario, the protocol would be unable to handle a sufficient contraction amount to meet decreased demand. A secondary risk is a scenario in which there exists enough value in the reserves to handle a contraction in demand, but not enough market liquidity to sell the amount of crypto assets quickly enough to handle the contraction. Estimate of the likelihood of either of these risks under the given modelling assumptions, can be found in the [stability analysis](https://celo.org/papers/stability).

### Oracle Risks

Celo oracles work by enabling a list of oracles to report and calculating a median of the report. One individual provider can not influence the median on their own, the only way to affect it would be to control half the oracles plus one. Although there are additional mitigations like the off-chain and on-chain circuit breaker and trading limits in place, the community will have to be vigilant that community-run oracles are behaving properly.

### Blockchain Risk

The Mento protocol consists of a set of smart contracts that runs on the Celo blockchain. Should the Celo blockchain stall or consensus be compromised, the Mento Protocol could not run correctly anymore.&#x20;

### Smart Contract Risk

Smart Contracts on a blockchain can have vulnerabilities. We try to mitigate this as best as possible with internal engineering security awareness and competence, as well as external audits.&#x20;

