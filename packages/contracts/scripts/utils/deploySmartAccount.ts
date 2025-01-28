import type { SmartAccountClient } from "permissionless"
import type {
    UserOperationReceipt
} from "viem/account-abstraction"
import { createTransferCall } from "./createTransferCall"
import { getRandomAccount } from "./getRandomAccount"      

export async function deploySmartAccount(kernelClient: SmartAccountClient) {
    console.log("[1/3] Deploying Smart Account...")
    const receipt: UserOperationReceipt = await kernelClient.waitForUserOperationReceipt({
        hash: await kernelClient.sendUserOperation({
            account: kernelClient.account,
            calls: [createTransferCall(getRandomAccount())],
        }),
    })
    if (!receipt.success) {
        throw new Error("Smart Account deployment failed")
    }
    console.log("Deployed Account successfully at ", receipt.sender)
}