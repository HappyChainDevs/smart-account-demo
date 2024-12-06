import type { Address, Hex, PrivateKeyAccount, PublicClient } from "viem"
import { http, createPublicClient, createWalletClient, formatEther, numberToHex, parseEther } from "viem"
import type {
    GetPaymasterDataParameters,
    GetPaymasterStubDataParameters,
    SmartAccount,
    UserOperation,
} from "viem/account-abstraction"
import { entryPoint07Address, type PackedUserOperation, toPackedUserOperation } from "viem/account-abstraction"
import { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } from "viem/accounts"
import { localhost, sepolia } from "viem/chains"

import { type SmartAccountClient, createSmartAccountClient } from "permissionless"
import { toEcdsaKernelSmartAccount } from "permissionless/accounts"
import { type Erc7579Actions, erc7579Actions } from "permissionless/actions/erc7579"
import { createPimlicoClient } from "permissionless/clients/pimlico"

import { abis, deployment as localDeployment } from "../deployments/anvil/testing/abis"
import { deployment as sepoliaDeployment } from "../deployments/sepolia/aa/abis"
import { getCustomNonce } from "./getNonce"

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
const sessionKey = generatePrivateKey()
const sessionAccount = privateKeyToAccount(sessionKey)

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

// The address used when installing a validator module to signify that the module has no hooks.
// This is a special constant address that indicates the absence of any additional hooks.
const NO_HOOKS_ADDRESS = "0x0000000000000000000000000000000000000001"

// Function selector for transferring ETH from the smart account.
// The function selector must be whitelisted when installing a validator module to allow ETH transfers.
const EXECUTE_FUNCTION_SELECTOR = "0xe9ae5c53"
const AMOUNT = "0.0000001"
const EMPTY_SIGNATURE = "0x"

function toHexDigits(number: bigint, size: number): string {
    return numberToHex(number, { size }).slice(2)
}

function getRandomAccount() {
    return privateKeyToAddress(generatePrivateKey()).toString() as Hex
}

async function checkBalance(receiver: Address): Promise<string> {
    const balance = await publicClient.getBalance({
        address: receiver,
        blockTag: "latest",
    })

    return formatEther(balance)
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
        paymaster: isLocal ? {
            async getPaymasterData(parameters: GetPaymasterDataParameters) {
                return {
                    paymaster: paymasterAddress,
                    paymasterData: "0x",
                    paymasterVerificationGasLimit: parameters.factory && parameters.factory !== "0x" ? 45000n : 25000n,
                    paymasterPostOpGasLimit: 1n,
                }
            },
            async getPaymasterStubData(_parameters: GetPaymasterStubDataParameters) {
                return {
                    paymaster: paymasterAddress,
                    paymasterData: "0x",
                    paymasterVerificationGasLimit: 80_000n,
                    paymasterPostOpGasLimit: 0n,
                }
            },
        } : pimlicoClient,
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
        account,
        to: accountAddress,
        chain,
        value: parseEther("0.0000002"),
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

function getInitData(hookAddress: Address, validatorData: Hex, hookData: Hex, selectorData: Hex): Hex {
    /**
     * Reference: https://github.com/zerodevapp/kernel/blob/release/v3.1/src/Kernel.sol#L361-L366
     * The layout is :-
     * - 0x00 (00): hook address
     * - 0x14 (20): validatorData offset from 0x34
     * - 0x34 (52): hookData offset from 0x34
     * - 0x54 (84): selectorData offset from 0x34
     * - [0x14 + validatordataOffset] : validatorDataLength
     * - [0x34 + validatorDataOffset] : validatorData
     * - [0x14 + hookDataOffset]      : hookDataLength
     * - [0x34 + hookDataOffset]      : hookData
     * - [0x14 + selectorDataOffset]  : selectorDataLength
     * - [0x34 + selectorDataOffset]  : selectorData
     */

    const validatorDataLen = validatorData.slice(2).length / 2
    const hookDataLen = hookData.slice(2).length / 2
    const selectorDataLen = selectorData.slice(2).length / 2

    const hexValidatorDataLength = toHexDigits(BigInt(validatorDataLen), 32)
    const hexHookDataLength = toHexDigits(BigInt(hookDataLen), 32)
    const hexSelectorDataLength = toHexDigits(BigInt(selectorDataLen), 32)

    // validatorDataOffset = HookDataOffset.length + SelectorDataOffset.length + ValidatorDataLength.length
    const validatorDataOffset = 32 + 32 + 32
    const hexValidatorDataOffset = toHexDigits(BigInt(validatorDataOffset), 32)

    // hookDataOffset = validatorDataOffset + validatorData.length + hookDataLength.length
    const hookDataOffset = validatorDataOffset + validatorDataLen
    const hexHookDataOffset = toHexDigits(BigInt(hookDataOffset), 32)

    // selectorDataOffset = hookDataOffset + hookData.length + selectorDataLength.length
    const selectorDataOffset = hookDataOffset + 32 + hookDataLen + 32
    const hexSelectorDataOffset = toHexDigits(BigInt(selectorDataOffset), 32)

    // biome-ignore format: readability
    return (
        hookAddress + // starts with "0x"
        hexValidatorDataOffset +
        hexHookDataOffset +
        hexSelectorDataOffset +
        hexValidatorDataLength +
        validatorData.slice(2) +
        hexHookDataLength +
        hookData.slice(2) +
        hexSelectorDataLength +
        selectorData.slice(2)
    ) as Hex
}

async function installCustomModule(
    kernelAccount: SmartAccount,
    kernelClient: SmartAccountClient & Erc7579Actions<SmartAccount>,
    sessionKey: Address,
) {
    const sessionKeyValidator = isLocal ? localDeployment.SessionKeyValidator : sepoliaDeployment.SessionKeyValidator
    const opHash = await kernelClient.installModule({
        type: "validator",
        address: sessionKeyValidator,
        context: getInitData(NO_HOOKS_ADDRESS, sessionKey, "0x", EXECUTE_FUNCTION_SELECTOR),
        nonce: await kernelAccount.getNonce(),
    })

    const rec = await kernelClient.waitForUserOperationReceipt({
        hash: opHash,
    })

    if (!rec.success) {
        throw new Error("Module Installation failed")
    }

    const isInstalled = await isCustomModuleInstalled(kernelClient)
    if (!isInstalled) {
        throw new Error("Module is not installed")
    }
}

async function uninstallCustomModule(
    kernelAccount: SmartAccount,
    kernelClient: SmartAccountClient & Erc7579Actions<SmartAccount>,
) {
    const sessionKeyValidator = isLocal ? localDeployment.SessionKeyValidator : sepoliaDeployment.SessionKeyValidator
    const opHash = await kernelClient.uninstallModule({
        type: "validator",
        address: sessionKeyValidator,
        context: NO_HOOKS_ADDRESS,
        nonce: await kernelAccount.getNonce(),
    })

    const rec = await kernelClient.waitForUserOperationReceipt({
        hash: opHash,
    })

    if (!rec.success) {
        throw new Error("Module Uninstallation failed")
    }

    const isInstalled = await isCustomModuleInstalled(kernelClient)
    if (isInstalled) {
        throw new Error("Module is not uninstalled")
    }
}

async function isCustomModuleInstalled(actionsClient: Erc7579Actions<SmartAccount>): Promise<boolean> {
    const sessionKeyValidator = isLocal ? localDeployment.SessionKeyValidator : sepoliaDeployment.SessionKeyValidator
    return await actionsClient.isModuleInstalled({
        type: "validator",
        address: sessionKeyValidator,
        context: "0x",
    })
}

async function testRootValidator(kernelAccount: SmartAccount, kernelClient: SmartAccountClient) {
    const receiverAddress = getRandomAccount()

    const txHash = await kernelClient.sendTransaction({
        account: kernelClient.account as SmartAccount,
        to: receiverAddress,
        chain,
        value: parseEther(AMOUNT),
    })

    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    })

    if (receipt.status !== "success") {
        throw new Error("KernelClient transaction failed")
    }

    const balance = await checkBalance(receiverAddress)
    if (balance === AMOUNT) {
        console.log(`Using RootValidator: Balance is correct: ${balance} ETH`)
    } else {
        throw new Error(`Using RootValidator: Balance is not correct: ${balance} ETH`)
    }
}

