import { type PimlicoClient, createPimlicoClient } from "permissionless/clients/pimlico"
import { happychainTestnet } from "viem/chains";
import { http } from "viem"
import { entryPoint07Address } from "viem/account-abstraction"

export const bundlerRpc = "http://localhost:49531"//"https://bundler-staging.happy.tech"

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

