---
description: >-
  Overview of stability fee parameters, timing, frequency, amounts, management,
  and updates.
---

# Stability Fees

### Parameters Governing the Stability Fee[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#parameters-governing-the-stability-fee) <a href="#parameters-governing-the-stability-fee" id="parameters-governing-the-stability-fee"></a>

`inflationPeriod` how long to wait between rounds of applying inflation

`inflationRate` the multiplier by which the inflation factor is adjusted per `inflationPeriod`

### Timing, Frequency, and Amount of Fee[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#timing-frequency-and-amount-of-fee) <a href="#timing-frequency-and-amount-of-fee" id="timing-frequency-and-amount-of-fee"></a>

The `inflationRate` is the multiplier by which the `inflationFactor` is increased per `inflationPeriod`. It is initially set to `1` which leaves it to governance to enable the stability fee later on.

Both, the `inflationRate` as well as the `inflationPeriod`, are specified for a given stable token and subject to changes based on governance decisions.

### Stability Fee Levied on Balance[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#stability-fee-levied-on-balance) <a href="#stability-fee-levied-on-balance" id="stability-fee-levied-on-balance"></a>

Each account’s stable token balance is stored as ‘units’, and `inflationFactor` describes the units/value ratio. The Celo Dollar value of an account can therefore be computed as follows.

`Account cUSD Value = Account cUSD Units / inflationFactor`

When a transaction occurs, a modifier checks if the stability fee needs updating and, if so, the `inflationFactor` is updated.

### Updates to the Inflation Factor[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#updates-to-the-inflation-factor) <a href="#updates-to-the-inflation-factor" id="updates-to-the-inflation-factor"></a>

To apply periodic inflation, the inflation factor must be updated at regular intervals. Every time an event triggering an `inflationFactor` update(eg a transfer) occurs, the `updateInflationFactor` modifier is called (pseudocode below), which does the following:

1. Decide if on or more `inflationPeriod` have passed since the last time `inflationFactor` was updated
2. If so, find out how many have passed
3. Compute the new `inflationFactor` and update the last updated time:

`inflationFactor` = `inflationFactor` \* `inflationRate` ^ `# inflationPeriods since last update`

### Changes to Inflation Factor[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#changes-to-inflation-factor) <a href="#changes-to-inflation-factor" id="changes-to-inflation-factor"></a>

Desired inflation rates may vary over time. When a new rate needs to be set, a governance proposal is required to update the inflation rate. If successful, the above function is called, which ensures `inflationFactor` is up to date, then updates the `inflationRate` and `inflationPeriod` parameters.

### Inflation Factor Update Schedule[​](https://docs.celo.org/celo-codebase/protocol/stability/stability-fees#inflation-factor-update-schedule) <a href="#inflation-factor-update-schedule" id="inflation-factor-update-schedule"></a>

The `updateInflationFactor` modifier is called by the following functions:

* `setInflationParameters`
* `approve`
* `mint`
* `transferWithComment`
* `burn`
* `transferFrom`
* `transfer`
* `debitFrom`
