import {createWalletClient, createPublicClient, parseEther, http, defineChain} from "viem"
import type { Address, PrivateKeyAccount } from "viem"
import {happychainTestnet} from "./chain"


const publicClient = createPublicClient({
    chain: happychainTestnet,
    transport: http(),
})
const walletClient = createWalletClient({
    chain: happychainTestnet,
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