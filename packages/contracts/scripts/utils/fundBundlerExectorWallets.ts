import { Address, GetTransactionType, Hash, Hex, IsNarrowable, NonceManager, parseEther, SerializeTransactionFn, SignableMessage, TransactionSerializable, TransactionSerialized, TypedData, TypedDataDefinition } from "viem";
import { privateKeyToAccount, SignAuthorizationReturnType } from "viem/accounts";
import { fundAccount } from "./fundAccount";


const fundingPrivateKey = ""

// staging
const executorWalletAddresses = [
    "0x42d3E96a9f5b9Ce835267ABD566eC61e0D898635",
    "0x68a3F549c3a01b101BD1862B07F4F2Bf134D9494",
    "0x48a2A4fD23340Fc53cb1510bD5F1c4d044C44BA6",
    "0x5C7958903E614FF5463561CB6b8Cc01935d2D6e8",
    "0x751028b1854D48dec70CD14Dc0e1120887f90ba6",
    "0x30559F8423fd04A7A80456127cc37D2f72d3BeD6",
    "0x61917105eE028003010d36eBDd151B796280359B",
    "0x896573Ee885b35c8d6261F07d2Bd27b797F6b296",
    "0x23EB9A48dc65dBB34497Bb4771c791C13C4a20ca",
    "0xeb4e7ecf6a69C424F08299d2304EcD7B766E0945",
    "0x9BC56c82ec84d26aC12C056D7A136a88D527B19e",
    "0x73d69BA72D8D70C7d4c0411a38528bDF07011720",
    "0xc617EA458e26FCc2259e6A4a692Aaf0c348f3224",
    "0xCb2f8123B27a584A2a1C6c34de3C9D77dE0106D1",
    "0xa4f07572371850120e89F2951CC7F1aFC5313E89",
    "0x91B10365a1198b18123a490eeEc32edAA4b50021",
    "0x93a8d639B32D9506f37A308cc5a27E93302A4b99",
    "0x29610BE3a8C5abC3613E26de38543D99Ea30983B",
    "0xe2b62bcB2e510D898a993E1C611459cDcA385Ad3",
    "0x599b8414e279799Cf056699d8562C4230fc0cc95",
    "0x9F2AE6265181aAf3ac7D1D49A0eEC10F112C8c0D",
    "0xe9b1fC29e5CCfa2c16bC700615f686Df8aD7DA66",
    "0x514C530d7bf9599bbb4583b944754BE3E4494F64",
    "0x7c45c5b769913ea417c1b3B7D52a13160C9c5539",
    "0x9059c07dea4A11B950e39A09eeC96EDABf604FC6",
    "0x2Be307a0b0Bf93929d2C339B795cF8DE4AAE88e0",
    "0x8F7DEAAffd0C856cAfBB5c84d187f3c43dFF6076",
    "0x58DDf1b9B1b8ED28338BFd44a87253EAA7928d7b",
    "0x33127DB1cB3982737AC0e990aA7f0Fe5d48De7d4",
    "0x50ba24fbf19420c1fB51BF1A601ef8fc5B11Bd0e",
    "0x7C21F608B19f6E113fe9AB93a1e25DA79C63af08",
    "0x6898f05a1F52efc18742216660A1c6831575F4c7",
    "0x08d36C41f376282f73846300b79bd385a1546F17",
    "0x4CBA08B91f75cdbA41d252E23b0711C1FDa33DF6",
    "0x8f9de92258DCC585EB803a6d029a41A541187F62",
    "0xE4B93D3f119F983586993DCEd083eCF79E502570",
    "0x1570C720FBe359D30B41DBbFb641CFF7Ffc28E99",
    "0xB709D00B2B152337580b4305b08cA32de4Bd778C",
    "0xAfdAecbf9f5f689eb99cEA8FafdE9F3899aBd9ca",
    "0x8c43f49dD4D2EAad05Ba06d046b7b2Cc61A3dBFf",
    "0xE17E3c98Df014781Cd117a6c96118642c0D4ab50",
  ];
  
