# Getting Exchange Pairs

This guide will walk you through an example code snippet for instantiating the SDK and getting all tradeable pairs from exchanges configured in the broker contract within the Alfajores Celo testnet.&#x20;

After installing the SDK, we can import it alongside Ethers:

```typescript
import { Mento } from "@mento-protocol/mento-sdk";
import { providers } from "ethers";
```

To instantiate the Mento class we will need to pass an Ethers provider or signer object. This example will use a `JsonRpcProvider` connected to [forno](https://docs.celo.org/network/node/forno), a public hosted node service operated by cLabs.&#x20;

```typescript
const provider = new providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);
const mento = await Mento.create(provider);
```

Now that the Mento class is instantiated, we can fetch all the pairs by calling the `getTradeablePairs` method:

```typescript
const pairs = await mento.getTradeablePairs();
console.log(pairs);
```

Which will output the list of pairs alongside their token addresses and symbols in an array format:

```typescript
[
  [
    {
      address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
      symbol: 'USDm'
    },
    {
      address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
      symbol: 'CELO'
    }
  ],
  [
    {
      address: '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
      symbol: 'EURm'
    },
    {
      address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
      symbol: 'CELO'
    }
  ],
  ...
]
```

You can find the full runnable code for this section within the [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples) repo:

{% embed url="https://github.com/mento-protocol/mento-sdk-examples/blob/main/src/discovery.ts" %}
