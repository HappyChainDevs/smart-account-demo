// script runs as a test for consecutive userOps on the testnet

import type { Address, Hex, PrivateKeyAccount, PublicClient } from "viem"
import { http, createPublicClient, parseEther, defineChain, createClient } from "viem"
import { deepHexlify } from "permissionless"
import type {
    GetPaymasterDataParameters,
    GetPaymasterStubDataParameters,
    SmartAccount,
    UserOperation,
    UserOperationCall,
    UserOperationReceipt
} from "viem/account-abstraction"
import { entryPoint07Address } from "viem/account-abstraction"
import { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } from "viem/accounts"
import { type SmartAccountClient, createSmartAccountClient } from "permissionless"
import { toEcdsaKernelSmartAccount } from "permissionless/accounts"
import { type Erc7579Actions, erc7579Actions } from "permissionless/actions/erc7579"
import { createPimlicoClient } from "permissionless/clients/pimlico"
import { deployment as happyTestnetDeployment } from "../deployments/happy-sepolia/aa/abis"
import * as fs from 'node:fs';

// Environment detection
const privateKey = process.env.PRIVATE_KEY_TEST as Hex
const bundlerRpc = "http:localhost:49531"//"https://bundler-staging.happy.tech"
const rpcURL = "https://happy-testnet-sepolia.rpc.caldera.xyz/http"
const PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY = 45000n
const PAYMASTER_POST_OP_GAS_LIMIT = 1n // Set to 1 since the postOp function is never called
const PAYMASTER_DATA = "0x" as const
const AMOUNT = parseEther("0")
const EMPTY_SIGNATURE = "0x"
const NUMBER_OF_USEROPS = 8

const userOpTimingMap = new Map<string, {sendTimestamp: number , finalStatusTime: number}>()

