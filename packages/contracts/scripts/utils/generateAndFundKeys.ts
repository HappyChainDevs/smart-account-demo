import { privateKeyToAddress, privateKeyToAccount } from "viem/accounts"
import { parseEther } from "viem"
import { fundAccount } from "./fundAccount"
import { generatePrivateKeys } from "./generatePrivateKeys"

const fundingPrivateKey = "0x"

async function generateAndFundPrivateKeys(){
    const privateKeys = await generatePrivateKeys(50)
    
    for(const privateKey of privateKeys){
        await fundAccount(privateKeyToAddress(privateKey), privateKeyToAccount(fundingPrivateKey), parseEther("5"))
    }

    console.log(privateKeys)
}

generateAndFundPrivateKeys().then(() => console.log("Done"))