async function testCustomValidator(
    kernelAccount: SmartAccount,
    kernelClient: SmartAccountClient & Erc7579Actions<SmartAccount>,
) {
    const receiverAddress = getRandomAccount()
    const sessionSigner = await getKernelAccount(publicClient, sessionAccount)
    const sessionKeyValidator = isLocal ? localDeployment.SessionKeyValidator : sepoliaDeployment.SessionKeyValidator
    const customNonce = await getCustomNonce(kernelAccount.client, kernelAccount.address, sessionKeyValidator)

    await installCustomModule(kernelAccount, kernelClient, sessionAccount.address)

    const userOp: UserOperation<"0.7"> = await kernelClient.prepareUserOperation({
        account: kernelClient.account as SmartAccount,
        calls: [
            {
                to: receiverAddress,
                value: parseEther(AMOUNT),
                data: "0x",
            },
        ],
        nonce: customNonce,
    })

    userOp.signature = await sessionSigner.signUserOperation({
        ...userOp,
        chainId: chain.id,
        signature: EMPTY_SIGNATURE, // The signature field must be empty when hashing and signing the user operation.
    })

    const userOpHash = await kernelClient.sendUserOperation({
        ...userOp,
    })

    const receipt = await kernelClient.waitForUserOperationReceipt({
        hash: userOpHash,
    })

    if (!receipt.success) {
        throw new Error("Validation using custom validator module failed")
    }

    const balance = await checkBalance(receiverAddress)
    if (balance === AMOUNT) {
        console.log(`Using CustomValidator: Balance is correct: ${balance} ETH`)
    } else {
        throw new Error(`Using CustomValidator: Balance is not correct: ${balance} ETH`)
    }

    await uninstallCustomModule(kernelAccount, kernelClient)
}

async function main() {
    const SCAaccount = privateKeyToAccount(generatePrivateKey()) // Create a new account every time
    const kernelAccount: SmartAccount = await getKernelAccount(publicClient, SCAaccount)
    const kernelClient = getKernelClient(kernelAccount)
    
    const prefundRes = await fund_smart_account(kernelAccount.address)
    if (prefundRes !== "success") {
        throw new Error("Funding SmartAccount failed")
    }

    if (isLocal) {
        const depositRes = await deposit_paymaster()
        if (depositRes !== "success") {
            throw new Error("Paymaster Deposit failed")
        }
    }

    try {
        await testRootValidator(kernelAccount, kernelClient)
    } catch (error) {
        console.error("Root Validator: ", error)
    }

    try {
        await testCustomValidator(kernelAccount, kernelClient)
    } catch (error) {
        console.error("Custom Validator: ", error)
    }
}

main().then(() => {
    process.exit(0)
})
