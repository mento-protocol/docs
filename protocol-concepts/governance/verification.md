---
description: Helpful information to aid in verifying governance proposals
---

# Verification

### Rate Feed IDs

Rate Feed identifiers are the [report targets for oracles](../../developers/smart-contracts/sortedoracles.md). The feature in governance proposals mainly in one of these situations:

1. Whitelisting oracles to be able to report for a rate feed.
2. Setting the [reference rate for exchanges. ](../../developers/smart-contracts/bipoolmanager.md#poolexchange)
3. Configuring circuit breakers in the [breaker box](../../developers/smart-contracts/breakerbox.md).

<table><thead><tr><th width="143.33333333333331">RateFeed</th><th width="295">ID</th><th>Explanation</th></tr></thead><tbody><tr><td>CELO/USD</td><td>0x765DE816845861e75A25fCA122bb6898B8B1282a</td><td>The <a href="https://explorer.celo.org/mainnet/address/0x765DE816845861e75A25fCA122bb6898B8B1282a">cUSD contract address</a></td></tr><tr><td>CELO/EUR</td><td>0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73</td><td>The <a href="https://explorer.celo.org/mainnet/address/0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73">cEUR contract address</a></td></tr><tr><td>CELO/BRL</td><td>0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787</td><td>The <a href="https://explorer.celo.org/mainnet/address/0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787">cREAL contract address</a></td></tr><tr><td>CELO/XOF</td><td>0x73F93dcc49cB8A239e2032663e9475dd5ef29A08</td><td>The <a href="https://explorer.celo.org/mainnet/address/0x73F93dcc49cB8A239e2032663e9475dd5ef29A08">eXOF contract address </a></td></tr><tr><td>USDC/USD</td><td>0xA1A8003936862E7a15092A91898D69fa8bCE290c</td><td><code>address(uint160(uint256(keccak256("USDCUSD"))))</code></td></tr><tr><td>USDC/EUR</td><td>0x206B25Ea01E188Ee243131aFdE526bA6E131a016</td><td><code>address(uint160(uint256(keccak256("USDCEUR"))))</code></td></tr><tr><td>USDC/BRL</td><td>0x25F21A1f97607Edf6852339fad709728cffb9a9d</td><td><code>address(uint160(uint256(keccak256("USDCBRL"))))</code></td></tr><tr><td>EUROC/EUR</td><td>0x26076B9702885d475ac8c3dB3Bd9F250Dc5A318B</td><td><code>address(uint160(uint256(keccak256("EUROCEUR"))))</code></td></tr><tr><td>EUROC/XOF</td><td>0xed35e46b095197da30ddffa5b91d386886d5ce0d</td><td><code>address(uint160(uint256(keccak256("EUROCXOF"))))</code></td></tr><tr><td>EUR/XOF</td><td>0x40dc8528167557353fdcd98548ab2139a670dd0b</td><td><code>address(uint160(uint256(keccak256("EURXOF"))))</code></td></tr></tbody></table>

### Exchange IDs

Exchange identifiers are deterministically computed from the assets and pricing module of the pool as follows:

```solidity
exchangeId = keccak256(
  abi.encodePacked(
    IERC20Metadata(exchange.asset0).symbol(),
    IERC20Metadata(exchange.asset1).symbol(),
    exchange.pricingModule.name()
  )
);
```

<table><thead><tr><th width="176.33333333333331">Exchange</th><th>ID</th><th>Explanation</th></tr></thead><tbody><tr><td>cUSD/CELO</td><td>0x3135b662c38265d0655177091f1b647b4fef511103d06c016efdf18b46930d2c</td><td><code>keccak256(abi.encodePacked("cUSD", "CELO", "ConstantProduct"))</code></td></tr><tr><td>cEUR/CELO</td><td>0xb73ffc6b5123de3c8e460490543ab93a3be7d70824f1666343df49e219199b8c</td><td><code>keccak256(abi.encodePacked("cEUR", "CELO", "ConstantProduct"))</code></td></tr><tr><td>cREAL/CELO</td><td>0xed0528e42b9ecae538aab34b93813e08de03f8ac4a894b277ef193e67275bbae</td><td><code>keccak256(abi.encodePacked("cREAL", "CELO", "ConstantProduct"))</code></td></tr><tr><td>eXOF/CELO</td><td>0x269dcbdbc07fff1a4aaab9c7c03b3f629cd9bbed49aa0efebab874e4da1ffd07</td><td><code>keccak256(abi.encodePacked("eXOF", "CELO", "ConstantProduct"))</code></td></tr><tr><td>cUSD/axlUSDC</td><td>0x0d739efbfc30f303e8d1976c213b4040850d1af40f174f4169b846f6fd3d2f20</td><td><code>keccak256(abi.encodePacked("cUSD", "axlUSDC", "ConstantSum"))</code></td></tr><tr><td>cEUR/axlUSDC</td><td>0xf418803158d881fda22694067bf6479476cec22ecfeeca2f6a65a6259bdbb9c0</td><td><code>keccak256(abi.encodePacked("cEUR", "axlUSDC", "ConstantSum"))</code></td></tr><tr><td>cREAL/axlUSDC</td><td>0x40c8472edd23f2976b0503db2692e8f06f0eb52db690e84697cad36a6b44e2df</td><td><code>keccak256(abi.encodePacked("cREAL", "axlUSDC", "ConstantSum"))</code></td></tr><tr><td>cEUR/EUROC</td><td>0xfca6d94b46122eb9a4b86cf9d3e1e856fea8a826d0fc26c5baf17c43fbaf0f48</td><td><code>keccak256(abi.encodePacked("cEUR", "axlEUROC", "ConstantSum"))</code></td></tr><tr><td>eXOF/EUROC</td><td>0xcc68743c58a31c4ec3c56bca3d579409b4e2424e5f37e54a85f917b22af74e7c</td><td><code>keccak256(abi.encodePacked("eXOF", "axlEUROC", "ConstantSum"))</code></td></tr><tr><td>cUSD/nativeUSDC</td><td>0xacc988382b66ee5456086643dcfd9a5ca43dd8f428f6ef22503d8b8013bcffd7</td><td><code>keccak256(abi.encodePacked("cUSD", "USDC", "ConstantSum"))</code></td></tr><tr><td>cEUR/nativeUSDC</td><td>0x99be8b8341ba00914600cda701568ab27eea9aca7a32fa48c26e07b86841020c</td><td><code>keccak256(abi.encodePacked("cEUR", "USDC", "ConstantSum"))</code></td></tr><tr><td>cBRL/nativeUSDC</td><td>0xe8693b17c0f002f6a2fe839525557cef10dfeacef9e16c9bbdcb01c57933ce58</td><td><code>keccak256(abi.encodePacked("cREAL", "USDC", "ConstantSum"))</code></td></tr></tbody></table>
