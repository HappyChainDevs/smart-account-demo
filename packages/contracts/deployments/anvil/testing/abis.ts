import type { AssertCompatible } from "@happychain/common"

const contractToAbi = ({
  "ECDSAValidator": [
    {
      "type": "function",
      "name": "ecdsaValidatorStorage",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isModuleType",
      "inputs": [
        {
          "name": "typeID",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "isValidSignatureWithSender",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "hash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "sig",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "onInstall",
      "inputs": [
        {
          "name": "_data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onUninstall",
      "inputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "postCheck",
      "inputs": [
        {
          "name": "hookData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "preCheck",
      "inputs": [
        {
          "name": "msgSender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "validateUserOp",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "userOpHash",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "event",
      "name": "OwnerRegistered",
      "inputs": [
        {
          "name": "kernel",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AlreadyInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "InvalidTargetAddress",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "NotInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ],
  "EntryPoint": [
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "addStake",
      "inputs": [
        {
          "name": "unstakeDelaySec",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "delegateAndRevert",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "depositTo",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "deposits",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "deposit",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "staked",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "stake",
          "type": "uint112",
          "internalType": "uint112"
        },
        {
          "name": "unstakeDelaySec",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "withdrawTime",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDepositInfo",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "info",
          "type": "tuple",
          "internalType": "struct IStakeManager.DepositInfo",
          "components": [
            {
              "name": "deposit",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "staked",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "stake",
              "type": "uint112",
              "internalType": "uint112"
            },
            {
              "name": "unstakeDelaySec",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "withdrawTime",
              "type": "uint48",
              "internalType": "uint48"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getNonce",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "key",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [
        {
          "name": "nonce",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSenderAddress",
      "inputs": [
        {
          "name": "initCode",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getUserOpHash",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "handleAggregatedOps",
      "inputs": [
        {
          "name": "opsPerAggregator",
          "type": "tuple[]",
          "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
          "components": [
            {
              "name": "userOps",
              "type": "tuple[]",
              "internalType": "struct PackedUserOperation[]",
              "components": [
                {
                  "name": "sender",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "nonce",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "initCode",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "callData",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "accountGasLimits",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "preVerificationGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "gasFees",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "paymasterAndData",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "signature",
                  "type": "bytes",
                  "internalType": "bytes"
                }
              ]
            },
            {
              "name": "aggregator",
              "type": "address",
              "internalType": "contract IAggregator"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "beneficiary",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "handleOps",
      "inputs": [
        {
          "name": "ops",
          "type": "tuple[]",
          "internalType": "struct PackedUserOperation[]",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "beneficiary",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "incrementNonce",
      "inputs": [
        {
          "name": "key",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "innerHandleOp",
      "inputs": [
        {
          "name": "callData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "opInfo",
          "type": "tuple",
          "internalType": "struct EntryPoint.UserOpInfo",
          "components": [
            {
              "name": "mUserOp",
              "type": "tuple",
              "internalType": "struct EntryPoint.MemoryUserOp",
              "components": [
                {
                  "name": "sender",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "nonce",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "verificationGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "callGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterVerificationGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterPostOpGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "preVerificationGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymaster",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "maxFeePerGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "maxPriorityFeePerGas",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            {
              "name": "userOpHash",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "prefund",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "contextOffset",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "preOpGas",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "context",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "actualGasCost",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "nonceSequenceNumber",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unlockStake",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawStake",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawTo",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        },
        {
          "name": "withdrawAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AccountDeployed",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "factory",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "paymaster",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "BeforeExecution",
      "inputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Deposited",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "totalDeposit",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PostOpRevertReason",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "revertReason",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SignatureAggregatorChanged",
      "inputs": [
        {
          "name": "aggregator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeLocked",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "totalStaked",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "unstakeDelaySec",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeUnlocked",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawTime",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeWithdrawn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationEvent",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "paymaster",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "success",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        },
        {
          "name": "actualGasCost",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "actualGasUsed",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationPrefundTooLow",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationRevertReason",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "revertReason",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "DelegateAndRevert",
      "inputs": [
        {
          "name": "success",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "ret",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "FailedOp",
      "inputs": [
        {
          "name": "opIndex",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "reason",
          "type": "string",
          "internalType": "string"
        }
      ]
    },
    {
      "type": "error",
      "name": "FailedOpWithRevert",
      "inputs": [
        {
          "name": "opIndex",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "reason",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "inner",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "PostOpReverted",
      "inputs": [
        {
          "name": "returnData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "ReentrancyGuardReentrantCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SenderAddressResult",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "SignatureValidationFailed",
      "inputs": [
        {
          "name": "aggregator",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ],
  "EntryPointSimulations": [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "_validateSenderAndPaymaster",
      "inputs": [
        {
          "name": "initCode",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "paymasterAndData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "addStake",
      "inputs": [
        {
          "name": "unstakeDelaySec",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "delegateAndRevert",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "depositTo",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "deposits",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "deposit",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "staked",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "stake",
          "type": "uint112",
          "internalType": "uint112"
        },
        {
          "name": "unstakeDelaySec",
          "type": "uint32",
          "internalType": "uint32"
        },
        {
          "name": "withdrawTime",
          "type": "uint48",
          "internalType": "uint48"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDepositInfo",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "info",
          "type": "tuple",
          "internalType": "struct IStakeManager.DepositInfo",
          "components": [
            {
              "name": "deposit",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "staked",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "stake",
              "type": "uint112",
              "internalType": "uint112"
            },
            {
              "name": "unstakeDelaySec",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "withdrawTime",
              "type": "uint48",
              "internalType": "uint48"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getNonce",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "key",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [
        {
          "name": "nonce",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSenderAddress",
      "inputs": [
        {
          "name": "initCode",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getUserOpHash",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "handleAggregatedOps",
      "inputs": [
        {
          "name": "opsPerAggregator",
          "type": "tuple[]",
          "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
          "components": [
            {
              "name": "userOps",
              "type": "tuple[]",
              "internalType": "struct PackedUserOperation[]",
              "components": [
                {
                  "name": "sender",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "nonce",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "initCode",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "callData",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "accountGasLimits",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "preVerificationGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "gasFees",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "paymasterAndData",
                  "type": "bytes",
                  "internalType": "bytes"
                },
                {
                  "name": "signature",
                  "type": "bytes",
                  "internalType": "bytes"
                }
              ]
            },
            {
              "name": "aggregator",
              "type": "address",
              "internalType": "contract IAggregator"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "beneficiary",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "handleOps",
      "inputs": [
        {
          "name": "ops",
          "type": "tuple[]",
          "internalType": "struct PackedUserOperation[]",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "beneficiary",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "incrementNonce",
      "inputs": [
        {
          "name": "key",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "innerHandleOp",
      "inputs": [
        {
          "name": "callData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "opInfo",
          "type": "tuple",
          "internalType": "struct EntryPoint.UserOpInfo",
          "components": [
            {
              "name": "mUserOp",
              "type": "tuple",
              "internalType": "struct EntryPoint.MemoryUserOp",
              "components": [
                {
                  "name": "sender",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "nonce",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "verificationGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "callGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterVerificationGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterPostOpGasLimit",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "preVerificationGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymaster",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "maxFeePerGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "maxPriorityFeePerGas",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            {
              "name": "userOpHash",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "prefund",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "contextOffset",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "preOpGas",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "name": "context",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "actualGasCost",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "nonceSequenceNumber",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint192",
          "internalType": "uint192"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "simulateHandleOp",
      "inputs": [
        {
          "name": "op",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "targetCallData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct IEntryPointSimulations.ExecutionResult",
          "components": [
            {
              "name": "preOpGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "paid",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "accountValidationData",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "paymasterValidationData",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "targetSuccess",
              "type": "bool",
              "internalType": "bool"
            },
            {
              "name": "targetResult",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "simulateValidation",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct IEntryPointSimulations.ValidationResult",
          "components": [
            {
              "name": "returnInfo",
              "type": "tuple",
              "internalType": "struct IEntryPoint.ReturnInfo",
              "components": [
                {
                  "name": "preOpGas",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "prefund",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "accountValidationData",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterValidationData",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "paymasterContext",
                  "type": "bytes",
                  "internalType": "bytes"
                }
              ]
            },
            {
              "name": "senderInfo",
              "type": "tuple",
              "internalType": "struct IStakeManager.StakeInfo",
              "components": [
                {
                  "name": "stake",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "unstakeDelaySec",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            {
              "name": "factoryInfo",
              "type": "tuple",
              "internalType": "struct IStakeManager.StakeInfo",
              "components": [
                {
                  "name": "stake",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "unstakeDelaySec",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            {
              "name": "paymasterInfo",
              "type": "tuple",
              "internalType": "struct IStakeManager.StakeInfo",
              "components": [
                {
                  "name": "stake",
                  "type": "uint256",
                  "internalType": "uint256"
                },
                {
                  "name": "unstakeDelaySec",
                  "type": "uint256",
                  "internalType": "uint256"
                }
              ]
            },
            {
              "name": "aggregatorInfo",
              "type": "tuple",
              "internalType": "struct IEntryPoint.AggregatorStakeInfo",
              "components": [
                {
                  "name": "aggregator",
                  "type": "address",
                  "internalType": "address"
                },
                {
                  "name": "stakeInfo",
                  "type": "tuple",
                  "internalType": "struct IStakeManager.StakeInfo",
                  "components": [
                    {
                      "name": "stake",
                      "type": "uint256",
                      "internalType": "uint256"
                    },
                    {
                      "name": "unstakeDelaySec",
                      "type": "uint256",
                      "internalType": "uint256"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "supportsInterface",
      "inputs": [
        {
          "name": "interfaceId",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "unlockStake",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawStake",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawTo",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        },
        {
          "name": "withdrawAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AccountDeployed",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "factory",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "paymaster",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "BeforeExecution",
      "inputs": [],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Deposited",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "totalDeposit",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PostOpRevertReason",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "revertReason",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SignatureAggregatorChanged",
      "inputs": [
        {
          "name": "aggregator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeLocked",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "totalStaked",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "unstakeDelaySec",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeUnlocked",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawTime",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StakeWithdrawn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationEvent",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "paymaster",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "success",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        },
        {
          "name": "actualGasCost",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "actualGasUsed",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationPrefundTooLow",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserOperationRevertReason",
      "inputs": [
        {
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true,
          "internalType": "bytes32"
        },
        {
          "name": "sender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nonce",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "revertReason",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawn",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "DelegateAndRevert",
      "inputs": [
        {
          "name": "success",
          "type": "bool",
          "internalType": "bool"
        },
        {
          "name": "ret",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "FailedOp",
      "inputs": [
        {
          "name": "opIndex",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "reason",
          "type": "string",
          "internalType": "string"
        }
      ]
    },
    {
      "type": "error",
      "name": "FailedOpWithRevert",
      "inputs": [
        {
          "name": "opIndex",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "reason",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "inner",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "PostOpReverted",
      "inputs": [
        {
          "name": "returnData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ]
    },
    {
      "type": "error",
      "name": "ReentrancyGuardReentrantCall",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SenderAddressResult",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "SignatureValidationFailed",
      "inputs": [
        {
          "name": "aggregator",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ],
  "FactoryStaker": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approveFactory",
      "inputs": [
        {
          "name": "factory",
          "type": "address",
          "internalType": "contract KernelFactory"
        },
        {
          "name": "approval",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "approved",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract KernelFactory"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "cancelOwnershipHandover",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "completeOwnershipHandover",
      "inputs": [
        {
          "name": "pendingOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "deployWithFactory",
      "inputs": [
        {
          "name": "factory",
          "type": "address",
          "internalType": "contract KernelFactory"
        },
        {
          "name": "createData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "salt",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "result",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "ownershipHandoverExpiresAt",
      "inputs": [
        {
          "name": "pendingOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "result",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "requestOwnershipHandover",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "stake",
      "inputs": [
        {
          "name": "entryPoint",
          "type": "address",
          "internalType": "contract IEntryPoint"
        },
        {
          "name": "unstakeDelay",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "unlockStake",
      "inputs": [
        {
          "name": "entryPoint",
          "type": "address",
          "internalType": "contract IEntryPoint"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "withdrawStake",
      "inputs": [
        {
          "name": "entryPoint",
          "type": "address",
          "internalType": "contract IEntryPoint"
        },
        {
          "name": "recipient",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "event",
      "name": "OwnershipHandoverCanceled",
      "inputs": [
        {
          "name": "pendingOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipHandoverRequested",
      "inputs": [
        {
          "name": "pendingOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "oldOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AlreadyInitialized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NewOwnerIsZeroAddress",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NoHandoverRequest",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotApprovedFactory",
      "inputs": []
    },
    {
      "type": "error",
      "name": "Unauthorized",
      "inputs": []
    }
  ],
  "HappyPaymaster": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_entryPoint",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "initialAllowedBundlers",
          "type": "address[]",
          "internalType": "address[]"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "MAX_GAS_BUDGET",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "REFILL_PERIOD",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "REFILL_RATE",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "addAllowedBundler",
      "inputs": [
        {
          "name": "bundler",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "addStake",
      "inputs": [
        {
          "name": "unstakeDelaySec",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "allowedBundlers",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "entryPoint",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IEntryPoint"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getDeposit",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "postOp",
      "inputs": [
        {
          "name": "mode",
          "type": "uint8",
          "internalType": "enum IPaymaster.PostOpMode"
        },
        {
          "name": "context",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "actualGasCost",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "actualUserOpFeePerGas",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeAllowedBundler",
      "inputs": [
        {
          "name": "bundler",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        {
          "name": "newOwner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unlockStake",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "userInfo",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "lastUpdated",
          "type": "uint64",
          "internalType": "uint64"
        },
        {
          "name": "userGasBudget",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "validatePaymasterUserOp",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "userOpHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "maxCost",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "context",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "validationData",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawStake",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawTo",
      "inputs": [
        {
          "name": "withdrawAddress",
          "type": "address",
          "internalType": "address payable"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "InsufficientGasBudget",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidBundler",
      "inputs": []
    },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        {
          "name": "account",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ],
  "Kernel": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_entrypoint",
          "type": "address",
          "internalType": "contract IEntryPoint"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "fallback",
      "stateMutability": "payable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "accountId",
      "inputs": [],
      "outputs": [
        {
          "name": "accountImplementationId",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "changeRootValidator",
      "inputs": [
        {
          "name": "_rootValidator",
          "type": "bytes21",
          "internalType": "ValidationId"
        },
        {
          "name": "hook",
          "type": "address",
          "internalType": "contract IHook"
        },
        {
          "name": "validatorData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "hookData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "currentNonce",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "eip712Domain",
      "inputs": [],
      "outputs": [
        {
          "name": "fields",
          "type": "bytes1",
          "internalType": "bytes1"
        },
        {
          "name": "name",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "version",
          "type": "string",
          "internalType": "string"
        },
        {
          "name": "chainId",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "verifyingContract",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "salt",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "extensions",
          "type": "uint256[]",
          "internalType": "uint256[]"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "entrypoint",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IEntryPoint"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "execute",
      "inputs": [
        {
          "name": "execMode",
          "type": "bytes32",
          "internalType": "ExecMode"
        },
        {
          "name": "executionCalldata",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "executeFromExecutor",
      "inputs": [
        {
          "name": "execMode",
          "type": "bytes32",
          "internalType": "ExecMode"
        },
        {
          "name": "executionCalldata",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "returnData",
          "type": "bytes[]",
          "internalType": "bytes[]"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "executeUserOp",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "userOpHash",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "executorConfig",
      "inputs": [
        {
          "name": "executor",
          "type": "address",
          "internalType": "contract IExecutor"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct ExecutorManager.ExecutorConfig",
          "components": [
            {
              "name": "hook",
              "type": "address",
              "internalType": "contract IHook"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        {
          "name": "_rootValidator",
          "type": "bytes21",
          "internalType": "ValidationId"
        },
        {
          "name": "hook",
          "type": "address",
          "internalType": "contract IHook"
        },
        {
          "name": "validatorData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "hookData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "initConfig",
          "type": "bytes[]",
          "internalType": "bytes[]"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "installModule",
      "inputs": [
        {
          "name": "moduleType",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "initData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "installValidations",
      "inputs": [
        {
          "name": "vIds",
          "type": "bytes21[]",
          "internalType": "ValidationId[]"
        },
        {
          "name": "configs",
          "type": "tuple[]",
          "internalType": "struct ValidationManager.ValidationConfig[]",
          "components": [
            {
              "name": "nonce",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "hook",
              "type": "address",
              "internalType": "contract IHook"
            }
          ]
        },
        {
          "name": "validationData",
          "type": "bytes[]",
          "internalType": "bytes[]"
        },
        {
          "name": "hookData",
          "type": "bytes[]",
          "internalType": "bytes[]"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "invalidateNonce",
      "inputs": [
        {
          "name": "nonce",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "isAllowedSelector",
      "inputs": [
        {
          "name": "vId",
          "type": "bytes21",
          "internalType": "ValidationId"
        },
        {
          "name": "selector",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isModuleInstalled",
      "inputs": [
        {
          "name": "moduleType",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "additionalContext",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isValidSignature",
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "signature",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "onERC1155BatchReceived",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "uint256[]",
          "internalType": "uint256[]"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "onERC1155Received",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "onERC721Received",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "permissionConfig",
      "inputs": [
        {
          "name": "pId",
          "type": "bytes4",
          "internalType": "PermissionId"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct ValidationManager.PermissionConfig",
          "components": [
            {
              "name": "permissionFlag",
              "type": "bytes2",
              "internalType": "PassFlag"
            },
            {
              "name": "signer",
              "type": "address",
              "internalType": "contract ISigner"
            },
            {
              "name": "policyData",
              "type": "bytes22[]",
              "internalType": "PolicyData[]"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "rootValidator",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bytes21",
          "internalType": "ValidationId"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "selectorConfig",
      "inputs": [
        {
          "name": "selector",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct SelectorManager.SelectorConfig",
          "components": [
            {
              "name": "hook",
              "type": "address",
              "internalType": "contract IHook"
            },
            {
              "name": "target",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "callType",
              "type": "bytes1",
              "internalType": "CallType"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "supportsExecutionMode",
      "inputs": [
        {
          "name": "mode",
          "type": "bytes32",
          "internalType": "ExecMode"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "supportsModule",
      "inputs": [
        {
          "name": "moduleTypeId",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "uninstallModule",
      "inputs": [
        {
          "name": "moduleType",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "module",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "deInitData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "uninstallValidation",
      "inputs": [
        {
          "name": "vId",
          "type": "bytes21",
          "internalType": "ValidationId"
        },
        {
          "name": "deinitData",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "hookDeinitData",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "upgradeTo",
      "inputs": [
        {
          "name": "_newImplementation",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "validNonceFrom",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint32",
          "internalType": "uint32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "validateUserOp",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "userOpHash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "missingAccountFunds",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "validationData",
          "type": "uint256",
          "internalType": "ValidationData"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "validationConfig",
      "inputs": [
        {
          "name": "vId",
          "type": "bytes21",
          "internalType": "ValidationId"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct ValidationManager.ValidationConfig",
          "components": [
            {
              "name": "nonce",
              "type": "uint32",
              "internalType": "uint32"
            },
            {
              "name": "hook",
              "type": "address",
              "internalType": "contract IHook"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ModuleInstalled",
      "inputs": [
        {
          "name": "moduleTypeId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "module",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ModuleUninstallResult",
      "inputs": [
        {
          "name": "module",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "result",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ModuleUninstalled",
      "inputs": [
        {
          "name": "moduleTypeId",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "module",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "NonceInvalidated",
      "inputs": [
        {
          "name": "nonce",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PermissionInstalled",
      "inputs": [
        {
          "name": "permission",
          "type": "bytes4",
          "indexed": false,
          "internalType": "PermissionId"
        },
        {
          "name": "nonce",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PermissionUninstalled",
      "inputs": [
        {
          "name": "permission",
          "type": "bytes4",
          "indexed": false,
          "internalType": "PermissionId"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Received",
      "inputs": [
        {
          "name": "sender",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RootValidatorUpdated",
      "inputs": [
        {
          "name": "rootValidator",
          "type": "bytes21",
          "indexed": false,
          "internalType": "ValidationId"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "SelectorSet",
      "inputs": [
        {
          "name": "selector",
          "type": "bytes4",
          "indexed": false,
          "internalType": "bytes4"
        },
        {
          "name": "vId",
          "type": "bytes21",
          "indexed": false,
          "internalType": "ValidationId"
        },
        {
          "name": "allowed",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "TryExecuteUnsuccessful",
      "inputs": [
        {
          "name": "batchExecutionindex",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "result",
          "type": "bytes",
          "indexed": false,
          "internalType": "bytes"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Upgraded",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ValidatorInstalled",
      "inputs": [
        {
          "name": "validator",
          "type": "address",
          "indexed": false,
          "internalType": "contract IValidator"
        },
        {
          "name": "nonce",
          "type": "uint32",
          "indexed": false,
          "internalType": "uint32"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ValidatorUninstalled",
      "inputs": [
        {
          "name": "validator",
          "type": "address",
          "indexed": false,
          "internalType": "contract IValidator"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "EnableNotApproved",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ExecutionReverted",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InitConfigError",
      "inputs": [
        {
          "name": "idx",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "InvalidCallType",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidCaller",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidExecutor",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidFallback",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidMode",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidModuleType",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidNonce",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidSelector",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidSignature",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidValidationType",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidValidator",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NonceInvalidationError",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotSupportedCallType",
      "inputs": []
    },
    {
      "type": "error",
      "name": "OnlyExecuteUserOp",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PermissionDataLengthMismatch",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PermissionNotAlllowedForSignature",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PermissionNotAlllowedForUserOp",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PolicyDataTooLarge",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PolicyFailed",
      "inputs": [
        {
          "name": "i",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    },
    {
      "type": "error",
      "name": "PolicySignatureOrderError",
      "inputs": []
    },
    {
      "type": "error",
      "name": "RootValidatorCannotBeRemoved",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SignerPrefixNotPresent",
      "inputs": []
    }
  ],
  "KernelFactory": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_impl",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createAccount",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "salt",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "getAddress",
      "inputs": [
        {
          "name": "data",
          "type": "bytes",
          "internalType": "bytes"
        },
        {
          "name": "salt",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "implementation",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "error",
      "name": "InitializeError",
      "inputs": []
    }
  ],
  "SessionKeyValidator": [
    {
      "type": "function",
      "name": "isInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isModuleType",
      "inputs": [
        {
          "name": "typeID",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "isValidSignatureWithSender",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "hash",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "sig",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bytes4",
          "internalType": "bytes4"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "onInstall",
      "inputs": [
        {
          "name": "_data",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "onUninstall",
      "inputs": [
        {
          "name": "",
          "type": "bytes",
          "internalType": "bytes"
        }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "sessionKeyValidatorStorage",
      "inputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "sessionKey",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "validateUserOp",
      "inputs": [
        {
          "name": "userOp",
          "type": "tuple",
          "internalType": "struct PackedUserOperation",
          "components": [
            {
              "name": "sender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "nonce",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "initCode",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "callData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "accountGasLimits",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "preVerificationGas",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "gasFees",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "paymasterAndData",
              "type": "bytes",
              "internalType": "bytes"
            },
            {
              "name": "signature",
              "type": "bytes",
              "internalType": "bytes"
            }
          ]
        },
        {
          "name": "userOpHash",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "error",
      "name": "AlreadyInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "InvalidTargetAddress",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    {
      "type": "error",
      "name": "NotInitialized",
      "inputs": [
        {
          "name": "smartAccount",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ]
}
) as const

const aliasToContract = ({
  "ECDSAValidator": "ECDSAValidator",
  "EntryPointSimulations": "EntryPointSimulations",
  "EntryPointV7": "EntryPoint",
  "FactoryStaker": "FactoryStaker",
  "HappyPaymaster": "HappyPaymaster",
  "Kernel": "Kernel",
  "KernelFactory": "KernelFactory",
  "SessionKeyValidator": "SessionKeyValidator"
}) as const

export const deployment = ({
  "ECDSAValidator": "0x8AC06A3DbDE73B3Fd0A23cAC1BeA1f8cA23b08a0",
  "EntryPointSimulations": "0xBbe8A301FbDb2a4CD58c4A37c262ecef8f889c47",
  "EntryPointV7": "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
  "FactoryStaker": "0xe8c1FA97cd39736727c9EDdC0f41858E59CCC295",
  "HappyPaymaster": "0xdCa8bD83AE4759Ed52291BF9470d6f319d47c489",
  "Kernel": "0xFDF2A37a68365741275eD40876f0D0A9244fB596",
  "KernelFactory": "0xa05BE7a057ed5DE9E41e0B0db9C3aac613BcCFa6",
  "SessionKeyValidator": "0x24640a43EEBED990E1823cD3C80d759C9Ad99D22"
}) as const

export type ContractName = keyof typeof contractToAbi
export type ContractAlias = keyof typeof aliasToContract
export type AliasToContract = { [key in ContractAlias]: ContractName }

type _assert1 = AssertCompatible<typeof aliasToContract, AliasToContract>

export type StaticAbis = { [key in ContractAlias]: (typeof contractToAbi)[AliasToContract[key]] }
export const abis = {} as StaticAbis

for (const [alias, contractName] of Object.entries(aliasToContract)) {
    abis[alias as ContractAlias] = contractToAbi[contractName as ContractName]
}