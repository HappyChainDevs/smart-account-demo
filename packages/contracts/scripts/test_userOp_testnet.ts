// script runs as a test for consecutive userOps using sendUserOperation on the testnet

import type { Hex} from "viem"
import type { SmartAccountClient } from "permissionless"
import { deploySmartAccount } from "./utils/deploySmartAccount"
import { pollForCompletion } from "./utils/pollForCompletion"
import {createKernelClient} from "./utils/createKernelClient"
import {sendUserOp} from "./utils/sendUserOp"
import { getPimlicoClient } from "./utils/getPimlicoClient";



// Environment detection
const privateKey = process.env.PRIVATE_KEY_TEST as Hex
const bundlerRpc = "http:localhost:49531"//"https://bundler-staging.happy.tech"
const NUMBER_OF_USEROPS = 8

if (!privateKey || !bundlerRpc) {
    throw new Error("Missing environment variables")
}

async function testUserOps(kernelClient: SmartAccountClient, numberOfUserOps: number = NUMBER_OF_USEROPS) {
    console.log("[TEST] Consecutive UserOps with Root Validator")
    console.log("-".repeat(50))
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const kernelAccount = kernelClient.account!
    await deploySmartAccount(kernelClient)

    console.log("     Deployed successfully")
    console.log("\n[2/3] Sending UserOps...")
    const userOpsAndHashes = []
    const currentNonce = await kernelClient.account?.getNonce()
    if(!currentNonce){
        throw new Error("Failed to get nonce")
    }
    console.log("     Current nonce:", currentNonce)  
    for(let i = 0; i < numberOfUserOps; i++){
        userOpsAndHashes.push(await sendUserOp(kernelAccount, kernelClient, currentNonce + BigInt(i)))
    }
    console.log("\n[3/3] Awaiting receipts...")

    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const statuses = await Promise.all(userOpsAndHashes.map(userOpAndHash => pollForCompletion(userOpAndHash!.hash as Hex, getPimlicoClient())))


    console.log("Completed sending and awaiting receipts")
}
async function runWithPrivateKey(_privateKey: Hex, _numberOfUserOps: number = NUMBER_OF_USEROPS) {
    console.log("Starting test userOps on testnet...")
    const kernelClient = await createKernelClient(_privateKey)
    await testUserOps(kernelClient, _numberOfUserOps)
}

export async function runWithPrivateKeys(privateKeys: Hex[]) {
    const promises = privateKeys.map(privateKey => runWithPrivateKey(privateKey))
    await Promise.all(promises)
}
