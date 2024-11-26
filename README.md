# Smart Account Demo

A minimal implementation demonstrating ERC-4337 smart accounts using Kernel, Permissionless, and Pimlico's Alto bundler.

## Overview

This repository demonstrates:
- Smart Account implementation using [Kernel](https://github.com/zerodevapp/kernel)
- Integration with [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) and [ERC-7579](https://eips.ethereum.org/EIPS/eip-7579)
- Bundler implementation using Pimlico's [Alto](https://github.com/pimlicolabs/alto)

## Structure
```
packages/  
        ├── contracts/ # Smart contracts and deployment scripts     
        └── bundler/ # Local bundler implementation
```

## Prerequisites

- Node.js >= 16
- Foundry
- Local Ethereum node (Anvil)

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/smart-account-demo
cd smart-account-demo
```

2. Install dependencies:
```bash
cd packages/contracts
make setup
```

3. Run the demo:
```bash
make aa-demo-auto
```

This will:  
- Start a local Anvil node
- Deploy the necessary contracts
- Start the bundler
- Execute a demo transaction using the smart account

## Gas Analysis
Run the gas analysis to compare standard transactions vs UserOperations:
```bash
make gas-bundler-auto
```

## Environment Variables
Copy the example environment file and configure:

```bash
cp packages/contracts/.env.example packages/contracts/.env
```

### Key variables:

- `RPC_LOCAL`: Local node URL
- `BUNDLER_PORT`: Port for the local bundler
- `PRIVATE_KEY_LOCAL`: Test account private key
