import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"
import type { Hex } from "viem"
import { createKernelClient } from "./utils/createKernelClient";
import type { SmartAccountClient } from "permissionless"
import * as fs from 'node:fs';
import { deploySmartAccount } from "./utils/deploySmartAccount"
import {sendUserOpNow} from "./utils/sendUserOpNow"

const NUM_ACCOUNTS = 5

async function generatePrivateKeys(count: number): Promise<Hex[]> {
    const privateKeys: Hex[] = [];
    for (let i = 0; i < count; i++) {
        const privateKey = generatePrivateKey();
        const address = privateKeyToAddress(privateKey);
        privateKeys.push(privateKey);
    }
    return privateKeys;
}

async function runSendNowWithPrivateKey(_privateKey: Hex, _numberOfUserOps: number) {
    console.log("Starting test sendUserOperationNow on testnet...")
    const kernelClient = await createKernelClient(_privateKey)
    await testSendUserOpNow(kernelClient, _numberOfUserOps)
}


async function testSendUserOpNow(kernelClient: SmartAccountClient, numberOfUserOps = 10) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const kernelAccount = kernelClient.account!
    await deploySmartAccount(kernelClient)

    const currentNonce = await kernelClient.account?.getNonce()
    if(!currentNonce){
        throw new Error("Failed to get nonce")
    }
    
    for(let i = 0; i < numberOfUserOps; i++){
        const now = Date.now()
        const res = await sendUserOpNow(kernelAccount, kernelClient, currentNonce + BigInt(i))
        console.log(`UserOp ${res.hash} took ${Date.now() - now}ms`)
    }

}

async function main() {
    const privateKeys = await generatePrivateKeys(NUM_ACCOUNTS)
    const promises = privateKeys.map(privateKey => runSendNowWithPrivateKey(privateKey, 10))
    await Promise.all(promises)
} 
main().then(() => {
    console.log("Test completed successfully");
    setTimeout(() => process.exit(0), 100);
}).catch((error) => {   
    console.error(error);
    process.exit(1);
})
