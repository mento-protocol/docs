# On-Chain Circuit Breaker

The Mento protocol relies on off-chain oracle clients to provide crucial price data such as exchange rates of a specific token against various currencies such as USD, BRL and EUR. These rates are submitted to a smart contract - [SortedOracles](https://github.com/mento-protocol/mento-core/blob/main/contracts/SortedOracles.sol), which is essential for the stability mechanism. The price data that is submitted, is potentially subject to manipulation by the entity running the oracle client or other malicious actors. The protocol includes an on-chain circuit breaker as an additional security measure to protect the mechanism from any potential manipulation attacks or extreme market volatility.

### What is a circuit breaker?

The circuit breaker pattern is typically used in software to prevent catastrophic cascading failures across related systems. This pattern is also adopted in TradFi markets to trigger a temporary halt in trading when a significant price movement occurs. In the context of Mento, the circuit breaker can be described as a mechanism designed to automatically halt the ability to exchange Mento assets due to a pre-defined condition being met. The use of the circuit breaker is an attempt to balance the need for market efficiency with the need to prevent catastrophic losses due to extreme events.

### The Mento circuit breaker

The "circuit breaker" is not a single component but a collection of components designed to identify specific market conditions and prevent further minting or burning of Mento stables if any of these conditions are met. It was built with flexibility in mind and allows the monitoring of new conditions and the integration of additional virtual asset pools in the future.

<figure><img src="../.gitbook/assets/Mento Protocol Architecture-Circuit Breaker (1).png" alt=""><figcaption><p>The Mento protocol circuit breaker &#x26; integration points</p></figcaption></figure>

For a more detailed explanation of how the circuit breaker functions and its internals, please see the developer section.

&#x20;
