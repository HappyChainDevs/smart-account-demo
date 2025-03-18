import { deployment as happyTestnetDeployment } from "../../deployments/happy-sepolia/mocks/abis"

export function createMintCall() {
    return {
        to: happyTestnetDeployment.MockTokenA,
        value: 0n,
        data: "0x40c10f190000000000000000000000001234567890abcdef1234567890abcdef1234567800000000000000000000000000000000000000000000000000000000000003e8",
    }
}