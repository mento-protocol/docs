# BreakerBox

**BreakerBox** is an on-chain circuit breaker for oracle feeds. It maintains a state per price feed (e.g. trading allowed or suspended) and supports modular addition of price feeds and breaker logic. In **Mento V3**, the **OracleAdapter** reads from BreakerBox when supplying the FPMM pool with a valid rate; if a breaker has tripped, the adapter returns invalid and swaps revert. This protects pools from trading on stale or out-of-bounds oracle data.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/oracles/BreakerBox.sol`

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
