# Mento Core

### Introduction

MultiCollateral-Mento or “McMint” is a generalization of the first Mento system with the aim of allowing virtual pools between any mento stable asset and mento collateral asset to be traded under different pricing regimes. New exchange pairs can be deployed through configuration only. Responsibility of reserve asset management and the pricing logic for virtual pools is split into separate contracts. The core contract upgrade moves oracle circuit breakers from the oracle clients to on-chain, automating and modularizing the circuit breaker logic. Slippage and trading limits are separated in pricing contracts and configurable exchange trading limits.
