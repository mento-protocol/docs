# Getting a Quote

After you have already [fetched all tradeable pairs](getting-exchange-pairs.md), you are ready to get price quotes directly from the `Broker` contract. In the example below we will do so for the `CELO/cUSD` exchange.

We start by importing the SDK and instantiating it on the Alfajores Celo testnet:

```typescript
import { providers, utils } from "ethers";
import { Mento } from "@mento-protocol/mento-sdk";

const provider = new providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);
const mento = await Mento.create(provider);
```

In order to get a quote you will need the address of the token you will provide (`tokenIn`) as well as the address of the token you intend to get out (`tokenOut`). In this example we will get a quote for `CELO -> cUSD` using the addresses from the previous step.

```typescript
const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const tokenUnits = 18; // both CELO and cUSD have 18 decimal places
```

We can now get a quote for how much `cUSD` we can expect to receive in exchange for `1 CELO`:

```typescript
const amountIn = utils.parseUnits("1", tokenUnits);
const quoteAmountOut = await mento.getAmountOut(
  celoTokenAddr,
  cUSDTokenAddr,
  amountIn
);

console.log(
  `~${utils.formatUnits(
    quoteAmountOut,
    tokenUnits
  )} cUSD in exchange for 1 CELO`
);
```

Alternatively, you can also get a quote for the amount of tokens that you would need to provide in order to buy an exact amount of another desired token. For example, the amount of `cUSD` needed to buy `1 CELO`:

```typescript
const amountOut = utils.parseUnits("1", tokenUnits);
const quoteAmountIn = await mento.getAmountIn(
  cUSDTokenAddr,
  celoTokenAddr,
  amountOut
);

console.log(
  `~${utils.formatUnits(quoteAmountIn, tokenUnits)} cUSD needed to buy 1 CELO`
);
```

You can find the full runnable code for this section within the [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples) repo:

{% embed url="https://github.com/mento-protocol/mento-sdk-examples/blob/main/src/quotes.ts" %}
