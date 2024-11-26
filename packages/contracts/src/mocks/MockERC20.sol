// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.20;

import {MockERC20} from "forge-std/mocks/MockERC20.sol";

/**
 * @notice This is a mock contract for the $HAPPY token, derived from MockERC20 for testing purposes.
 * It SHOULD NOT be used in production.
 */
contract MockERC20Token is MockERC20 {
    constructor(string memory name, string memory symbol, uint8 decimals) {
        initialize(name, symbol, decimals);
    }

    /**
     * @notice Mints tokens to a specified account.
     * @param _account The account receiving minted tokens.
     * @param _amount  The amount of tokens to mint.
     */
    function mint(address _account, uint256 _amount) public {
        _mint(_account, _amount);
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     * @param amount The amount of tokens to burn.
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
