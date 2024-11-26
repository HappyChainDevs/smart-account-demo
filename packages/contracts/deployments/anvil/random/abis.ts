import type { AssertCompatible } from "@happychain/common"

const contractToAbi = {
    Random: [
        {
            type: "constructor",
            inputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "BLOCK_TIME",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "PRECOMMIT_DELAY",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "getRevealedValue",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "owner",
            inputs: [],
            outputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "function",
            name: "postCommitment",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    internalType: "uint256",
                },
                {
                    name: "commitmentHash",
                    type: "bytes32",
                    internalType: "bytes32",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "renounceOwnership",
            inputs: [],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "revealValue",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    internalType: "uint256",
                },
                {
                    name: "revealedValue",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "transferOwnership",
            inputs: [
                {
                    name: "newOwner",
                    type: "address",
                    internalType: "address",
                },
            ],
            outputs: [],
            stateMutability: "nonpayable",
        },
        {
            type: "function",
            name: "unsafeGetRevealedValue",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            outputs: [
                {
                    name: "",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            stateMutability: "view",
        },
        {
            type: "event",
            name: "CommitmentPosted",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256",
                },
                {
                    name: "commitment",
                    type: "bytes32",
                    indexed: false,
                    internalType: "bytes32",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "OwnershipTransferred",
            inputs: [
                {
                    name: "previousOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
                {
                    name: "newOwner",
                    type: "address",
                    indexed: true,
                    internalType: "address",
                },
            ],
            anonymous: false,
        },
        {
            type: "event",
            name: "ValueRevealed",
            inputs: [
                {
                    name: "timestamp",
                    type: "uint256",
                    indexed: true,
                    internalType: "uint256",
                },
                {
                    name: "revealedValue",
                    type: "uint256",
                    indexed: false,
                    internalType: "uint256",
                },
            ],
            anonymous: false,
        },
        {
            type: "error",
            name: "CommitmentAlreadyExists",
            inputs: [],
        },
        {
            type: "error",
            name: "CommitmentTooLate",
            inputs: [],
        },
        {
            type: "error",
            name: "InvalidReveal",
            inputs: [],
        },
        {
            type: "error",
            name: "NoCommitmentFound",
            inputs: [],
        },
        {
            type: "error",
            name: "OwnableInvalidOwner",
            inputs: [
                {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "OwnableUnauthorizedAccount",
            inputs: [
                {
                    name: "account",
                    type: "address",
                    internalType: "address",
                },
            ],
        },
        {
            type: "error",
            name: "RevealMustBeOnExactBlock",
            inputs: [],
        },
        {
            type: "error",
            name: "RevealedValueNotAvailable",
            inputs: [],
        },
    ],
} as const

const aliasToContract = {
    Random: "Random",
} as const

export const deployment = {
    Random: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
} as const

export type ContractName = keyof typeof contractToAbi
export type ContractAlias = keyof typeof aliasToContract
export type AliasToContract = { [key in ContractAlias]: ContractName }

type _assert1 = AssertCompatible<typeof aliasToContract, AliasToContract>

export type StaticAbis = { [key in ContractAlias]: (typeof contractToAbi)[AliasToContract[key]] }
export const abis = {} as StaticAbis

for (const [alias, contractName] of Object.entries(aliasToContract)) {
    abis[alias as ContractAlias] = contractToAbi[contractName as ContractName]
}
