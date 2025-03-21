import { type PimlicoClient, createPimlicoClient } from "permissionless/clients/pimlico"
import {happychainTestnet} from "./chain"
import { http } from "viem"
import { entryPoint07Address } from "viem/account-abstraction"

export const bundlerRpc = "https://bundler-staging.happy.tech"

export function getPimlicoClient(): PimlicoClient {
    return createPimlicoClient({
        chain: happychainTestnet,
        transport: http(bundlerRpc),
        entryPoint: {
            address: entryPoint07Address,
            version: "0.7",
        },
    })
}

