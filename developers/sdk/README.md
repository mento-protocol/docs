---
description: How to install and use the official mento protocol SDK
---

# SDK

The easiest way to interact with the Mento Protocol core contracts in Typescript/Javascript environments is through the SDK ([@mento-protocol/mento-sdk](https://www.npmjs.com/package/@mento-protocol/mento-sdk)). The SDK provides easy to use abstractions all the way from discovering exchanges and pairs to executing swaps.

## Installation

{% hint style="info" %}
[Ethers v5](https://www.npmjs.com/package/ethers) is required as a peer dependency in order to use the SDK
{% endhint %}

We recommend installing SDK either through `yarn` or `npm`:

```bash
yarn add @mento-protocol/mento-sdk
npm i --save @mento-protocol/mento-sdk
```

## Using the SDK

After you've installed the SDK using your favourite package manager, you can go through the following walkthrough guides:

* [Discovering exchanges and pairs](getting-exchange-pairs.md)
* [Getting price quotes](getting-a-quote.md)
* [Executing swaps](initiating-a-swap.md)

All the codes snippets in the above guides can be found in [mento-sdk-examples](https://github.com/mento-protocol/mento-sdk-examples). We encourage you to clone the repository, and execute the different code snippets as you read through the guides.