if (!privateKey || !bundlerRpc || !rpcURL) {
    throw new Error("Missing environment variables")
}
export const happychain = defineChain({
    name: "happychain",
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

const publicClient = createPublicClient({
    chain: happychain,
    transport: http(rpcURL),
})

const pimlicoClient = createPimlicoClient({
    chain: happychain,
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
        ecdsaValidatorAddress: happyTestnetDeployment.ECDSAValidator,
        accountLogicAddress: happyTestnetDeployment.Kernel,
        factoryAddress: happyTestnetDeployment.KernelFactory,
        metaFactoryAddress: happyTestnetDeployment.FactoryStaker,
    })
}


function getKernelClient(kernelAccount: SmartAccount): SmartAccountClient & Erc7579Actions<SmartAccount> {
    const paymasterAddress = happyTestnetDeployment.HappyPaymaster

    const kernelClientBase = createSmartAccountClient({
        account: kernelAccount,
        chain: happychain,
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
        userOperation: {
            estimateFeesPerGas: async () => {
                return (await pimlicoClient.getUserOperationGasPrice()).fast
            },
        },
    })

    const extendedClient = kernelClientBase.extend(erc7579Actions())
    return extendedClient as typeof kernelClientBase & typeof extendedClient
}

function createTransferCall(address: Address): UserOperationCall {
    return {
        to: address,
        value: AMOUNT,
        data: "0x",
    }
}

async function testConsecutiveUserOps(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, numberOfUserOps: number = NUMBER_OF_USEROPS) {
    console.log("[TEST] Consecutive UserOps with Root Validator")
    console.log("-".repeat(50))

    console.log("[1/3] Deploying Smart Account...")
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
    console.log("\n[2/3] Sending UserOps...")
    const userOpsAndHashes = []
    const currentNonce = await kernelClient.account?.getNonce()
    if(!currentNonce){
        throw new Error("Failed to get nonce")
    }
    console.log("     Current nonce:", currentNonce)  
    for(let i = 0; i < numberOfUserOps; i++){
        const res = await sendUserOpNow(kernelAccount, kernelClient, currentNonce + BigInt(i))
        userOpsAndHashes.push(res)
        
    }
    // console.log("\n[3/3] Awaiting receipts...")

    // const statuses = await Promise.all(userOpsAndHashes.map(userOpAndHash => pollForCompletion(userOpAndHash.hash)))

    // for(let i = 0; i < statuses.length; i++){
    //     fs.appendFileSync("userOpTimingMap.txt", `UserOp ${userOpsAndHashes[i].hash} status: ${statuses[i]}, time taken: ${userOpTimingMap.get(userOpsAndHashes[i].hash)?.finalStatusTime! - userOpTimingMap.get(userOpsAndHashes[i].hash)?.sendTimestamp!}ms\n`)
    //     // console.log(`UserOp ${userOpsAndHashes[i].hash} status: ${statuses[i]}, time taken: ${userOpTimingMap.get(userOpsAndHashes[i].hash)?.finalStatusTime! - userOpTimingMap.get(userOpsAndHashes[i].hash)?.sendTimestamp!}ms`)
    // }
    // console.log("Completed sending and awaiting receipts")
}

async function sendUserOpNow(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, nonce: bigint){
    const timeStart = Date.now()
    const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelAccount,
        calls: [createTransferCall(getRandomAccount())],
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
        chainId: happychain.id,
        signature: EMPTY_SIGNATURE,
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
    fs.appendFileSync("sendNowUserOpTimingMap.txt", `UserOp ${receipt.userOpHash}, time taken: ${Date.now() - timeStart}ms\n`)
    return {hash: receipt.userOpHash, userOp: userOp}
}

async function sendUserOp(kernelAccount: SmartAccount, kernelClient: SmartAccountClient, nonce: bigint){
    try{
        
        const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
            account: kernelAccount,
            calls: [createTransferCall(getRandomAccount())],
            // nonce: nonce,
        })
        userOp.nonce = nonce
        userOp.signature = await kernelAccount.signUserOperation({
            ...userOp,
            chainId: happychain.id,
            signature: EMPTY_SIGNATURE,
        })
        const hash = (await kernelClient.sendUserOperation(userOp)).toString()
        console.log("Sender",userOp.sender , "\n", 
            "UserOp with hash:", hash.toString(),  "\n", 
             "& nonceHex:", nonce.toString(16),  "\n", 
              "nonceDec", nonce,  "\n")
        userOpTimingMap.set(hash, {sendTimestamp: Date.now(), finalStatusTime: 0})
        return {hash, userOp: userOp}
    }
    catch(err){
        console.error(err)
    }
}

async function pollForCompletion(hash: Hex){
    while (true) {
        const {status, transactionHash} = await pimlicoClient.getUserOperationStatus({ hash })
        console.log(`Status for ${hash}: ${status}`)
        
        // Check if we've reached a final state
        // (Can add 'not_found' to the list as well)
        if (['included', 'failed', 'rejected'].includes(status)) {
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            userOpTimingMap.set(hash, {sendTimestamp: userOpTimingMap.get(hash)?.sendTimestamp!, finalStatusTime: Date.now()})
            return status
        }
        
        // Wait before polling again
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}



async function runWithPrivateKey(_privateKey: Hex, _numberOfUserOps: number = NUMBER_OF_USEROPS) {
    console.log("Starting test userOps on testnet...")
    const SCAaccount = privateKeyToAccount(_privateKey)
    const kernelAccount = await getKernelAccount(publicClient, SCAaccount)
    const kernelClient = getKernelClient(kernelAccount)
    const kernelAddress = kernelAccount.address
    console.log(`Kernel account address: ${kernelAddress}`)
    await testConsecutiveUserOps(kernelAccount, kernelClient, _numberOfUserOps)
}

export async function runWithPrivateKeys(privateKeys: Hex[]) {
    const promises = privateKeys.map(privateKey => runWithPrivateKey(privateKey))
    await Promise.all(promises)
}
