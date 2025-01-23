import type { SmartAccountClient } from "permissionless"
import type { Hex } from "viem"
import type { SmartAccount, UserOperationReceipt, UserOperation } from "viem/account-abstraction"
import { createMintCall, depositPaymaster, fundSmartAccount } from "./utils/accounts"
import { account, pimlicoClient, publicClient } from "./utils/clients"
import { getKernelAccount, getKernelClient } from "./utils/kernel"
import { localhost } from "viem/chains"

const EMPTY_SIGNATURE = "0x"

async function testConsecutiveUserOps(kernelClient: SmartAccountClient) {
    console.log("[TEST] Consecutive UserOps with Root Validator")
    console.log("-".repeat(50))

    console.log("[1/4] Deploying Smart Account...")
    const receipt: UserOperationReceipt = await kernelClient.waitForUserOperationReceipt({
        hash: await kernelClient.sendUserOperation({
            account: kernelClient.account!,
            calls: [createMintCall()],
        }),
    })
    if (!receipt.success) {
        throw new Error("Smart Account deployment failed")
    }
    console.log("     Deployed successfully")

    console.log("\n[2/4] Preparing UserOps...")
    const userOp1: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelClient.account!,
        calls: [createMintCall()],
    })
    userOp1.signature = await kernelClient.account!.signUserOperation({
        ...userOp1,
        chainId: localhost.id,
        signature: EMPTY_SIGNATURE,
    })

    const userOp2: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelClient.account!,
        calls: [createMintCall()],
    })
    userOp2.nonce = userOp1.nonce + 1n
    userOp2.signature = await kernelClient.account!.signUserOperation({
        ...userOp2,
        chainId: localhost.id,
        signature: EMPTY_SIGNATURE,
    })
    console.log("     UserOp1 nonce:", userOp1.nonce.toString())
    console.log("     UserOp2 nonce:", userOp2.nonce.toString())

    console.log("\n[3/4] Sending UserOps...")
    const hash1 = await kernelClient.sendUserOperation(userOp1)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const hash2 = await kernelClient.sendUserOperation(userOp2)
    // const [hash1, hash2] = await Promise.all([
    //     kernelClient.sendUserOperation(userOp1),
    //     kernelClient.sendUserOperation(userOp2),
    // ])
    console.log("     Both UserOps sent")
    console.log("     UserOp1 hash:", hash1.toString())
    console.log("     UserOp2 hash:", hash2.toString())

    console.log("\n[4/4] Awaiting receipts...")
    // const receipts = await Promise.all([
    //     pimlicoClient.waitForUserOperationReceipt({hash: hash1}),
    //     pimlicoClient.waitForUserOperationReceipt({hash: hash2}),
    // ])
    // console.log("\n[RESULTS]")
    // console.log("-".repeat(50))
    // console.log("UserOp1: Block", receipts[0].receipt.blockNumber, "| TxIndex:", receipts[0].receipt.transactionIndex)
    // console.log("UserOp2: Block", receipts[1].receipt.blockNumber, "| TxIndex:", receipts[1].receipt.transactionIndex)

    const pollForCompletion = async (hash: Hex) => {
        while (true) {
            const {status,} = await pimlicoClient.getUserOperationStatus({ hash })
            console.log(`Status for ${hash}: ${status}`)
            
            // Check if we've reached a final state
            // (Can add 'not_found' to the list as well)
            if (['included', 'failed', 'rejected'].includes(status)) {
                return status
            }
            
            // Wait before polling again
            await new Promise(resolve => setTimeout(resolve, 1000))
        }
    }

    const [status1, status2] = await Promise.all([
        pollForCompletion(hash1),
        pollForCompletion(hash2)
    ])

    console.log('\nFinal statuses:')
    console.log(`UserOp 1 (${hash1}): ${status1}`)
    console.log(`UserOp 2 (${hash2}): ${status2}`)
}

async function main() {
    const kernelAccount: SmartAccount = await getKernelAccount(publicClient, account)
    const kernelClient = getKernelClient(kernelAccount)

    if ((await fundSmartAccount(kernelAccount.address)) === "reverted") {
        throw new Error("Funding SmartAccount failed")
    }

    if ((await depositPaymaster()) === "reverted") {
        throw new Error("Paymaster Deposit failed")
    }

    try {
        await testConsecutiveUserOps(kernelClient)
    } catch (error) {
        console.error("Root Validator: ", error)
    }

    
}

main()
    .then(() => {
        console.log("Demo completed successfully")
        setTimeout(() => process.exit(0), 100)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })