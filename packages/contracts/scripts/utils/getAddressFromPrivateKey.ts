import { createPublicClient, Hex, http } from "viem"
import { privateKeyToAddress } from "viem/accounts"
import { happychainTestnet } from "viem/chains"

const privateKeys= [""]
async function getAddressAndTransactionCount() {
    const client = createPublicClient({
        chain: happychainTestnet,
        transport: http(),
      })
    for (const privateKey of privateKeys) {
        const address = privateKeyToAddress(privateKey as Hex)
        console.log(address.toString(), "txCount", await client.getTransactionCount({address}))
    }
}

getAddressAndTransactionCount().then(() => console.log("Done"))

