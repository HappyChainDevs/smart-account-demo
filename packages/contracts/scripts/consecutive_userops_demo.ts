// The demo structure is similar to the `account_abstraction_demo.ts" file
// This one contains a case where we try to send 2 userOps with consecutive nonces simultaneously.
// The expected result is :
//      1. userOp with nonce 'n' gets bundled and executed on-chain first
//      2. Now that nonce 'n+1' is valid, the 2nd userOp gets picked from the internal mempool
//      3. 2nd userOp gets bundled and executed on-chain

// What we see: Waiting for the 2nd userOp's receipt results in timeout, no response from the bundler.

import type { Address, Hex, PrivateKeyAccount, PublicClient } from "viem"
import { http, createPublicClient, createWalletClient, parseEther } from "viem"
import type {
    GetPaymasterDataParameters,
    GetPaymasterStubDataParameters,
    SmartAccount,
    UserOperation,
    UserOperationCall,
    UserOperationReceipt,
} from "viem/account-abstraction"
import { entryPoint07Address } from "viem/account-abstraction"
import { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } from "viem/accounts"
import { localhost, sepolia } from "viem/chains"

import { type SmartAccountClient, createSmartAccountClient } from "permissionless"
import { toEcdsaKernelSmartAccount } from "permissionless/accounts"
import { type Erc7579Actions, erc7579Actions } from "permissionless/actions/erc7579"
import { createPimlicoClient } from "permissionless/clients/pimlico"

import { abis, deployment as localDeployment } from "../deployments/anvil/testing/abis"
import { deployment as sepoliaDeployment } from "../deployments/sepolia/aa/abis"

// Environment detection
const CONFIG = process.env.CONFIG || 'LOCAL'
const isLocal = CONFIG === 'LOCAL'

const privateKey = isLocal ? process.env.PRIVATE_KEY_LOCAL as Hex : process.env.PRIVATE_KEY_TEST as Hex
const bundlerRpc = isLocal ? process.env.BUNDLER_LOCAL : process.env.BUNDLER_TEST
const rpcURL = isLocal ? process.env.RPC_LOCAL : process.env.RPC_TEST
const chain = isLocal ? localhost : sepolia

if (!privateKey || !bundlerRpc || !rpcURL) {
    throw new Error("Missing environment variables")
}

const account = privateKeyToAccount(privateKey)

const walletClient = createWalletClient({
    account,
    chain,
    transport: http(rpcURL),
})

const publicClient = createPublicClient({
    chain,
    transport: http(rpcURL),
})

const pimlicoClient = createPimlicoClient({
    chain,
    transport: http(bundlerRpc),
    entryPoint: {
        address: entryPoint07Address,
        version: "0.7",
    },
})

function getRandomAccount() {
    return privateKeyToAddress(generatePrivateKey()).toString() as Hex
}

async function getKernelAccount(client: PublicClient, account: PrivateKeyAccount): Promise<SmartAccount> {
    return toEcdsaKernelSmartAccount({
        client,
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
        owners: [account],
        version: "0.3.1",
        ecdsaValidatorAddress: isLocal ? localDeployment.ECDSAValidator : sepoliaDeployment.ECDSAValidator,
        accountLogicAddress: isLocal ? localDeployment.Kernel : sepoliaDeployment.Kernel,
        factoryAddress: isLocal ? localDeployment.KernelFactory : sepoliaDeployment.KernelFactory,
        metaFactoryAddress: isLocal ? localDeployment.FactoryStaker : sepoliaDeployment.FactoryStaker,
    })
}

function getKernelClient(kernelAccount: SmartAccount): SmartAccountClient & Erc7579Actions<SmartAccount> {
    const paymasterAddress = isLocal ? localDeployment.HappyPaymaster : sepoliaDeployment.HappyPaymaster

    const kernelClientBase = createSmartAccountClient({
        account: kernelAccount,
        chain,
        bundlerTransport: http(bundlerRpc),
        
        userOperation: isLocal ? {
            estimateFeesPerGas: async () => {
                return await publicClient.estimateFeesPerGas()
            },
        } : {
            estimateFeesPerGas: async () => {
                return (await pimlicoClient.getUserOperationGasPrice()).fast
            },
        },
    })

    const extendedClient = kernelClientBase.extend(erc7579Actions())
    return extendedClient as typeof kernelClientBase & typeof extendedClient
}

async function fund_smart_account(accountAddress: Address): Promise<string> {
    const txHash = await walletClient.sendTransaction({
        account: account,
        to: accountAddress,
        chain,
        value: parseEther("0.1"),
    })

    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    })

    return receipt.status
}

async function deposit_paymaster(): Promise<string> {
    const paymasterAddress = isLocal ? localDeployment.HappyPaymaster : sepoliaDeployment.HappyPaymaster
    const txHash = await walletClient.writeContract({
        address: entryPoint07Address,
        abi: abis.EntryPointV7,
        functionName: "depositTo",
        args: [paymasterAddress],
        value: parseEther("0.1"),
    })

    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    })

    return receipt.status
}

const AMOUNT = parseEther("0")
const EMPTY_SIGNATURE = "0x"

function createTransferCall(address: Address): UserOperationCall {
    return {
        to: address,
        value: AMOUNT,
        data: "0x",
    }
}

async function testConsecutiveUserOps(kernelAccount: SmartAccount, kernelClient: SmartAccountClient) {
    console.log("[TEST] Consecutive UserOps with Root Validator")
    console.log("-".repeat(50))

    console.log("[1/4] Deploying Smart Account...")
    if (isLocal) { // Remove this if-check when trying with new private key on sepolia
        const receipt: UserOperationReceipt = await kernelClient.waitForUserOperationReceipt({
            hash: await kernelClient.sendUserOperation({
                account: kernelAccount,
                calls: [createTransferCall(getRandomAccount())],
            }),
        })
        if (!receipt.success) {
            throw new Error("Smart Account deployment failed")
        }
    }
    console.log("     Deployed successfully")

    console.log("\n[2/4] Preparing UserOps...")
    const userOp1: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelAccount,
        calls: [createTransferCall(getRandomAccount())],
    })
    userOp1.signature = await kernelAccount.signUserOperation({
        ...userOp1,
        chainId: chain.id,
        signature: EMPTY_SIGNATURE,
    })

    const userOp2: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelAccount,
        calls: [createTransferCall(getRandomAccount())],
    })
    userOp2.nonce = userOp1.nonce + 1n
    userOp2.signature = await kernelAccount.signUserOperation({
        ...userOp2,
        chainId: chain.id,
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
            const {status, transactionHash} = await pimlicoClient.getUserOperationStatus({ hash })
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
    console.log("Starting consecutive userOps demo...")
    const SCAaccount = privateKeyToAccount(privateKey) // Create a new account every time
    const kernelAccount = await getKernelAccount(publicClient, SCAaccount)
    const kernelClient = getKernelClient(kernelAccount)
    const kernelAddress = kernelAccount.address
    console.log(`Kernel account address: ${kernelAddress}`)

    if (isLocal) {
        const prefundRes = await fund_smart_account(kernelAccount.address)
        if (prefundRes !== "success") {
            throw new Error("Funding SmartAccount failed")
        }
        const depositRes = await deposit_paymaster()
        if (depositRes !== "success") {
            throw new Error("Paymaster Deposit failed")
        }
    }

    await testConsecutiveUserOps(kernelAccount, kernelClient)
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