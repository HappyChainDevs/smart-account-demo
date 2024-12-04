include ../../makefiles/lib.mk
include ../../makefiles/help.mk

# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

# Set CONFIG to "LOCAL" by default. Other valid values: "TEST" or "MAIN".
CONFIG ?= LOCAL

# Set the list of allowed bundlers based on the current deployment configuration (LOCAL, TEST, etc.)
export ALLOWED_BUNDLERS = $(ALLOWED_BUNDLERS_$(CONFIG))

# Deployment mode:
# - "deploy" — deploy contracts normally
# - "dry" — for a dry-run that doesn't send transactions
# - "resume" — resumes the previous deployment
DEPLOY ?= deploy

# Deployment name, used by `make save-deployment` (will save under deployments/$DEPLOYMENT_NAME).
DEPLOYMENT_NAME ?= $(CONFIG)

# Script to run for deployments, or deployment to save for `make save-deployment`.
DEPLOY_SCRIPT ?= DeployL1Upgradeable.s.sol

LN_FLAGS := $(if $(findstring Darwin,$(shell uname)),-shF,-sfT)

# See README.md for more documentation.

# Location of top-level node_modules relative to the contracts package.
# We need the top-level on with Bun, because it leaves the package-specific ones empty.
NODE_MODULES := ../../node_modules

# The reason for this weird setup is that the IntelliJ solidity plugin will not resolve imports
# if they're not in `lib` and do not have a `src` directory (the `remappings.txt` file is ignored).
setup:
	if [ ! -f .env ]; then cp .env.example .env; fi
	rm -rf lib
	mkdir -p lib/{openzeppelin,oz-upgradeable}
	ln $(LN_FLAGS) ../$(NODE_MODULES)/ExcessivelySafeCall lib/ExcessivelySafeCall
	ln $(LN_FLAGS) ../$(NODE_MODULES)/solady lib/solady
	ln $(LN_FLAGS) ../$(NODE_MODULES)/kernel lib/kernel
	ln $(LN_FLAGS) ../$(NODE_MODULES)/forge-std lib/forge-std
	ln $(LN_FLAGS) ../$(NODE_MODULES)/account-abstraction lib/account-abstraction
	ln $(LN_FLAGS) ../../$(NODE_MODULES)/@openzeppelin/contracts lib/openzeppelin/src
	ln $(LN_FLAGS) ../../$(NODE_MODULES)/@openzeppelin/contracts-upgradeable lib/oz-upgradeable/src
.PHONY: setup

####################################################################################################
# Build

build:
	forge build
.PHONY: build

watch:
	forge test --watch src/
.PHONY: watch

clean:
	forge clean
	rm -rf node_modules/.tmp
.PHONY: clean

nuke: clean
	rm -rf lib
.PHONY: nuke

####################################################################################################
# Testing

test:
	forge test -vv
.PHONY: test

testv:
	forge test -vvvv
.PHONY: testv

test-gas:
	forge test --gas-report
.PHONY: test-gas

gas-paymaster:
	forge test -vv --match-contract GasEstimator --rpc-url $(RPC_LOCAL) --via-ir --optimizer-runs 200 --isolate | awk '/^Logs:/{p=1; next} p && !/^Suite result:/ && !/^Ran [0-9]+ test suite/' | sed 's/^  //' | sed '/^$$/d' > paymaster_gas_report.txt
.PHONY: gas-paymaster

test-aa-gas-flamechart:
	forge test -vv --match-contract GasEstimator --rpc-url $(RPC_LOCAL) --via-ir --optimizer-runs 200 --isolate --flamechart
.PHONY: test-aa-gas-flamechart

test-fork:
	forge test --gas-report --fork-url $(RPC_$(CONFIG))
.PHONY: test-fork

# Please, ensure that all Account Abstraction (AA) contracts are deployed before running the demo.
aa-demo:
	@tsx ./scripts/account_abstraction_demo.ts;
.PHONY: aa-demo

# Run the complete AA demo with all prerequisites
aa-demo-auto:
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@make anvil > /dev/null 2>&1 &
	@sleep 5
	@cast wallet address --account test-account-0 --password-file .password.local | xargs -I {} cast send {} --value 100ether --private-key 2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
	@make deploy-aa CONFIG=LOCAL
	@make save-deployment DEPLOY_SCRIPT=DeployAA.s.sol DEPLOYMENT_NAME=anvil/testing CONFIG=LOCAL
	@cd ../bundler && make build > /dev/null
	@cd ../bundler && make run > /dev/null 2>&1 &
	@sleep 5
	@clear
	@make aa-demo
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@git restore -- deployments/anvil/testing deployments/anvil/mockTokens
.PHONY: aa-demo-auto

# Please, ensure that all Account Abstraction (AA) contracts are deployed before running the demo.
nonce-demo:
	@tsx ./scripts/consecutive_userops_demo.ts
.PHONY: nonce-demo

