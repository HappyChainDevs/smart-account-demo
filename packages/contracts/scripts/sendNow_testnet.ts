
import type { Hex } from "viem"
import { createKernelClient } from "./utils/createKernelClient";
import type { SmartAccountClient } from "permissionless"
import { deploySmartAccount } from "./utils/deploySmartAccount"
import {sendUserOpNow} from "./utils/sendUserOpNow"
import { generatePrivateKeys } from "./utils/generatePrivateKeys";

async function runSendNowWithPrivateKey(_privateKey: Hex, _numberOfUserOps: number) {
    console.log("Starting test sendUserOperationNow on testnet...")
    const kernelClient = await createKernelClient(_privateKey)
    await testSendUserOpNow(kernelClient, _numberOfUserOps)
}


async function testSendUserOpNow(kernelClient: SmartAccountClient, numberOfUserOps = 10) {
    
    await deploySmartAccount(kernelClient)

    const currentNonce = await kernelClient.account?.getNonce()
    if(!currentNonce){
        throw new Error("Failed to get nonce")
    }
    for(let i = 0; i < numberOfUserOps; i++){
        const receipt = await sendNow(kernelClient, currentNonce + BigInt(i))
        console.log(`included in block ${(receipt.receipt.blockNumber)}`)
    }

}

async function sendNow(kernelClient: SmartAccountClient, nonce: bigint){
    console.log("sending user op from ", kernelClient.account?.address)
    const now = Date.now()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const receipt = await sendUserOpNow(kernelClient.account!, kernelClient, nonce)
    console.log(`UserOp ${receipt.userOpHash} took ${Date.now() - now}ms, included in block ${receipt.receipt.blockNumber}`)   
    return receipt
}


async function attemptMultipleUserOps() {
    const privateKeys = await generatePrivateKeys(1)
    const clients = []
    for(let i = 0; i < privateKeys.length; i++){
        clients.push(await createKernelClient(privateKeys[i]))
    }
    
    for(let userOpAttempts = 0 ; userOpAttempts < 1; userOpAttempts++){
        const nonces = await Promise.all(clients.map(client => client.account?.getNonce()))
        // now in parallel run the sendUserOpNow function
        const promises = clients.map((client, index) => sendNow(client, nonces[index]!))
        await Promise.all(promises)
    }
}

async function main() {
    const privateKeys = await generatePrivateKeys(10)
    const promises = privateKeys.map(privateKey => runSendNowWithPrivateKey(privateKey, 1))
    await Promise.all(promises)
} 


attemptMultipleUserOps().then(() => {
    console.log("Test completed successfully");
    setTimeout(() => process.exit(0), 100);
}).catch((error) => {   
    console.error(error);
    process.exit(1);
})
