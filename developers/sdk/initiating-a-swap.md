# Initiating a Swap

After you have gotten a [price quote](getting-a-quote.md) from the Broker, you can use the sdk to create a swap transaction object which you can then submit to the network.

So far in the previous examples we have used only a `JsonRpcProvider` for interacting with the contracts. This is fine for read-only contract calls, but in order to generate a signed transaction object you will need to instantiate the SDK with an Ethers signer.&#x20;

For state changing operations (e.g. swaps) the SDK returns [TransactionRequest](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionRequest) Ethers objects populated with information from the signer. Submitting the transaction to the network is left to the consumer to give flexibility for apps integrating the SDK for handling the final transaction lifecycle.

In this example we will use a `Wallet` Ethers signer object which can be instantiated with a private key:

```typescript
import { Wallet, providers, utils } from "ethers";

import { Mento } from "@mento-protocol/mento-sdk";

const privateKey = "YOUR_PRIVATE_KEY_HERE";
const provider = new providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);
const signer = new Wallet(privateKey, provider);
const mento = await Mento.create(signer);
```

We will follow along the previous of example of swapping `1 CELO` token into `cUSD`, so we can get a price quote in the same way we previously did:

```typescript
const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const tokenUnits = 18; // both CELO and cUSD have 18 decimal places

const amountIn = utils.parseUnits("1", tokenUnits);
const quoteAmountOut = await mento.getAmountOut(
  celoTokenAddr,
  cUSDTokenAddr,
  amountIn
);
```

Before we can submit the swap, we will need to approve the `Broker` contract to spend `CELO` tokens on our behalf. The Mento class provides a convenient function for increasing the allowance for a given token by a certain amount:

```typescript
const allowanceTxObj = await mento.increaseTradingAllowance(
  celoTokenAddr,
  amountIn
);
const allowanceTx = await signer.sendTransaction(allowanceTxObj);
const allowanceReceipt = await allowanceTx.wait();
console.log("tx receipt: ", allowanceReceipt);
```

{% hint style="info" %}
You can also opt for increasing the broker allowance to a larger amount to not have to execute the above step on every single swap.
{% endhint %}

After the transaction is included in a block and the allowance is increased we can use a similar process for submitting the swap transaction to the network:

```typescript
const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
const swapTxObj = await mento.swapIn(
  celoTokenAddr,
  cUSDTokenAddr,
  amountIn,
  expectedAmountOut
);
const swapTx = await signer.sendTransaction(swapTxObj);
const swapTxReceipt = await swapTx.wait();
```

Similar to the `getAmountIn` price quote method where we get the amount of tokens needed to buy a specific amount of another desired token, the Mento class also exposes a `swapOut` method which takes both the desired `amountOut` as well as a `maxAmountIn` parameter. Try it on your own!

You can find the full runnable code for this section within the [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples) repo:

{% embed url="https://github.com/mento-protocol/mento-sdk-examples/blob/main/src/swap.ts" %}