// production
// const executorWalletAddresses = [
//     "0x7EFBF57E9ac3fc4c569982c19E8171Fa14125226",
//     "0xdfa8511e26919b7E32B3CA2b437bdf6bEd650264",
//     "0x9748575EbC0ccd9236F72e05F19bA4Cf34a5D6e9",
//     "0x7F1491d4774224850A35696460EF524bB7d29FdB",
//     "0xAFD10ec74DCE07284B7672444AABEa3A021cafCF",
//     "0x73664B8aCBd75636D5713d56a3297A42914B5655",
//     "0x4880BE81C88b8e845Ab89d7D2A26B0e72C30A0A9",
//     "0x0C89f3036EA9D1937bEAbdCeC9C7CaF7ba383581",
//     "0xd187bE149a54891C043bF2b29a40d82110BDe268",
//     "0x46800b021816b797da323297fB552B12DECB4065",
//     "0x03194e563394bbD3E9a91345FE2DA8b1Bf7E947A",
//     "0xC10a148bE2f7ae68EBF2E1A0256D421E7C2d86d2",
//     "0xB9Fd42416BCC5Fdd0C811199f4a2D6bCE74e2e5F",
//     "0xE799093Ff68916cAf47D647DDF4314206353A55C",
//     "0xa7fd6fb69A849f10Eb1D343f520DD3E6dE4256a1",
//     "0xaD48e7D6f3c80C8460ba7Fb5E6db3c0c112cDB71",
//     "0xb51e0511C8Fee7dcb0FBefc46E40790479025d10",
//     "0xfAe89c1eaEaE84AfB62414929947B17398A696D1",
//     "0xc605D2F3589e6726A5cEB486590f4bbb82d41475",
//     "0x155f18eC682D3527887DE6ea9BF1af915BF299a0",
//     "0x319324117A80Bd00E94bE2d7E9A4F74DD640B08B",
//     "0x6BEF32ad6E307072EE8441b38009524Ca09920f5",
//     "0x0A4f2C6f2b58B1BA91b9bCfB10F5512aaE2af79B",
//     "0xC3cb14eE8488eF49f7A9F2b178864E5e8eB29C11",
//     "0x12fF459A80b909241c4E3bB2c365e91Edbd5BDD4",
//     "0x7fBF4c7f4462B38bE6DD87178C32b681AFceF200",
//     "0x2BFe16331AF330b2F77e0041233D1284038acce7",
//     "0xF1E45043F484874e12BEEE3C0bf68Ff85c844329",
//     "0xA721C0A8F95e36195CEBD199b44AD04664b2Fa34",
//     "0x31c4fE7c527D897d6965C50fbcEf984A9A085FED",
//     "0xb9fAAF83a4124818C0C37053D21f9FD30a9D0E8e",
//     "0x288053aEe264421f49AAEe826Ed4895E3cF50a2D",
//     "0xE008A608FfD52e34eC94960b363adFc35780C9cb",
//     "0xE12642f5aB40b3412274FEbA02430d0e775Dc411",
//     "0x9a1803BC4167633763682b2cF459b443Ea3BFE01",
//     "0x63F33E34bdC37dc4eaa38B512E973EA228CF2b35",
//     "0xBc600D334f657d75ab46E7199Eb86BEDBbAaF737",
//     "0x1b6e906c61CCc8dEfC70E6Ad316561A2d8EE6209",
//     "0xBB13C40A4f71081463522C11d6AE805b1F35Cb60",
//     "0xb09A36b32Ca9ed8b08E7aA7974be4Fee201689A8",
//     "0x3763f6E35Cee28F88Cd8ca4E4ab0c8FD32A58B8d",
//     "0x137DcD80a223D580764BD46757F5bEb3785EbA15",
//   ];
  
  
  
async function run(){
    // Fund the executor wallets
    for(const executorWalletAddress of executorWalletAddresses){
        await fundAccount(executorWalletAddress as any, privateKeyToAccount(fundingPrivateKey), parseEther("0.05"))
    }
}
run().then(() => console.log("Done Funding addresses"))