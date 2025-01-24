// The demo structure is similar to the `account_abstraction_demo.ts" file
// This one contains a case where we try to send 2 userOps with consecutive nonces simultaneously.
// The expected result is :
//      1. userOp with nonce 'n' gets bundled and executed on-chain first
//      2. Now that nonce 'n+1' is valid, the 2nd userOp gets picked from the internal mempool
//      3. 2nd userOp gets bundled and executed on-chain

// What we see: Waiting for the 2nd userOp's receipt results in timeout, no response from the bundler.

import type { Address, Hex, PrivateKeyAccount, PublicClient } from "viem"
import { http, createPublicClient, createWalletClient, parseEther, defineChain } from "viem"
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
import { deployment as happyTestnetDeployment } from "../deployments/happy-sepolia/aa/abis"

// Environment detection

const CONFIG = process.env.CONFIG || 'LOCAL'
console.log(`Running in ${CONFIG} mode`)

const isLocal = CONFIG === 'LOCAL'
console.log(`Running in ${isLocal ? 'LOCAL' : 'TEST'} mode`)

const privateKey = isLocal ? process.env.PRIVATE_KEY_LOCAL as Hex : process.env.PRIVATE_KEY_TEST as Hex
const bundlerRpc = isLocal ? process.env.BUNDLER_LOCAL : process.env.BUNDLER_TEST
const rpcURL = isLocal ? process.env.RPC_LOCAL : process.env.RPC_TEST
if (!privateKey || !bundlerRpc || !rpcURL) {
    throw new Error("Missing environment variables")
}
const chain = isLocal ? localhost : defineChain({
    name: "sepolia",
    id: 216,
    rpcUrls: {
        default: {
            http: [rpcURL!]
        }
    },
    nativeCurrency: {
        name: "HAPPY",
        symbol: "HAPPY",
        decimals: 18,
    },

})

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
        ecdsaValidatorAddress: isLocal ? localDeployment.ECDSAValidator : happyTestnetDeployment.ECDSAValidator,
        accountLogicAddress: isLocal ? localDeployment.Kernel : happyTestnetDeployment.Kernel,
        factoryAddress: isLocal ? localDeployment.KernelFactory : happyTestnetDeployment.KernelFactory,
        metaFactoryAddress: isLocal ? localDeployment.FactoryStaker : happyTestnetDeployment.FactoryStaker,
    })
}

const PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY = 45000n
const PAYMASTER_POST_OP_GAS_LIMIT = 1n // Set to 1 since the postOp function is never called
const PAYMASTER_DATA = "0x" as const

function getKernelClient(kernelAccount: SmartAccount): SmartAccountClient & Erc7579Actions<SmartAccount> {
    const paymasterAddress = isLocal ? localDeployment.HappyPaymaster : happyTestnetDeployment.HappyPaymaster

    const kernelClientBase = createSmartAccountClient({
        account: kernelAccount,
        chain,
        bundlerTransport: http(bundlerRpc),
        paymaster: {
            async getPaymasterData(parameters: GetPaymasterDataParameters) {
                
                return {
                    paymaster: paymasterAddress,
                    paymasterData: PAYMASTER_DATA, // Only required for extra context, no need to encode paymaster gas values manually
                    paymasterPostOpGasLimit: PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY,
                    paymasterVerificationGasLimit: PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY
                }
            },
            async getPaymasterStubData(parameters: GetPaymasterStubDataParameters) {
                return {
                    paymaster: paymasterAddress,
                    paymasterData: PAYMASTER_DATA,
                    paymasterPostOpGasLimit: PAYMASTER_POST_OP_GAS_LIMIT,
                    paymasterVerificationGasLimit: PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY,
                }
            },
        },
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
    const paymasterAddress = isLocal ? localDeployment.HappyPaymaster : happyTestnetDeployment.HappyPaymaster
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
const NUMBER_OF_USEROPS = 10

function createTransferCall(address: Address): UserOperationCall {
    return {
        to: address,
        value: AMOUNT,
        data: "0x",
    }
}

async function testConsecutiveUserOps(kernelAccount: SmartAccount, kernelClient: SmartAccountClient) {
    const sender = (privateKeyToAccount(privateKey)).address
    console.log("balance of sender:", await publicClient.getBalance({address: sender}))
    console.log("[TEST] Consecutive UserOps with Root Validator")
    console.log("-".repeat(50))

    console.log("[1/4] Deploying Smart Account...")
    const receipt: UserOperationReceipt = await kernelClient.waitForUserOperationReceipt({
        hash: await kernelClient.sendUserOperation({
            account: kernelAccount,
            calls: [createTransferCall(getRandomAccount())],
        }),
    })
    if (!receipt.success) {
        throw new Error("Smart Account deployment failed")
    }

    console.log("     Deployed successfully")
    console.log("\n[3/4] Sending UserOps...")
    const hashes = []
    const currentNonce = await kernelClient.account?.getNonce()
    if(!currentNonce){
        throw new Error("Failed to get nonce")
    }
    console.log("     Current nonce:", currentNonce)  
    for(let i = 0; i < 5; i++){
        const hash = await sendUserOp(kernelAccount, kernelClient, currentNonce + BigInt(i))
        hashes.push(hash)
        
    }
    console.log("\n[4/4] Awaiting receipts...")

    const statuses = await Promise.all(hashes.map(hash => pollForCompletion(hash)))

    for(let i = 0; i < statuses.length; i++){
        console.log(`UserOp ${i} status: ${statuses[i]}`)
    }

    
}

async function sendUserOp(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, nonce: bigint){
    
    const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelAccount,
        calls: [createTransferCall(getRandomAccount())],
    })
    userOp.nonce = nonce
    console.log("     UserOp nonce:", userOp.nonce.toString())
    userOp.signature = await kernelAccount.signUserOperation({
        ...userOp,
        chainId: chain.id,
        signature: EMPTY_SIGNATURE,
    })
    const hash = (await kernelClient.sendUserOperation(userOp)).toString()
    console.log("     UserOp send with hash:", hash.toString())
    return hash
}

async function pollForCompletion(hash: Hex){
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



async function main() {
    console.log("Starting consecutive userOps demo...")
    const SCAaccount = privateKeyToAccount(privateKey)
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
