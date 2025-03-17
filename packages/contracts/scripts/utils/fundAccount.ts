import {createWalletClient, createPublicClient, parseEther, http, defineChain} from "viem"
import type { Address, PrivateKeyAccount } from "viem"

const happyChain = defineChain({
    name: "HappyChain",
    id: 216,
    rpcUrls: {
        default: {
            http: ["https://rpc.testnet.happy.tech"],
        }
    },
    nativeCurrency: {
        name: "Happy",
        symbol: "HAPPY",
        decimals: 18,
    },
})

const publicClient = createPublicClient({
    chain: happyChain,
    transport: http(),
})
const walletClient = createWalletClient({
    chain: happyChain,
    transport: http(),
})

export async function fundAccount(address: Address, fundingAccount: PrivateKeyAccount, amount: bigint): Promise<void> {
    console.log(`Funding account ${address} from ${fundingAccount.address}`);

    const txHash = await walletClient.sendTransaction({
        account: fundingAccount,
        to: address,
        value: amount,
    })
    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    })
    console.log("Funded")
}