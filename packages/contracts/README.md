# Contracts

## Configuration

Run `make setup` and customize `.env` if necessary.

By default:
- `PRIVATE_KEY_LOCAL` is set the to the first Anvil devnet account (seeded by ETH)

## Makefile Commands

### Lifecycle

- `cd ../.. && make setup` — initialize libraries and npm packages
- `make setup` — sets up symlinks & copies `.env.example` to `.env` if `.env` does not exist
- `make build` — build your project
- `make watch` — watch files and re-run tests on temp local devnet
- `make clean` — remove compiled files

### Testing

- `make test` — run tests on temp local devnet
- `make test-gas` — run tests and show gas report on temp local devnet
- `make test-fork` — run tests and show gas report using `$(RPC_$(CONFIG))` as RPC endpoint

### Deployment

- `make anvil` — run local Anvil devnet on port 1337
----
- `make deploy` — executes a deploy script to deploy contracts to the chain, with many options (env variables):
  - `$CONFIG` — the configuration to use (one of `LOCAL` (default), `TEST`, `MAIN`)
  - `$(RPC_($CONFIG))` (e.g. `$RPC_LOCAL`) — the RPC endpoint to use in the given config
  - `$(USE_FOUNDRY_ACCOUNT)` — whether to use Foundry accounts (otherwise, use env variable keys)
  - If using Foundry accounts:
    - `$(ACCOUNT_$(CONFIG))` — the name of the account to use in the given config
    - `$(PASSFILE_$(CONFIG))` — the path to a file containing the password for the account
  - Otherwise:
    - `$(PRIVATE_KEY_$(CONFIG))` — the private key to use for the given config
----
- `make save-deployment` — saves information related to the latest deployment to `deployment/$DEPLOYMENT_NAME`:
  - a mapping of contract aliases to addresses in `deployment.json`
    - The aliases are specified in the deploy script, they're necessary because we could deploy multiple copy of the same contract.
    - We also want to be able to map to a different ABI in the case of proxys.
  - a mapping of contract aliases to contract names in `abiMap.json`
  - a mapping of contract names to their ABIs in `abis.json`
  - `$DEPLOYMENT_NAME` defaults to `$CONFIG`
  - also reads `$DEPLOY_SCRIPT` and `$(RPC_$(CONFIG))` to know which deployment to save

Note that we don't currently support verification of contracts separate from deployment. This
requires knowing the constructor arguments, and these are not saved automatically — we would have to
log them from the deploy script.

To use Foundry accounts, run:
```sh
cast wallet import <account-name> --interactive
```

Then copy your private key in, set a password (don't reuse), and save the password in
`.password.local` (or any other file that you specify in `$(PASSFILE_$(CONFIG))`. Set the account
name in `$(ACCOUNT_$(CONFIG))`.

Full example for the `LOCAL` config with the first Anvil key:
```sh
cast wallet import test-account-0 --interactive
echo "password" > .password.local

# save in .env:
ACCOUNT_LOCAL=test-account-0
PASSFILE_LOCAL=.password.local
USE_FOUNDRY_ACCOUNT=true
```

## Dependency Management

A note on [remappings](./remappings.txt) and these symlinks: we make sure that all libraries exist
under `lib` and that the contracts are resolved from their `src` directory.

This is because the IntelliJ IDEA plugin for Solidity will always resolve `my-library/Contract.sol`
to `lib/my-library/src/Contract.sol`. It understands remappings, but whenever the name of the
remapping clashes with a directory under `lib`, it will ignore the remapping in favour of the
directory interpration that requires a `src` component.

Foundry itself (as well as the VS Code Solidity extension) can resolve `my-library/Contract.sol` to
either `lib/my-library/Contract.sol` or `lib/my-library/src/Contract.sol`.

Note that when using remappings (For IntelliJ IDEA, when they are not ignored), no tool will
implicit search in a `src` directory unless explicitly specified in the remapping or the import
path.
