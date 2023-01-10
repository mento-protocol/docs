# Circuit Breaker

### Introduction

Mento oracles on Celo are an essential part of the stability mechanism. Off-chain oracle clients deliver the necessary price data for our stable assets to an on-chain smart contract. In the case of decentralized oracles, price data is potentially subject to manipulation by the entity running the oracle or other malicious actors.

### Off-chain client circuit breaker

In the case of large price movements, the oracle clients have a circuit breaker implemented which will trigger if a new price to be reported is greater than a configurable threshold. Once activated, the circuit breaker stops the oracle from sending price reports until it’s manually restarted.

### On-chain circuit breaker

The Mento protocol has an automated on-chain circuit breaker to limit trading when prices shift more than a configured threshold. This can provide an extra layer of security to protect from any manipulation, attacks or extreme market volatility.

In addition to that, the on-chain circuit breaker mechanism that has the ability to recover without manual intervention and is easily extensible.&#x20;

Each exchange pair has different trading modes. Trading modes will determine the direction of trading allowed for a particular pair. As of now, the only trading modes will be bi-directional(the current default trading mode) and no trading. The proposed design will allow the addition of new trading modes, such as unidirectional trading, in future.

### On-chain Circuit Breaker Implementation

The on-chain circuit breaker consists of the `BreakerBox` and separate breaker contracts that implement the `IBreaker` interface. The `BreakerBox` will act as a simple interface to evaluate all breaker criteria and will initially only be called when an exchange trade is made. If an exchange pair meets any breaker criteria, it will be switched to the relevant trading mode.

Currently there are two breaker contracts, a `MedianDeltaBreaker` and `ValueDeltaBreaker`.

1. The `MedianDeltaBreaker` triggers when an updated oracle median rate changes more than a configured relative threshold from the previous oracle median rate. The threshold values are configurable by governance.
2. The `ValueDeltaBreaker` triggers when an updated oracle rate is outside of a configured threshold around a reference value. For a 1 US Dollar stablecoin rate this can for example be configured to \[0.99, 0.01].

When a breaker triggers for an exchange, the `BreakerBox` will halt exchange trading for all pairs where the token of an oracle rate is involved.
