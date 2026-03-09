# Deployments

Addresses, parameters, verification. Source: `parameters/suggested_fpmm_*.tex` and deployment process.

---

## Addresses

| Contract / component | Chain | Address | Notes |
|----------------------|-------|---------|--------|
| FPMMFactory | Celo mainnet | *TBD* | From deployment |
| Router | Celo mainnet | *TBD* | From deployment |
| Pools (per pair) | Celo mainnet | *TBD* | e.g. USDm/CELO, EURm/EUR, GBPm/USDm |
| OracleAdapter / BreakerBox | Celo mainnet | *TBD* | From deployment |
| Reserve / CDP strategies | Celo mainnet | *TBD* | Per pool |

Update from canonical source (mento-core or deployment docs).

---

## Parameters

Pool and system parameters (fees, rebalance threshold, trading limits) in parameters notes:

- `parameters/suggested_fpmm_euroc_eurm_parameters.tex`
- `parameters/suggested_fpmm_gbpm_usdm_parameters.tex`
- `parameters/suggested_fpmm_usdx_usdm_parameters.tex`

Filenames may use legacy symbols; stablecoins are USDm, EURm, GBPm. Use for “which pools exist” and deployment config.

---

## Verification

Verify FPMM, Factory, Router, OracleAdapter, BreakerBox, strategies via deployment script or block explorer. Repo: `vendor/mento-core` + tag/commit. Step-by-step: block explorer’s verification guide for your chain (e.g. Celo explorer).
