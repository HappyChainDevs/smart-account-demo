import type { Hex, PrivateKeyAccount, PublicClient } from "viem"
import { http, createPublicClient } from "viem"
import { happychainTestnet } from "viem/chains"
import type {
    GetPaymasterDataParameters,
    GetPaymasterStubDataParameters,
    SmartAccount
} from "viem/account-abstraction"
import { entryPoint07Address } from "viem/account-abstraction"
import { privateKeyToAccount, privateKeyToAddress } from "viem/accounts"
import { type SmartAccountClient, createSmartAccountClient } from "permissionless"
import { toEcdsaKernelSmartAccount } from "permissionless/accounts"
import { type Erc7579Actions, erc7579Actions } from "permissionless/actions/erc7579"

import { deployment as happyTestnetDeployment } from "../../deployments/happy-sepolia/aa/abis"
import { getPimlicoClient, bundlerRpc } from "./getPimlicoClient"

const PAYMASTER_VERIFICATION_GAS_LIMIT_WITH_FACTORY = 45000n
const PAYMASTER_POST_OP_GAS_LIMIT = 1n // Set to 1 since the postOp function is never called
const PAYMASTER_DATA = "0x" as const


const publicClient = createPublicClient({
    chain: happychainTestnet,
    transport: http(happychainTestnet.rpcUrls.default.http[0]),
})



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

export async function createKernelClient(_privateKey: Hex) : Promise<SmartAccountClient & Erc7579Actions<SmartAccount>>{
    const SCAaccount = privateKeyToAccount(_privateKey)
    const kernelAccount = await getKernelAccount(publicClient, SCAaccount)
    const kernelClient = getKernelClient(kernelAccount)
    const kernelAddress = kernelAccount.address
    console.log(`Kernel account address: ${kernelAddress}`)
    return kernelClient
}

function getKernelClient(kernelAccount: SmartAccount): SmartAccountClient & Erc7579Actions<SmartAccount> {
    const paymasterAddress = happyTestnetDeployment.HappyPaymaster

    const kernelClientBase = createSmartAccountClient({
        account: kernelAccount,
        chain: happychainTestnet,
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
                return (await getPimlicoClient().getUserOperationGasPrice()).fast
            },
        },
    })

    const extendedClient = kernelClientBase.extend(erc7579Actions())
    return extendedClient as typeof kernelClientBase & typeof extendedClient
}

