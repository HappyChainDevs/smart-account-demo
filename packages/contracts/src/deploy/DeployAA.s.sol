// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.0; // solhint-disable-line

import {BaseDeployScript} from "./BaseDeployScript.sol";
import {ENTRYPOINT_V7_CODE} from "./initcode/EntryPointV7Code.sol";
import {ENTRYPOINT_SIMULATIONS_CODE} from "./initcode/EntryPointSimulationsCode.sol";

import {HappyPaymaster} from "../HappyPaymaster.sol";
import {SessionKeyValidator} from "../SessionKeyValidator.sol";

import {Kernel} from "kernel/Kernel.sol";
import {KernelFactory} from "kernel/factory/KernelFactory.sol";
import {FactoryStaker} from "kernel/factory/FactoryStaker.sol";
import {ECDSAValidator} from "kernel/validator/ECDSAValidator.sol";
import {IEntryPoint} from "kernel/interfaces/IEntryPoint.sol";

// To ensure ABI generation.
import {EntryPoint} from "account-abstraction/contracts/core/EntryPoint.sol"; /* solhint-disable-line */
import {EntryPointSimulations} from "account-abstraction/contracts/core/EntryPointSimulations.sol"; /* solhint-disable-line */

contract DeployAAContracts is BaseDeployScript {
    bytes32 public constant DEPLOYMENT_SALT = bytes32(uint256(3));
    address public constant CREATE2_PROXY = 0x4e59b44847b379578588920cA78FbF26c0B4956C;
    address public constant EXPECTED_ENTRYPOINT_V7 = 0x0000000071727De22E5E9d8BAf0edAc6f37da032;
    address public constant EXPECTED_ENTRYPOINT_SIMULATIONS = 0xBbe8A301FbDb2a4CD58c4A37c262ecef8f889c47;

    error EntryPointDeploymentFailed();
    error EntryPointSimulationsDeploymentFailed();

    ECDSAValidator public validator;
    Kernel public kernel;
    KernelFactory public factory;
    FactoryStaker public staker;
    HappyPaymaster public paymaster;
    SessionKeyValidator public sessionKeyValidator;

    function deploy() internal override {
        if (EXPECTED_ENTRYPOINT_SIMULATIONS.code.length == 0) {
            // solhint-disable-next-line
            (bool success,) = CREATE2_PROXY.call(ENTRYPOINT_SIMULATIONS_CODE);
            if (!success) {
                revert EntryPointSimulationsDeploymentFailed();
            }
        }
        deployed("EntryPointSimulations", EXPECTED_ENTRYPOINT_SIMULATIONS);

        if (EXPECTED_ENTRYPOINT_V7.code.length == 0) {
            // solhint-disable-next-line
            (bool success,) = CREATE2_PROXY.call(ENTRYPOINT_V7_CODE);
            if (!success) {
                revert EntryPointDeploymentFailed();
            }
        }
        deployed("EntryPointV7", "EntryPoint", EXPECTED_ENTRYPOINT_V7);

        validator = new ECDSAValidator{salt: DEPLOYMENT_SALT}();
        deployed("ECDSAValidator", address(validator));

        kernel = new Kernel{salt: DEPLOYMENT_SALT}(IEntryPoint(EXPECTED_ENTRYPOINT_V7));
        deployed("Kernel", address(kernel));

        factory = new KernelFactory{salt: DEPLOYMENT_SALT}(address(kernel));
        deployed("KernelFactory", address(factory));

        staker = new FactoryStaker{salt: DEPLOYMENT_SALT}(msg.sender);
        deployed("FactoryStaker", address(staker));

        staker.approveFactory(factory, true);

        string memory key = "ALLOWED_BUNDLERS";
        string memory delimiter = ",";
        address[] memory allowedBundlers = vm.envAddress(key, delimiter);

        paymaster = new HappyPaymaster{salt: DEPLOYMENT_SALT}(EXPECTED_ENTRYPOINT_V7, allowedBundlers);
        deployed("HappyPaymaster", address(paymaster));

        sessionKeyValidator = new SessionKeyValidator{salt: DEPLOYMENT_SALT}();
        deployed("SessionKeyValidator", address(sessionKeyValidator));
    }
}
