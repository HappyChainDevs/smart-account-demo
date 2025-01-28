import {runWithPrivateKeys, happychain} from "./test_userOp_testnet"
import { generatePrivateKey, privateKeyToAccount, privateKeyToAddress } from "viem/accounts"
import type { Address, Hex, PrivateKeyAccount, PublicClient } from "viem"
import {createWalletClient, createPublicClient, parseEther, http} from "viem"

const NUM_ACCOUNTS = 5

const publicClient = createPublicClient({
    chain: happychain,
    transport: http(),
})
const walletClient = createWalletClient({
    chain: happychain,
    transport: http(),
})

async function generateAndFundPrivateKeys(count: number, fundingAccount: PrivateKeyAccount): Promise<Hex[]> {
    const privateKeys: Hex[] = [];
    for (let i = 0; i < count; i++) {
        const privateKey = generatePrivateKey();
        const address = privateKeyToAddress(privateKey);
        // await fundAccount(address, fundingAccount);
        privateKeys.push(privateKey);
    }
    return privateKeys;
}

async function fundAccount(address: Address, fundingAccount: PrivateKeyAccount): Promise<void> {
    console.log(`Funding account ${address} from ${fundingAccount.address}`);

    const txHash = await walletClient.sendTransaction({
        account: fundingAccount,
        to: address,
        value: parseEther("0.1"),
    })
    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    })

}

async function main() {
    const keys = await generateAndFundPrivateKeys(NUM_ACCOUNTS, privateKeyToAccount("0xd1a703039fae8bc54335d8487f7ad9a4b01f9c0f4cd2c92504a7cb03c8f62aa8"))
    await runWithPrivateKeys(keys);
} 
main().then(() => {
    console.log("Test completed successfully");
    setTimeout(() => process.exit(0), 100);
}).catch((error) => {   
    console.error(error);
    process.exit(1);
})
