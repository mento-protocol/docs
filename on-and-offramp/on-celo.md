# On Celo

Mento's origins are on the [Celo blockchain](https://celo.org/), where the creation and redemption of stable assets is possible as well as several decentralized exchanges (DEXs) are available for trading.&#x20;

For interacting with a blockchain, you need a cryptocurrency wallet. A popular choice among users is [MetaMask](https://metamask.io/), [MiniPay](https://www.opera.com/de/products/minipay)  or [Valora](https://valoraapp.com/).

## Decentralized Exchanges

Decentralized exchanges (DEXs) are the primary way of exchanging assets in the decentralized finance (DeFi) community. There are multiple DEXs on Celo where you can exchange Mento stable assets:&#x20;

* [Uniswap](https://app.uniswap.org/#/swap)
* [Curve](https://curve.fi/#/celo/swap)
* [Sushi](https://www.sushi.com/swap?fromChainId=42220)
* [Ubeswap](https://app.ubeswap.org/#/swap)

## High-liquidity Curve Pool for cUSD

The Mento reserve maintains a [high-liquidity Curve pool](https://curve.fi/#/celo/pools/factory-v2-35/deposit) with 20 million USD in liquidity, split between cUSD and USDCet. USDCet is USDC bridged from Ethereum via [Wormhole](https://wormhole.com/) and the [Portal Token Bridge](https://www.portalbridge.com/#/transfer). &#x20;

## SquidRouter
[SquidRouter V2](https://v2.app.squidrouter.com/) serves as an easy tool to access Mento stables. It allows you to mint and redeem Mento stables with other Celo assets and assets on various other blockchains. SquidRouter routes through the Mento Broker, eliminating the risk of slippage commonly associated with traditional liquidity pools. This makes it highly efficient for large-volume transactions. You can mint cUSD with USDC 1:1 without any slippage. 

## Mento

The [Mento web app](https://app.mento.org/) is a direct gateway to the Mento Platform. The web app is maintained by the Mento Labs’ Core team and allows the exchange of stable assets with collateral assets. Depending on the direction of the trade, stable assets are either created or burned directly by the Mento Reserve.&#x20;

Please be aware, that for large orders against non-USDC collateral assets for cUSD and non-EUROC assets for cEUR, slippage might increase since the mechanism protects itself against oracle manipulation risk. For larger amounts, USDC and EUROC pairs on Mento or the high-liquidity Curve pool are good places to trade.

To automate your on-and-offramp processes, [MATE](https://docs.mento.org/mento/on-off-ramp/automation-via-mate) could come handy.
