# Integrate Oracles

This guide describes how to use Mento V3’s **oracle** layer for FX rates in your application. In V3, FPMM pools get their swap rate from the **OracleAdapter**, which returns a rate only when it is **valid** (recent, trading not suspended, and for FX pairs, market hours open). Integrating with the **OracleAdapter** gives you the same rate and validity rules the pools use.

**Contract reference:** [Smart Contracts > OracleAdapter](../smart-contracts/oracleadapter.md)

---

## Why the OracleAdapter (V3)

The **OracleAdapter** is the single interface FPMM pools use for the swap rate. It:

- Reads the **median rate** from the underlying oracle feed (e.g. SortedOracles, which aggregates Chainlink, Redstone, etc.).
- Checks **recency** (report not older than the configured expiry).
- Checks **trading mode** from **BreakerBox** (e.g. trading suspended when a circuit breaker has tripped).
- For FX pairs, checks **FX market hours** (optional; can restrict trading to reference market hours).

If any check fails, the adapter **reverts**. So when you use the adapter, you get a rate that is valid for trading at that moment—the same guarantee the pool uses. Directly reading SortedOracles or other feeds does not include these validity checks.

---

## Common use cases

- **DeFi protocols** — Real-time FX rates for collateral valuation, liquidation thresholds, or cross-currency logic.
- **Price feed aggregators** — Combine Mento’s validity-gated rates with other sources.
- **Cross-border applications** — Remittance calculators, multi-currency wallets, or international payment systems.
- **Stable asset pricing** — Understand and replicate how Mento FPMM pools price swaps (oracle rate minus fee).

---

## Integration steps

### Step 1: Use the OracleAdapter contract

You need the **OracleAdapter** address for your chain (see [Deployments](../deployments/addresses.md)). The pool’s `oracleAdapter()` and `referenceRateFeedID()` tell you which adapter and feed ID that pool uses; for a custom integration you may have a fixed adapter and feed ID per pair.

```solidity
// Example: get the rate the pool uses (validity-gated)
IOracleAdapter adapter = IOracleAdapter(adapterAddress);
address rateFeedID = 0x...; // e.g. pool.referenceRateFeedID() for that pair

(uint256 numerator, uint256 denominator) = adapter.getFXRateIfValid(rateFeedID);
// Rate = numerator / denominator (1e18 scale). Reverts if invalid.
```

### Step 2: Get a valid rate (for swaps or quoting)

Use **getFXRateIfValid(rateFeedID)** when you need the same rate the FPMM would use. It reverts if:

- FX market is closed (when FX market hours are enforced).
- Trading is suspended (BreakerBox).
- There is no recent rate (stale).

```solidity
try adapter.getFXRateIfValid(rateFeedID) returns (uint256 num, uint256 denom) {
    // Use num/denom for pricing or display
} catch (bytes memory reason) {
    // FXMarketClosed, TradingSuspended, or NoRecentRate
}
```

For flows that don’t need FX market hours (e.g. non-FX or 24/7 markets), use **getRateIfValid(rateFeedID)** — same as above but without the FX market hours check.

### Step 3: Check validity without using the rate

To show “trading available” vs “market closed / suspended” without using the rate:

```solidity
try adapter.ensureRateValid(rateFeedID) {
    // Rate is valid; safe to show quote or execute
} catch {
    // Invalid: trading suspended, no recent rate, or FX market closed
}
```

### Step 4: Inspect rate and status (no revert)

For dashboards or conditional logic where you don’t want a revert:

```solidity
IOracleAdapter.RateInfo memory info = adapter.getRate(rateFeedID);

// info.numerator, info.denominator  — rate (1e18 scale)
// info.tradingMode  — 0 = bidirectional (trading allowed)
// info.isRecent     — true if within report expiry
// info.isFXMarketOpen
```

You can then decide locally whether to treat the rate as valid (e.g. only when `tradingMode == 0` and `isRecent` and, for FX, `isFXMarketOpen`).

### Step 5: Rate feed IDs

Each feed is identified by a **rateFeedID** (address). The FPMM pool stores a `referenceRateFeedID` for its pair. Common patterns:

- Legacy CELO/cStable: rate feed ID can be the stable token address.
- Other pairs: often derived, e.g. `address(uint160(uint256(keccak256(abi.encodePacked("USDCUSD")))))`.
- Relayed Chainlink feeds: often prefixed (e.g. `"relayed:NGNUSD"`).

Use the pool’s `referenceRateFeedID()` for the same feed the pool uses, or your deployment docs for the correct ID per pair.

### Step 6: Rate format

- From **OracleAdapter**: rates are returned with **1e18** denominator (adapter normalizes from the underlying 1e24).
- `rate = numerator / denominator` (e.g. token1 per token0, or quote per base depending on the feed).
- For **getRate()**, the same scale applies; use `numerator` and `denominator` from the `RateInfo` struct.

---

## Best practices

- **Use the adapter for swap-related logic** — So your validity rules match the pool (recency, breakers, FX hours).
- **Handle reverts** — `getFXRateIfValid` and `ensureRateValid` revert on invalid; use try/catch or call `getRate()` when you need non-reverting behavior.
- **Cache within a transaction** — If you use the same rate multiple times in one tx, read once and reuse.
- **Circuit breakers** — BreakerBox already gates trading; for extra safety you can enforce bounds on the rate in your application.

---

## JavaScript / TypeScript

Use the OracleAdapter ABI and the same flow: **getFXRateIfValid** for a valid rate (catch errors), or **getRate** for inspection without revert.

```ts
import { createPublicClient, http } from 'viem';
import { celo } from 'viem/chains';

const client = createPublicClient({
  chain: celo,
  transport: http(RPC_URL),
});

// Get rate (validity-gated; will throw if invalid)
const [numerator, denominator] = await client.readContract({
  address: oracleAdapterAddress,
  abi: oracleAdapterABI,
  functionName: 'getFXRateIfValid',
  args: [rateFeedID],
});
const rate = Number(numerator) / Number(denominator);

// Or inspect without revert
const rateInfo = await client.readContract({
  address: oracleAdapterAddress,
  abi: oracleAdapterABI,
  functionName: 'getRate',
  args: [rateFeedID],
});
// rateInfo.numerator, rateInfo.denominator, rateInfo.tradingMode, rateInfo.isRecent, rateInfo.isFXMarketOpen
```

For swap quoting and execution, the [Mento SDK](../mento-sdk/README.md) uses the pool’s `getAmountOut`, which already goes through the adapter; you typically don’t need to call the adapter from JS unless you’re building custom oracle UIs or risk tools.

---

## Next steps

- [Smart Contracts > OracleAdapter](../smart-contracts/oracleadapter.md) — Full contract reference and Solidity snippets.
- [Smart Contracts > FPMM](../smart-contracts/fpmm.md) — How the pool uses the adapter for quotes and swaps.
- [Dive Deeper: Oracles & circuit breakers](../../dive-deeper/fpmm/oracles-and-circuit-breakers.md) — Design and safety.
- [Deployments](../deployments/addresses.md) — OracleAdapter and pool addresses per chain.
