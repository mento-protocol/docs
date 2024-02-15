# From Other Chains

[SquidRouter V2](https://v2.app.squidrouter.com/) serves as an easy tool to access Mento stables. It allows you to mint and redeem Mento stables with other Celo assets and assets on various other blockchains. SquidRouter routes through the Mento Reserve, eliminating the risk of slippage commonly associated with traditional liquidity pools. This makes it highly efficient for large-volume transactions. You can mint cUSD with USDC 1:1 without any slippage. 

You can also bridge using the the [Portal Token Bridge](https://www.portalbridge.com/#/transfer) powered by the [Wormhole](https://wormhole.com/) protocol. In order to bridge collateral assets like USDC, wBTC, and ETH to Celo to one of the bridged assets utilized by the Mento Platform and the Mento Reserve, please choose your target asset and follow the steps on the respective bridge website linked above.

USDCet (USDC bridged via the Portal Token Bridge) can be used to interact with this [high-liquidity Curve pool](on-celo.md) on Celo. In case you have USDC on another chain, for example Ethereum, you can follow the steps on the [Portal Token Bridge](https://www.portalbridge.com/#/transfer) website and bridge them to USDCet on your Celo wallet. 

If you want to interact with the cUSD-axlUSDC pair on Mento and create cUSD directly, you can use the [Axelar Satellite Token Bridge](https://satellite.money/?source=ethereum\&destination=celo\&asset\_denom=uusdc\&destination\_address=) to bridge USDC from Ethereum to axlUSDC on Celo.
For more detailed documentation and guides on how to bridge assets, please refer to the respective bridge's documentation.

To automate your on-and-offramp processes, [MATE](https://docs.mento.org/mento/on-off-ramp/automation-via-mate) could come handy.
