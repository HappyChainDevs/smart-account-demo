import {defineChain} from "viem"

export const happychainTestnet = defineChain({
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