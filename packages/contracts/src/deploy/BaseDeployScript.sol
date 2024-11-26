// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";

/**
 * @dev Base script to be inherited by other deploy scripts, providing functionality to record
 * information about the deployed contracts. After running the deploy script, this will output
 * two files: out/deployment.json and out/abiMap.json.
 *
 * out/deployment.json maps contract aliases (necessary because the same contract can be deployed
 * multiple times) to the deployed address.
 *
 * out/abiMap.json maps contract aliases to the contract names, which can be used for ABI lookups
 * (the ABIs themselves are generated by the makefile in out/abis.json and are keyed by contract
 * name).
 */
abstract contract BaseDeployScript is Script {
    /// @dev Identifies the deployment JSON to vm.serializeXXX and vm.writeJson functions.
    string internal constant deploymentJsonKey = "deployment_key";

    /// @dev Identifies the abi map JSON to vm.serializeXXX and vm.writeJson functions.
    string internal constant abiMapJsonKey = "abiMap_key";

    /// @dev Serialized deployment JSON.
    string internal deploymentJson = "";

    /// @dev Serialized abi map JSON.
    string internal abiMapJson = "";

    /// @dev Whether the deployment and abim map JSONs should be built.
    /// Can also be used by inheriting scripts for conditional logging.
    bool internal output = true;

    /// @dev Disables ouptutting deployment info and possibly conditional logging.
    function dontOutput() public {
        output = false;
    }

    /**
     * @dev Logs information about a deployed contract given an alias, the contract name and the
     * deployed address.
     *
     * @param contractAlias The alias of the contract, which will be keys in the emitted JSON files.
     * We use this because multiple copies of the same contract can be deployed.
     * @param contractName The name of the contract, to which the contract alias will be mapped in
     * the ABI map. Pass an empty string to signify no ABI mapping is desired.
     * @param deployedAddress The address of the deployed contract.
     */
    function deployed(string memory contractAlias, string memory contractName, address deployedAddress) internal {
        if (output) {
            deploymentJson = vm.serializeAddress(deploymentJsonKey, contractAlias, deployedAddress);
            if (bytes(contractName).length > 0) {
                abiMapJson = vm.serializeString(abiMapJsonKey, contractAlias, contractName);
            }
        }
    }

    /**
     * @dev Same as {@link deployed(string,string,address)} with the contract alias set to the
     * contract name.
     */
    function deployed(string memory contractName, address deployedAddress) internal {
        deployed(contractName, contractName, deployedAddress);
    }

    /**
     * @dev Writes the deployment and abi map JSON to out/deployment.json.
     * Automatically called by `run()`.
     */
    function writeDeploymentJson() internal {
        if (output) {
            vm.writeJson(deploymentJson, "./out/deployment.json");
            vm.writeJson(abiMapJson, "./out/abiMap.json");
        }
    }

    /**
     * @dev This is where the deploy logic goes.
     * vm.startBroadcast() and vm.stopBroadcast() are called before and after this.
     */
    function deploy() internal virtual {}

    /**
     * @dev Runs the deploy logic — called by Foundry.
     * You can override this instead of `deploy` if you need to control the broadcast yourself.
     * Don't forget to call `writeDeploymentJson()`.
     */
    function run() external virtual {
        vm.startBroadcast();
        deploy();
        vm.stopBroadcast();
        writeDeploymentJson();
    }
}
