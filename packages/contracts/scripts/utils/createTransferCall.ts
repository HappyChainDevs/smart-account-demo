import type { Address } from "viem"
import { parseEther } from "viem"


const AMOUNT = parseEther("0.0000")

export function createTransferCall(address: Address) {
    return {
        to: address,
        value: AMOUNT,
        data: "0x",
    }
}