import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"
import type { Hex } from "viem"

export function getRandomAccount() {
    return privateKeyToAddress(generatePrivateKey()).toString() as Hex
}