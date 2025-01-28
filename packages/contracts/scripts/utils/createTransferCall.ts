import type { Address } from "viem"
import { parseEther } from "viem"
import type { UserOperationCall } from "viem/account-abstraction"

const AMOUNT = parseEther("0.0001")

export function createTransferCall(address: Address): UserOperationCall {
    return {
        to: address,
        value: AMOUNT,
        data: "0x",
    }
}