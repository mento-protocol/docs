# BreakerBox

**BreakerBox**[ ](broken-reference)is an on-chain circuit breaker for oracles. It maintains a state for each price feed, whether trading is allowed or suspended. It is modular by design and allows for flexible addition and deletion of price feeds and individual breaking logic. Its conditions are checked and breakers are triggered if necessary by newly reported rates in SortedOracles.sol. For each requested swap, BiPoolManager.sol checks against this contract whether trading a specific pair is currently allowed or suspended.

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/BreakerBox.sol" %}
BreakerBox.sol
{% endembed %}

### MedianDeltaBreaker

**MedianDeltaBreaker** is a circuit breaker that trips when the current median oracle rate compared to an exponential moving average over previous median rates exceeds a configured relative threshold.

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/breakers/MedianDeltaBreaker.sol" %}
MedianDeltaBreaker.sol
{% endembed %}

### ValueDeltaBreaker

**ValueDeltaBreaker** is a circuit breaker that trips when the current median oracle rate compared to a fixed reference rate exceeds a configured relative threshold.

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/breakers/ValueDeltaBreaker.sol" %}
ValueDeltaBreaker.sol
{% endembed %}
