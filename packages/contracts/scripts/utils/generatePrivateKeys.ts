import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"
import type { Hex } from "viem"

export function generatePrivateKeys(count: number): Hex[] {
    const privateKeys: Hex[] = [];
    for (let i = 0; i < count; i++) {
        const privateKey = generatePrivateKey();
        privateKeys.push(privateKey); 
    }
    return privateKeys;
}