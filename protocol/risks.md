# Risks

### Introduction

As human behavior and financial markets are subject to randomness, there are risks involved with the creation of stable assets.&#x20;

### Economic Risks

The primary risk to Mento Dollar stability is a scenario in which there is a decrease in demand for Mento Dollars greater than the total value of the reserves. In such a scenario, the protocol would be unable to handle a sufficient contraction amount to meet decreased demand. A secondary risk is a scenario in which there exists enough value in the reserves to handle a contraction in demand, but not enough market liquidity to sell the amount of a crypto asset quickly enough to handle the contraction. Estimates of the likelihood of either of these risks under the given modeling assumptions can be found in the[ stability analysis](https://celo.org/papers/stability).

### Oracle Risks

Mento oracles enable a list of oracle providers to report and calculate the median of the reported values. One individual provider can not influence the median on their own. The only way to complete control would be to control half the oracles. Although there are additional mitigations like the off-chain and on-chain circuit breaker and trading limits in place, the community will have to monitor whether community-run oracles are behaving properly.

### Blockchain Risk

The Mento protocol consists of a set of smart contracts that run on the Celo blockchain. Should the Celo blockchain stall or consensus be compromised, the Mento Protocol could not run correctly anymore.

### Smart Contract Risk

Smart Contracts on a blockchain can have vulnerabilities. This risk is being addressed via internal and external code audits.

