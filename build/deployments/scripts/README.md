# Deployment scripts

## Proxy implementation lookup (EIP-1967)

`get-proxy-implementations.mjs` queries the EIP-1967 implementation storage slot for a list of addresses and prints a JSON map of proxy → implementation.

**Usage**

```bash
# With RPC URL (recommended for Sepolia)
export CELO_RPC_URL="https://forno.celo.org"
export CELO_SEPOLIA_RPC_URL="https://forno.celo-sepolia.celo-testnet.org"   # or your own RPC

# Celo Mainnet (chainId 42220)
node get-proxy-implementations.mjs 42220 < addresses-celo-mainnet.txt

# Celo Sepolia (chainId 11142220)
node get-proxy-implementations.mjs 11142220 < addresses-celo-sepolia.txt
```

Input: one address per line (or comma-separated in `ADDRESSES` env). Output: `{ "0xProxy...": "0xImpl..." }` for each address that has a non-zero implementation in the EIP-1967 slot.
