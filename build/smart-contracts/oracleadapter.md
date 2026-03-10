# OracleAdapter

The **OracleAdapter** is the single interface the FPMM pool uses to obtain the swap rate. It returns a rate only when it is **valid**; otherwise it reverts. Validity combines: **recency** of the feed, **trading mode** from BreakerBox (e.g. trading suspended when a breaker has tripped), and, for FX pairs, **FX market hours**. The pool calls `getFXRateIfValid(rateFeedID)` on every quote and swap; if the adapter reverts, the swap path reverts.

**Contract:** [mento-protocol/mento-core](https://github.com/mento-protocol/mento-core) — `contracts/oracles/OracleAdapter.sol`

---

## State

| Field | Meaning |
|-------|--------|
| `sortedOracles` | Source of the median rate and timestamp for a given `rateFeedID`. |
| `breakerBox` | Provides **trading mode** per rate feed (e.g. bidirectional vs suspended). |
| `marketHoursBreaker` | Provides **FX market open/closed** for the current block timestamp. |
| `l2SequencerUptimeFeed` | Optional Chainlink L2 sequencer feed; if set, can be used to gate on sequencer uptime. |

---

## Rate feed ID

Each price feed is identified by a **rateFeedID** (an address). For CELO/cStable the ID is the stable token address. For other pairs (e.g. USDC/USD, EUR/USD) the ID is typically derived as `address(uint160(uint256(keccak256(abi.encodePacked(asset0, asset1)))))`. Relayed Chainlink feeds often use a prefix (e.g. `"relayed:PHPUSD"`). The FPMM pool stores a `referenceRateFeedID` and passes it to the adapter.

---

## Main entrypoints (for the pool)

- **getFXRateIfValid(rateFeedID)** — Returns `(numerator, denominator)` only if:  
  1. **FX market is open** (`marketHoursBreaker.isFXMarketOpen(block.timestamp)`).  
  2. **Trading mode** for this feed is bidirectional (`breakerBox.getRateFeedTradingMode(rateFeedID) == TRADING_MODE_BIDIRECTIONAL`).  
  3. **Recent rate:** `medianTimestamp(rateFeedID) >= block.timestamp - reportExpiry` (report expiry comes from `sortedOracles.getTokenReportExpirySeconds(rateFeedID)`).  
  Otherwise reverts with `FXMarketClosed`, `TradingSuspended`, or `NoRecentRate`.

- **getRateIfValid(rateFeedID)** — Same as above but **does not** check FX market hours. Used when market-hours gating is not required.

- **ensureRateValid(rateFeedID)** — View that reverts if the rate would not be valid (trading mode or recency); does not return the rate. Useful for pre-checks.

---

## Rate source

- **getRate(rateFeedID)** — Returns a **RateInfo** struct: `(numerator, denominator, tradingMode, isRecent, isFXMarketOpen)` without reverting. The actual rate comes from `sortedOracles.medianRate(rateFeedID)`. The adapter normalizes the denominator (SortedOracles uses 1e24; the adapter exposes 1e18 after scaling).  
  So the pool always gets the rate via the **validity-gated** path (`getFXRateIfValid`), not the raw median.

---

## L2 sequencer

- **isL2SequencerUp(since)** — If `l2SequencerUptimeFeed` is set, returns whether the sequencer has been up for at least `since` seconds (and answer is 0). If the feed is not set, returns true. Used on L2s to avoid using stale rates right after sequencer recovery.

---

## Errors

- `FXMarketClosed` — `getFXRateIfValid` called when FX market hours say closed.  
- `TradingSuspended` — BreakerBox trading mode is not bidirectional for this feed.  
- `NoRecentRate` — Median timestamp is older than `block.timestamp - reportExpiry`.  
- `InvalidRate` — Median rate numerator or denominator is zero.

---

## See also

- [BreakerBox](breakerbox.md) — Circuit breakers and trading mode.  
- [FPMM](fpmm.md) — Pool calls `getFXRateIfValid`.  
- [Dive Deeper: Oracles & circuit breakers](../../dive-deeper/fpmm/oracles-and-circuit-breakers.md).
