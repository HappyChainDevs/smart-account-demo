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

## Consecutive UserOps Demo

This demo showcases a specific behavior with the Alto bundler regarding consecutive UserOperations. The demo attempts to send two UserOps with consecutive nonces simultaneously.

### Setup

1. Set up a Foundry account for testing following the instructions in [`packages/contracts/README.md`](packages/contracts/README.md#deployment). You'll need to:
   - Import your account using `cast wallet import`
   - Set up the password file
   - Configure the account name in the environment

2. Install dependencies and setup the environment:
```bash
cd packages/contracts
make setup
```

### Running the Demo

Run the consecutive nonce demo:
```bash
make nonce-demo-auto
```

This will:
- Start a local Anvil node
- Deploy the necessary contracts
- Start the bundler
- Execute the consecutive UserOps demo

### Expected Behavior
The demo script ([`packages/contracts/scripts/consecutive_userops_demo.ts`](packages/contracts/scripts/consecutive_userops_demo.ts)) should demonstrate the following sequence:
1. First UserOp with nonce 'n' gets bundled and executed on-chain
2. Second UserOp with nonce 'n+1' gets picked from the internal mempool
3. Second UserOp gets bundled and executed on-chain

### Current Behavior
Currently, while the first UserOp executes successfully, the second UserOp appears to time out with no response from the bundler. This behavior differs from the expected sequence and is the subject of investigation.
