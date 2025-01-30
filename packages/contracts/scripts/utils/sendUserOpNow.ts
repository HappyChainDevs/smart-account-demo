import type { Hex } from "viem"
import { deepHexlify } from "permissionless"
import type {
    SmartAccount,
    UserOperation,
    UserOperationReceipt
} from "viem/account-abstraction"
import { entryPoint07Address } from "viem/account-abstraction"
import { happychainTestnet } from "viem/chains"
import type { SmartAccountClient } from "permissionless"

import { createMintCall } from "./createMintCall"


export async function sendUserOpNow(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, nonce: bigint){
    const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelAccount,
        calls: [createMintCall()],
    })
    const strippedUserOp = {
        sender: userOp.sender,
        nonce: userOp.nonce,
        factory: userOp.factory,
        factoryData: userOp.factoryData,
        callData: userOp.callData,
        callGasLimit: userOp.callGasLimit,
        verificationGasLimit: userOp.verificationGasLimit,
        preVerificationGas: userOp.preVerificationGas,
        maxFeePerGas: userOp.maxFeePerGas,
        maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
        paymaster: userOp.paymaster,
        paymasterVerificationGasLimit: userOp.paymasterVerificationGasLimit,
        paymasterPostOpGasLimit: userOp.paymasterPostOpGasLimit,
        paymasterData: userOp.paymasterData,
        signature: userOp.signature
    }
    userOp.nonce = nonce
    userOp.signature = await kernelAccount.signUserOperation({
        ...userOp,
        chainId: happychainTestnet.id,
        signature: "0x", // empty signature
    })
    strippedUserOp.nonce = nonce
    strippedUserOp.signature = userOp.signature
    const receipt = (await kernelClient.request({
        // @ts-ignore
        method: "pimlico_sendUserOperationNow",
        params: [deepHexlify(strippedUserOp), entryPoint07Address]
    })) as UserOperationReceipt
    
    console.log("Sent: sender",receipt.sender , "\n", 
        "UserOp with hash:", receipt.userOpHash,  "\n", 
         "& nonceHex:", nonce.toString(16),  "\n", 
          "nonceDec", nonce,  "\n")
    return receipt
}