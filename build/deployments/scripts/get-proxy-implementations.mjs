#!/usr/bin/env node
/**
 * Query EIP-1967 proxy implementation slot for a list of addresses.
 * Usage: CELO_RPC_URL=https://... node get-proxy-implementations.mjs <chainId>
 * chainId: 42220 (Celo Mainnet) or 11142220 (Celo Sepolia)
 * Reads addresses from stdin (one per line) or from ADDRESSES env (comma-separated).
 * Outputs JSON: { "0x...": "0ximpl..." } for each proxy that has implementation.
 */

const EIP1967_IMPL_SLOT = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';

const RPC_URLS = {
  '42220': process.env.CELO_RPC_URL || 'https://forno.celo.org',
  '11142220': process.env.CELO_SEPOLIA_RPC_URL || 'https://forno.celo-sepolia.celo-testnet.org',
};

function parseImplSlot(hex) {
  if (!hex || hex === '0x' || hex === '0x0') return null;
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  const padded = h.padStart(64, '0');
  const last40 = padded.slice(-40);
  if (last40 === '0'.repeat(40)) return null;
  return '0x' + last40.toLowerCase();
}

async function getStorageAt(rpcUrl, address, slot, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getStorageAt',
          params: [address, slot, 'latest'],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      return data.result;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const chainId = process.argv[2] || '42220';
  const rpcUrl = RPC_URLS[chainId];
  if (!rpcUrl) {
    console.error('Usage: CELO_RPC_URL=... node get-proxy-implementations.mjs [42220|11142220]');
    process.exit(1);
  }

  let addresses = [];
  if (process.env.ADDRESSES) {
    addresses = process.env.ADDRESSES.split(',').map((a) => a.trim()).filter(Boolean);
  } else {
    const stdin = await import('fs').then((f) => f.readFileSync(0, 'utf8'));
    addresses = stdin.split('\n').map((a) => a.trim()).filter((a) => /^0x[a-fA-F0-9]{40}$/.test(a));
  }

  const out = {};
  for (let i = 0; i < addresses.length; i++) {
    const addr = addresses[i];
    const a = addr.startsWith('0x') ? addr : '0x' + addr;
    try {
      const storage = await getStorageAt(rpcUrl, a, EIP1967_IMPL_SLOT);
      const impl = parseImplSlot(storage);
      if (impl) out[a] = impl;
    } catch (e) {
      console.error(`# ${a}: ${e.message}`);
    }
    if (i < addresses.length - 1) await sleep(100);
  }
  console.log(JSON.stringify(out, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
