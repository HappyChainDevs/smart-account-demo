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

import { createTransferCall } from "./createTransferCall"
import { getRandomAccount } from "./getRandomAccount"

export async function sendUserOp(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, nonce: bigint){
    try{
        
        const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
            account: kernelAccount,
            calls: [createTransferCall(getRandomAccount())],
            // nonce: nonce,
        })
        userOp.nonce = nonce
        userOp.signature = await kernelAccount.signUserOperation({
            ...userOp,
            chainId: happychainTestnet.id,
            signature: "0x", // empty signature
        })
        const hash = (await kernelClient.sendUserOperation(userOp)).toString()
        console.log("Sender",userOp.sender , "\n", 
            "UserOp with hash:", hash.toString(),  "\n", 
             "& nonceHex:", nonce.toString(16),  "\n", 
              "nonceDec", nonce,  "\n")
        return {hash, userOp: userOp}
    }
    catch(err){
        console.error(err)
    }
}