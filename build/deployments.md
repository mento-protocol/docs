# Deployments

Addresses, parameters, and verification for Mento v3. Source: parameters notes in the repo (`parameters/suggested_fpmm_*.tex`) and the deployment process; if addresses live in another repo or doc, link or paste them here.

---

## Addresses

Mainnet (and testnets as needed). Update the table from the canonical source (mento-core or deployment docs).

| Contract / component | Chain | Address | Notes |
|----------------------|-------|---------|--------|
| FPMMFactory | Celo mainnet | *TBD* | From deployment |
| Router | Celo mainnet | *TBD* | From deployment |
| Pools (per pair) | Celo mainnet | *TBD* | e.g. cUSD/CELO, EURm/EUR, GBPm/USDm |
| OracleAdapter / BreakerBox | Celo mainnet | *TBD* | From deployment |
| Reserve / CDP strategies | Celo mainnet | *TBD* | Per pool |

*Fill from `vendor/mento-core` or deployment output; verify on block explorer.*

---

## Parameters

Pool and system parameters (fee bps, rebalance threshold, trading limits, etc.) are defined in the parameters notes:

- `parameters/suggested_fpmm_euroc_eurm_parameters.tex`
- `parameters/suggested_fpmm_gbpm_usdm_parameters.tex`
- `parameters/suggested_fpmm_usdx_usdm_parameters.tex`

Use these for “which pools exist” and for deployment/config. For a human-readable summary, add a table here (pool pair | fee | threshold | limits) once standardized.

---

## Verification

Contract source verification (e.g. Etherscan/Celo explorer):

- Verify FPMM, Factory, Router, OracleAdapter, BreakerBox, strategies using the deployment script or the block explorer’s verification flow.
- Point to the repo (e.g. `vendor/mento-core`) and tag/commit used for the deployment.

For step-by-step verification instructions, see the developers’ deployment doc or the old docs’ [verification](https://docs.mento.org) page (update link as needed).