# Run the consecutive-nonces demo with all prerequisites
nonce-demo-auto:
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@make anvil > /dev/null 2>&1 &
	@sleep 5
	@cast wallet address --account test-account-0 --password-file .password.local | xargs -I {} cast send {} --value 100ether --private-key 2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
	@make deploy-aa CONFIG=LOCAL
	@make save-deployment DEPLOY_SCRIPT=DeployAA.s.sol DEPLOYMENT_NAME=anvil/testing CONFIG=LOCAL
	@cd ../bundler && make build > /dev/null
	@cd ../bundler && make run > /dev/null 2>&1 &
	@sleep 5
	@clear
	@make nonce-demo
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@git restore -- deployments/anvil/testing deployments/anvil/mockTokens
.PHONY: nonce-demo-auto

# Run nonce-demo multiple times until success or max attempts

# This target will:

# Run up to 10 attempts
# Clear the terminal before each attempt
# Show which attempt number we're on
# Stop immediately if any attempt succeeds (exits with code 0)
# Wait 2 seconds between attempts
# Show a failure message if all 10 attempts fail

nonce-demo-retry:
	@for i in {1..10}; do \
		clear; \
		echo "Attempt $$i of 10..."; \
		if make nonce-demo; then \
			echo "\nSuccess on attempt $$i!"; \
			exit 0; \
		fi; \
		echo "\nAttempt $$i failed. Retrying..."; \
		sleep 2; \
	done; \
	echo "\nFailed after 10 attempts"
.PHONY: nonce-demo-retry

# Please, ensure that all Account Abstraction (AA) and Mock Token contracts are deployed before generating the gas report.
gas-bundler:
	@tsx ./scripts/bundler_gas_overhead.ts | awk 'BEGIN {start=0} /Gas Usage for a Single UserOp/ {start=1} {if (start) print}' > bundler_gas_report.txt
.PHONY: gas-bundler

# Run the complete gas bundler test with all prerequisites
gas-bundler-auto:
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@make anvil > /dev/null 2>&1 &
	@sleep 5
	@cast wallet address --account test-account-0 --password-file .password.local | xargs -I {} cast send {} --value 100ether --private-key 2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6
	@make deploy-aa CONFIG=LOCAL
	@make save-deployment DEPLOY_SCRIPT=DeployAA.s.sol DEPLOYMENT_NAME=anvil/testing CONFIG=LOCAL
	@make deploy-mocks CONFIG=LOCAL
	@make save-deployment DEPLOY_SCRIPT=DeployMocks.s.sol DEPLOYMENT_NAME=anvil/mockTokens CONFIG=LOCAL
	@cd ../bundler && make build > /dev/null
	@cd ../bundler && make run > /dev/null 2>&1 &
	@sleep 5
	@make gas-bundler
	@lsof -ti :$(ANVIL_PORT) | xargs kill -9 2>/dev/null || true
	@lsof -ti :$(BUNDLER_PORT) | xargs kill -9 2>/dev/null || true
	@git restore -- deployments/anvil/testing deployments/anvil/mockTokens
.PHONY: gas-bundler-auto

####################################################################################################
# Devnet

# The 1337 chain id matches "localhost" in Wagmi & "Localhost 8545" in MetaMask.
anvil:
	anvil --chain-id 1337 --block-time 2
.PHONY: anvil

####################################################################################################
# Deployment

VERIFY_FLAG := $(if $(findstring true,$(VERIFY_$(CONFIG))),--verify,)
VERIFIER_FLAG := $(if $(findstring true,$(VERIFY_$(CONFIG))),$(VERIFIER_FLAG_$(CONFIG)),)
VERIFIER_URL := $(if $(findstring true,$(VERIFY_$(CONFIG))),$(VERIFIER_URL_$(CONFIG)),)
CHECK_UPGRADE := make validate-upgrade
VIA_IR_FLAG := $(if $(findstring DeployAA,$(DEPLOY_SCRIPT)),--via-ir,)
OPTIMIZER_RUNS_FLAG := $(if $(findstring DeployAA,$(DEPLOY_SCRIPT)),--optimizer-runs 200,)

ifeq ($(DEPLOY),deploy)
	BROADCAST_FLAG := --broadcast
endif

ifeq ($(DEPLOY),dry)
	BROADCAST_FLAG :=
	VERIFY_FLAG :=
endif

ifeq ($(DEPLOY),resume)
	BROADCAST_FLAG := --resume
	CHECK_UPGRADE :=
endif

deploy:
	$(CHECK_UPGRADE)
	$(call run-deploy-script,src/deploy/$(DEPLOY_SCRIPT))
	$(call post-deploy)
.PHONY: deploy

validate-upgrade:
	forge clean && forge build
.PHONY: validate-upgrade

