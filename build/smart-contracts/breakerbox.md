# BreakerBox

**BreakerBox** is an on-chain circuit breaker for oracle feeds. It maintains a state per price feed (e.g. trading allowed or suspended) and supports modular addition of price feeds and breaker logic. In **Mento V3**, the **OracleAdapter** reads from BreakerBox when supplying the FPMM pool with a valid rate; if a breaker has tripped, the adapter returns invalid and swaps revert. This protects pools from trading on stale or out-of-bounds oracle data.

For **FX pairs**, Mento also uses a **MarketHoursBreaker**. This aligns on-chain trading with reference FX market hours: Chainlink FX feeds typically stop updating on weekends and certain holidays, so Mento can reject FX trading even if the last reported rate is still recent enough by timestamp.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/oracles/BreakerBox.sol`

Integrators typically **do not** call BreakerBox directly; the [OracleAdapter](oracleadapter.md) uses it. If you need to check trading mode (e.g. for a status UI), use the adapter’s `getRate(rateFeedID)` and inspect `tradingMode`, or call `getTradingMode(rateFeedID)` on the adapter if exposed.

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

### MarketHoursBreaker

**MarketHoursBreaker** is a special breaker for **FX market-hours gating**. Instead of comparing prices, it checks whether the current block timestamp falls inside the configured FX trading window. The current implementation treats the FX market as closed:

- from **Friday 21:00 UTC** until **Sunday 23:00 UTC**
- on **Christmas Day (Dec 25)** and **New Year's Day (Jan 1)**
- after **22:00 UTC** on **Dec 24** and **Dec 31**

When this breaker says the FX market is closed, `OracleAdapter.getFXRateIfValid()` reverts and FX-priced FPMM swaps revert too. This is especially relevant for GBP/USD, EUR/USD, and similar fiat FX feeds, whose Chainlink rates generally do not update during those closure windows.

{% embed url="https://github.com/mento-protocol/mento-core/blob/main/contracts/oracles/breakers/MarketHoursBreaker.sol" %}
MarketHoursBreaker.sol
{% endembed %}
