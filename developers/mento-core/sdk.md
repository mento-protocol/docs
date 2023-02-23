# SDK

{% hint style="info" %}
This is the SDK documentation for the new version of Mento, MU01, which is currently being deployed. Some of these contracts are not on Mainnet yet.&#x20;

You can find the Mento [legacy docs here](https://docs.mento.org/legacy).&#x20;
{% endhint %}

The [Mento SDK](https://github.com/mento-protocol/mento-sdk) is a typescript package that lets you interact with the protocol.

### Sample Usage

```typescript
import { providers, Wallet, utils } from 'ethers'
import { Mento } from '@mento-protocol/mento-sdk'

const provider = new providers.JsonRpcProvider(
  'https://baklava-forno.celo-testnet.org'
)
const pKey = '...'
const wallet = new Wallet(pKey, provider)

async function run() {
  const mento = await Mento.create(wallet)
  // Get the list of available pairs and use the asset addresses
  // in the next step
  console.log('available pairs: ', await mento.getTradeablePairs())
  /*
    [
        [
    {
      address: '0x62492A644A588FD904270BeD06ad52B9abfEA1aE',
      symbol: 'cUSD'
    },
    {
      address: '0xdDc9bE57f553fe75752D61606B94CBD7e0264eF8',
      symbol: 'CELO'
    }
        ],
        ...
      ]
      */

  // swap 1 CELO for cUSD
  const one = 1
  const tokenIn = '0x62492A644A588FD904270BeD06ad52B9abfEA1aE' // cUSD
  const tokenOut = '0x4c6B046750F9aBF6F0f3B511217438451bc6Aa02' // BridgedUSDC
  const amountIn = utils.parseUnits(one.toString(), 18)
  const expectedAmountOut = await mento.getAmountOut(
    tokenIn,
    tokenOut,
    utils.parseUnits(one.toString(), 18)
  )
  // 95% of the quote to allow some slippage
  const minAmountOut = expectedAmountOut.mul(95).div(100)

  // allow the broker contract to spend `tokenIn` on behalf of the wallet
  const allowanceTxObj = await mento.increaseTradingAllowance(tokenIn, amountIn)
  const allowanceTx = await wallet.sendTransaction(allowanceTxObj)
  const allowanceReceipt = await allowanceTx.wait()
  console.log('increaseAllowance receipt', allowanceReceipt)

  // execute the swap from `tokenIn` to `tokenOut`
  const swapTxObj = await mento.swapIn(tokenIn, tokenOut, amountIn, minAmountOut)
  const swapTx = await wallet.sendTransaction(swapTxObj)
  const swapReceipt = await swapTx.wait()

  console.log('swapIn receipt', swapReceipt)
}

run()


```