define run-deploy-script
	$(eval __USE_ACC := $(findstring true,$(USE_FOUNDRY_ACCOUNT)))
	$(eval __DEPLOY_FUNC := $(if $(__USE_ACC),run-deploy-script-account,run-deploy-script-key))
	$(call $(__DEPLOY_FUNC),$(1))
endef

define run-deploy-script-key
	forge script $(1) \
		--fork-url $(RPC_$(CONFIG)) \
		--private-key $(PRIVATE_KEY_$(CONFIG)) \
		$(VIA_IR_FLAG) \
		$(OPTIMIZER_RUNS_FLAG) \
		$(BROADCAST_FLAG) \
		$(VERIFY_FLAG) \
		$(VERIFIER_FLAG) \
		$(VERIFIER_URL)
endef

define run-deploy-script-account
	@$(eval DEPLOY_SENDER := `cast wallet address \
		--account $(ACCOUNT_$(CONFIG)) \
		--password-file $(PASSFILE_$(CONFIG))`)
	forge script $(1) \
		--fork-url $(RPC_$(CONFIG)) \
		--account $(ACCOUNT_$(CONFIG)) \
		--password-file $(PASSFILE_$(CONFIG)) \
		--sender $(DEPLOY_SENDER) \
		$(VIA_IR_FLAG) \
		$(OPTIMIZER_RUNS_FLAG) \
		$(BROADCAST_FLAG) \
		$(VERIFY_FLAG) \
		$(VERIFIER_FLAG) \
		$(VERIFIER_URL)
endef

define post-deploy
	@cat out/deployment.json && printf "\n"
	@export CONTRACTS=$$(node-jq '[.[]] | unique' out/abiMap.json) && \
	node-jq '[.[]] | unique[]' out/abiMap.json \
		| xargs -L1 -I'{}' forge inspect {} abi \
		| node-jq --slurp --argjson contracts "$$CONTRACTS" '[$$contracts, .] | transpose | map({ (.[0]): .[1] }) | add' \
		> out/abis.json;

	cat scripts/abi_types_fragment_begin.ts.txt > out/abis.ts
	printf "\n\n" >> out/abis.ts
	printf "const contractToAbi = (" >> out/abis.ts
	cat out/abis.json >> out/abis.ts
	printf ") as const\n\n" >> out/abis.ts
	printf "const aliasToContract = (" >> out/abis.ts
	cat out/abiMap.json >> out/abis.ts
	printf ") as const\n\n" >> out/abis.ts
	printf "export const deployment = (" >> out/abis.ts
	cat out/deployment.json >> out/abis.ts
	printf ") as const\n\n" >> out/abis.ts
	cat scripts/abi_types_fragment_end.ts.txt >> out/abis.ts
endef

post-deploy:
	$(call post-deploy)
.PHONY: post-deploy

####################################################################################################
# Save Deployment Information

save-deployment:
	@mkdir -p deployments/$(DEPLOYMENT_NAME)
	@cp -f out/deployment.json out/abiMap.json out/abis.json out/abis.ts deployments/$(DEPLOYMENT_NAME)
	$(eval __CHAIN_ID := `cast chain-id --rpc-url $(RPC_$(CONFIG))`)
	$(eval __RUN_FILE := broadcast/$(DEPLOY_SCRIPT)/$(__CHAIN_ID)/run-latest.json)
	mkdir -p deployments/$(DEPLOYMENT_NAME)
	@cp $(__RUN_FILE) deployments/$(DEPLOYMENT_NAME)/transactions.json
	@echo "Saved deployment to deployments/$(DEPLOYMENT_NAME)"
.PHONY: save-deployment

####################################################################################################
# Deploy Scripts

deploy-l1:
	make deploy DEPLOY_SCRIPT=DeployL1.s.sol
.PHONY: deploy-l1

deploy-l1up:
	make deploy DEPLOY_SCRIPT=DeployL1Upgradeable.s.sol
.PHONY: deploy-l1up

deploy-aa:
	make deploy DEPLOY_SCRIPT=DeployAA.s.sol
.PHONY: deploy-aa

deploy-random:
	make deploy DEPLOY_SCRIPT=DeployRandom.s.sol
.PHONY: deploy-random

deploy-mocks:
	make deploy DEPLOY_SCRIPT=mocks/DeployMocks.s.sol
.PHONY: deploy-mocks

save-local-aa-deployment:
	make save-deployment DEPLOY_SCRIPT=DeployAA.s.sol DEPLOYMENT_NAME=anvil/testing CONFIG=LOCAL
.PHONY: save-local-aa-deployment

save-local-mocks-deployment:
	make save-deployment DEPLOY_SCRIPT=DeployMocks.s.sol DEPLOYMENT_NAME=anvil/mockTokens CONFIG=LOCAL
.PHONY: save-local-mocks-deployment

save-local-random-deployment:
	make save-deployment DEPLOY_SCRIPT=DeployRandom.s.sol DEPLOYMENT_NAME=anvil/random CONFIG=LOCAL
.PHONY: save-local-random-deployment