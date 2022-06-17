---
description: Overview of the Tobin Tax and its effect on the Celo reserve.
---

# Tobin Tax

{% hint style="info" %}
The tobin tax is currently **disabled** on Mainnet.
{% endhint %}

### Implementation[​](https://docs.celo.org/celo-codebase/protocol/stability/tobin-tax#implementing-the-tobin-tax) <a href="#implementing-the-tobin-tax" id="implementing-the-tobin-tax"></a>

If the Celo reserve ratio falls below `tobinTaxReserveRatio`, a small fee is levied on CELO transfers to discourage further depletion of CELO collateral. This fee is transferred to the `Reserve` smart contract. There is no gas charged for this transfer. The `tobinTaxReserveRatio` and the `tobinTax` parameters are governable.

### Reserve Ratio Calculation[​](https://docs.celo.org/celo-codebase/protocol/stability/tobin-tax#reserve-ratio-calculation)

The total Celo reserve value, expressed in CELO units, is approximated on-chain by dividing the reserve CELO balance by the CELO target asset allocation weight. The Celo reserve ratio is then computed by dividing the total reserve value by the value of Celo Dollar supply expressed in CELO units.\
\
