
export const saleEnd = new Date("9 Feb 2024 12:00:00 GMT").getTime()

export const managerAddress = "0:4c2bad8915a59c0f51fee82e49d925c33698d318d4af97d2f692a91891f99e77"
export const SYMAddress = "0:55995aedbfe5c84fc1bb7eac86b216b8b6681238038ce9ca6ebe82f84a977746"
export const LOGOURL = "https://impulsefinance.s3.us-east-1.amazonaws.com/images/1693422836805logo.png"
export const NFTAddress = "0:c4fc8f3aac4dc911953acbedf8e7e3fa2acaaa9b9479deb6ba61d05db09d0fa2"
export const WVENOM = "0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e"
//export const faucet = new Address("0:16a31b963adbdfa6b9539b7f07816097536741e65a4f4288eacc749e111ec0a2")
export const faucet = "0:f4f1a56530f254d6e93975e556881310078d99c5825e9e04d6c4379f521b5a33"
//export const faucet = new Address("0:5cfd9f5b025ab2503f7eff1a1d9aba124998479be11e8fb5691361d69438ad44")


//export const ppsale = "0x0ee554E58BcDBe946F21fBF3EF8648CeA5c17399"
//export const tokenSaleContract = "0x0f1c5C7F39B24c9FD590348e54213Bd9488f0937"
export const tokenSaleContract = "0xdf64b3EA6BE144986c5860b80B96944886D4a128"
export const USDTContract = "0x55d398326f99059fF775485246999027B3197955"

export const CHEF = "0:6880f4aa14fa29c7b1e4f7e8dabe24e95d05ed12d284ed7e33c973d6adefe6ee"

export const tokenSaleABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "venomAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sym",
				"type": "uint256"
			}
		],
		"name": "Bought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "SYMSTORE",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "venomAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxBuy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minBuy",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "phaseOne",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "phaseTwo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raised",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "sale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const USDTABI = [{
	"inputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
	},
	{
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}
	],
	"name": "Approval",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "account",
		"type": "address"
	},
	{
		"indexed": false,
		"internalType": "bool",
		"name": "isExcluded",
		"type": "bool"
	}
	],
	"name": "ExcludeFromFees",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "previousOwner",
		"type": "address"
	},
	{
		"indexed": true,
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}
	],
	"name": "OwnershipTransferred",
	"type": "event"
},
{
	"anonymous": false,
	"inputs": [{
		"indexed": true,
		"internalType": "address",
		"name": "from",
		"type": "address"
	},
	{
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	},
	{
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
	}
	],
	"name": "Transfer",
	"type": "event"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "owner",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	}
	],
	"name": "allowance",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
	],
	"name": "approve",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "balanceOf",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "decimals",
	"outputs": [{
		"internalType": "uint8",
		"name": "",
		"type": "uint8"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "subtractedValue",
		"type": "uint256"
	}
	],
	"name": "decreaseAllowance",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	},
	{
		"internalType": "bool",
		"name": "excluded",
		"type": "bool"
	}
	],
	"name": "excludeFromFees",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "spender",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "addedValue",
		"type": "uint256"
	}
	],
	"name": "increaseAllowance",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "account",
		"type": "address"
	}],
	"name": "isExcludedFromFees",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "name",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "owner",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "rewardsWallet",
	"outputs": [{
		"internalType": "address",
		"name": "",
		"type": "address"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "uint256",
		"name": "_rewFee",
		"type": "uint256"
	}],
	"name": "setFees",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [],
	"name": "symbol",
	"outputs": [{
		"internalType": "string",
		"name": "",
		"type": "string"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "taxFee",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [],
	"name": "totalSupply",
	"outputs": [{
		"internalType": "uint256",
		"name": "",
		"type": "uint256"
	}],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "recipient",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
	],
	"name": "transfer",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "sender",
		"type": "address"
	},
	{
		"internalType": "address",
		"name": "recipient",
		"type": "address"
	},
	{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
	}
	],
	"name": "transferFrom",
	"outputs": [{
		"internalType": "bool",
		"name": "",
		"type": "bool"
	}],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "newOwner",
		"type": "address"
	}],
	"name": "transferOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "_token",
		"type": "address"
	}],
	"name": "transferTokens",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [{
		"internalType": "address",
		"name": "_newWallet",
		"type": "address"
	}],
	"name": "updateRewardsWallet",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}
]

export const faucetABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "distributedTokenRoot", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "claim",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "canClaim",
			"inputs": [
				{ "name": "user", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "_distributedTokenRoot",
			"inputs": [
			],
			"outputs": [
				{ "name": "_distributedTokenRoot", "type": "address" }
			]
		},
		{
			"name": "_distributedTokenWallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "_distributedTokenWallet", "type": "address" }
			]
		},
		{
			"name": "_await_ITokenRoot_deployWallet",
			"inputs": [
				{ "name": "value0", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_nonce", "type": "uint256" }
	],
	"events": [
		{
			"name": "claimEvent",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "owner", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_distributedTokenRoot", "type": "address" },
		{ "name": "_distributedTokenWallet", "type": "address" },
		{ "name": "claimed", "type": "map(address,bool)" }
	]
}

export const stakeABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [{
		"name": "constructor",
		"inputs": [
			{ "name": "stakeTokenRoot", "type": "address" },
			{ "name": "rewardTokenRoot", "type": "address" },
			{ "name": "minstake", "type": "uint256" },
			{ "name": "starttime", "type": "uint256" },
			{ "name": "endtime", "type": "uint256" },
			{ "name": "supply", "type": "uint256" },
			{ "name": "_owner", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "onRewardTokenWallet",
		"inputs": [
			{ "name": "value", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "stake",
		"inputs": [
			{ "name": "amount", "type": "uint128" },
			{ "name": "stakeOwner", "type": "address" },
			{ "name": "staked", "type": "uint256" },
			{ "name": "lastClaimed", "type": "uint256" },
			{ "name": "time", "type": "uint256" }
		],
		"outputs": []
	},
	{
		"name": "getRewards",
		"inputs": [
			{ "components": [{ "name": "amount", "type": "uint256" }, { "name": "lastReward", "type": "uint256" }, { "name": "owner", "type": "address" }], "name": "user", "type": "tuple" }
		],
		"outputs": [
			{ "name": "value0", "type": "uint256" }
		]
	},
	{
		"name": "claim",
		"inputs": [
			{ "name": "stakeOwner", "type": "address" },
			{ "name": "staked", "type": "uint128" },
			{ "name": "lastClaimed", "type": "uint256" },
			{ "name": "time", "type": "uint256" }
		],
		"outputs": []
	},
	{
		"name": "unstake",
		"inputs": [
			{ "name": "unstakeAmount", "type": "uint128" },
			{ "name": "stakeOwner", "type": "address" },
			{ "name": "staked", "type": "uint256" },
			{ "name": "lastClaimed", "type": "uint256" },
			{ "name": "time", "type": "uint256" }
		],
		"outputs": []
	},
	{
		"name": "getLeftOverTokens",
		"inputs": [
			{ "name": "receiver", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "getTokensByWallet",
		"inputs": [
			{ "name": "receiver", "type": "address" },
			{ "name": "wallet", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "_stakeTokenRoot",
		"inputs": [],
		"outputs": [
			{ "name": "_stakeTokenRoot", "type": "address" }
		]
	},
	{
		"name": "_rewardTokenRoot",
		"inputs": [],
		"outputs": [
			{ "name": "_rewardTokenRoot", "type": "address" }
		]
	},
	{
		"name": "_rewardTokenWallet",
		"inputs": [],
		"outputs": [
			{ "name": "_rewardTokenWallet", "type": "address" }
		]
	},
	{
		"name": "_minstake",
		"inputs": [],
		"outputs": [
			{ "name": "_minstake", "type": "uint256" }
		]
	},
	{
		"name": "_starttime",
		"inputs": [],
		"outputs": [
			{ "name": "_starttime", "type": "uint256" }
		]
	},
	{
		"name": "_endtime",
		"inputs": [],
		"outputs": [
			{ "name": "_endtime", "type": "uint256" }
		]
	},
	{
		"name": "_supply",
		"inputs": [],
		"outputs": [
			{ "name": "_supply", "type": "uint256" }
		]
	},
	{
		"name": "owner",
		"inputs": [],
		"outputs": [
			{ "name": "owner", "type": "address" }
		]
	},
	{
		"name": "totalRewardsDistributed",
		"inputs": [],
		"outputs": [
			{ "name": "totalRewardsDistributed", "type": "uint256" }
		]
	},
	{
		"name": "amountStaked",
		"inputs": [],
		"outputs": [
			{ "name": "amountStaked", "type": "uint256" }
		]
	},
	{
		"name": "_await_TIP3TokenWallet_balance",
		"inputs": [
			{ "name": "value0", "type": "uint128" }
		],
		"outputs": []
	}
	],
	"data": [
		{ "key": 1, "name": "_nonce", "type": "uint256" }
	],
	"events": [{
		"name": "stakeEvent",
		"inputs": [
			{ "name": "saleAddress", "type": "address" },
			{ "name": "amount", "type": "uint256" },
			{ "name": "single", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "claimEvent",
		"inputs": [
			{ "name": "saleAddress", "type": "address" },
			{ "name": "amount", "type": "uint256" },
			{ "name": "single", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "unstakeEvent",
		"inputs": [
			{ "name": "saleAddress", "type": "address" },
			{ "name": "amount", "type": "uint256" },
			{ "name": "single", "type": "address" }
		],
		"outputs": []
	}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_stakeTokenRoot", "type": "address" },
		{ "name": "_rewardTokenRoot", "type": "address" },
		{ "name": "_rewardTokenWallet", "type": "address" },
		{ "name": "_minstake", "type": "uint256" },
		{ "name": "_starttime", "type": "uint256" },
		{ "name": "_endtime", "type": "uint256" },
		{ "name": "_supply", "type": "uint256" },
		{ "name": "owner", "type": "address" },
		{ "name": "deployer", "type": "address" },
		{ "name": "totalRewardsDistributed", "type": "uint256" },
		{ "name": "amountStaked", "type": "uint256" }
	]
}


export const stakeSingleABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [{
		"name": "constructor",
		"inputs": [
			{ "name": "stakeTokenRoot", "type": "address" },
			{ "name": "minstake", "type": "uint256" }
		],
		"outputs": []
	},
	{
		"name": "onStakeTokenWallet",
		"inputs": [
			{ "name": "value", "type": "address" }
		],
		"outputs": []
	},
	{
		"name": "onAcceptTokensTransfer",
		"inputs": [
			{ "name": "tokenRoot", "type": "address" },
			{ "name": "amount", "type": "uint128" },
			{ "name": "value2", "type": "address" },
			{ "name": "senderWallet", "type": "address" },
			{ "name": "remainingGasTo", "type": "address" },
			{ "name": "payload", "type": "cell" }
		],
		"outputs": []
	},
	{
		"name": "claim",
		"inputs": [],
		"outputs": []
	},
	{
		"name": "unstake",
		"inputs": [
			{ "name": "_amount", "type": "uint256" }
		],
		"outputs": []
	},
	{
		"name": "getUserInfo",
		"inputs": [
			{ "name": "answerId", "type": "uint32" }
		],
		"outputs": [
			{ "components": [{ "name": "amount", "type": "uint256" }, { "name": "lastReward", "type": "uint256" }, { "name": "owner", "type": "address" }], "name": "value0", "type": "tuple" }
		]
	},
	{
		"name": "parent",
		"inputs": [],
		"outputs": [
			{ "name": "parent", "type": "address" }
		]
	},
	{
		"name": "owner",
		"inputs": [],
		"outputs": [
			{ "name": "owner", "type": "address" }
		]
	},
	{
		"name": "lastReward",
		"inputs": [],
		"outputs": [
			{ "name": "lastReward", "type": "uint256" }
		]
	},
	{
		"name": "staked",
		"inputs": [],
		"outputs": [
			{ "name": "staked", "type": "uint256" }
		]
	},
	{
		"name": "_stakeTokenRoot",
		"inputs": [],
		"outputs": [
			{ "name": "_stakeTokenRoot", "type": "address" }
		]
	},
	{
		"name": "_stakeTokenWallet",
		"inputs": [],
		"outputs": [
			{ "name": "_stakeTokenWallet", "type": "address" }
		]
	},
	{
		"name": "_minstake",
		"inputs": [],
		"outputs": [
			{ "name": "_minstake", "type": "uint256" }
		]
	},
	{
		"name": "_await_TIP3TokenWallet_balance",
		"inputs": [
			{ "name": "value0", "type": "uint128" }
		],
		"outputs": []
	}
	],
	"data": [
		{ "key": 1, "name": "parent", "type": "address" },
		{ "key": 2, "name": "owner", "type": "address" }
	],
	"events": [],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "parent", "type": "address" },
		{ "name": "owner", "type": "address" },
		{ "name": "lastReward", "type": "uint256" },
		{ "name": "staked", "type": "uint256" },
		{ "name": "_stakeTokenRoot", "type": "address" },
		{ "name": "_stakeTokenWallet", "type": "address" },
		{ "name": "_minstake", "type": "uint256" }
	]
}


export const saleABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "ownerAddress", "type": "address" },
				{ "name": "distributedTokenRoot", "type": "address" },
				{ "name": "rate", "type": "uint128" },
				{ "name": "minbuy", "type": "uint128" },
				{ "name": "maxbuy", "type": "uint128" },
				{ "name": "starttime", "type": "uint128" },
				{ "name": "endtime", "type": "uint128" },
				{ "name": "liqpercentage", "type": "uint128" },
				{ "name": "supply", "type": "uint256" },
				{ "name": "toRefund", "type": "bool" },
				{ "name": "softcap", "type": "uint128" },
				{ "name": "refBonusPercentage", "type": "uint128" },
				{ "name": "managerAddress", "type": "address" },
				{ "name": "liquidityAddress", "type": "address" },
				{ "name": "salePercentage", "type": "uint128" }
			],
			"outputs": [
			]
		},
		{
			"name": "makeCommitment",
			"inputs": [
				{ "name": "referrer", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "userSingle",
			"inputs": [
				{ "name": "account", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "emergencyRetrieveCommitments",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "isSaleOver",
			"inputs": [
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "retrieveCommitments",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "claimDistributedToken",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "getRefund",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "setManagerAddress",
			"inputs": [
				{ "name": "manager", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "setSaleState",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "setLiquidityAddress",
			"inputs": [
				{ "name": "liqwallet", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "setSalePercentage",
			"inputs": [
				{ "name": "salerPercent", "type": "uint128" }
			],
			"outputs": [
			]
		},
		{
			"name": "setRedeemed",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "getLeftOverTokens",
			"inputs": [
				{ "name": "receiver", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getLiquidityTokens",
			"inputs": [
				{ "name": "receiver", "type": "address" },
				{ "name": "amount", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "getTokensByWallet",
			"inputs": [
				{ "name": "receiver", "type": "address" },
				{ "name": "wallet", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getVenomBalance",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "uint128" }
			]
		},
		{
			"name": "_ownerAddress",
			"inputs": [
			],
			"outputs": [
				{ "name": "_ownerAddress", "type": "address" }
			]
		},
		{
			"name": "_managerContract",
			"inputs": [
			],
			"outputs": [
				{ "name": "_managerContract", "type": "address" }
			]
		},
		{
			"name": "_managerAddress",
			"inputs": [
			],
			"outputs": [
				{ "name": "_managerAddress", "type": "address" }
			]
		},
		{
			"name": "_liquidityAddress",
			"inputs": [
			],
			"outputs": [
				{ "name": "_liquidityAddress", "type": "address" }
			]
		},
		{
			"name": "_salePercentage",
			"inputs": [
			],
			"outputs": [
				{ "name": "_salePercentage", "type": "uint128" }
			]
		},
		{
			"name": "_distributedTokenRoot",
			"inputs": [
			],
			"outputs": [
				{ "name": "_distributedTokenRoot", "type": "address" }
			]
		},
		{
			"name": "_distributedTokenWallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "_distributedTokenWallet", "type": "address" }
			]
		},
		{
			"name": "_rate",
			"inputs": [
			],
			"outputs": [
				{ "name": "_rate", "type": "uint128" }
			]
		},
		{
			"name": "_minbuy",
			"inputs": [
			],
			"outputs": [
				{ "name": "_minbuy", "type": "uint128" }
			]
		},
		{
			"name": "_maxbuy",
			"inputs": [
			],
			"outputs": [
				{ "name": "_maxbuy", "type": "uint128" }
			]
		},
		{
			"name": "_starttime",
			"inputs": [
			],
			"outputs": [
				{ "name": "_starttime", "type": "uint128" }
			]
		},
		{
			"name": "_endtime",
			"inputs": [
			],
			"outputs": [
				{ "name": "_endtime", "type": "uint128" }
			]
		},
		{
			"name": "_liqpercentage",
			"inputs": [
			],
			"outputs": [
				{ "name": "_liqpercentage", "type": "uint128" }
			]
		},
		{
			"name": "_supply",
			"inputs": [
			],
			"outputs": [
				{ "name": "_supply", "type": "uint256" }
			]
		},
		{
			"name": "_toRefund",
			"inputs": [
			],
			"outputs": [
				{ "name": "_toRefund", "type": "bool" }
			]
		},
		{
			"name": "_softcap",
			"inputs": [
			],
			"outputs": [
				{ "name": "_softcap", "type": "uint128" }
			]
		},
		{
			"name": "_refBonusPercentage",
			"inputs": [
			],
			"outputs": [
				{ "name": "_refBonusPercentage", "type": "uint128" }
			]
		},
		{
			"name": "_reconciled",
			"inputs": [
			],
			"outputs": [
				{ "name": "_reconciled", "type": "bool" }
			]
		},
		{
			"name": "_startRedeem",
			"inputs": [
			],
			"outputs": [
				{ "name": "_startRedeem", "type": "bool" }
			]
		},
		{
			"name": "_totalCommited",
			"inputs": [
			],
			"outputs": [
				{ "name": "_totalCommited", "type": "uint128" }
			]
		},
		{
			"name": "_totalRefEarnings",
			"inputs": [
			],
			"outputs": [
				{ "name": "_totalRefEarnings", "type": "uint128" }
			]
		},
		{
			"name": "_await_ISaleSingle_resetToZero",
			"inputs": [
				{ "name": "value0", "type": "bool" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ISaleSingle_getInfo",
			"inputs": [
				{ "components": [{ "name": "commited", "type": "uint128" }, { "name": "refEarnings", "type": "uint128" }], "name": "value0", "type": "tuple" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ISaleSingle_updateCommit",
			"inputs": [
				{ "name": "value0", "type": "bool" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ISaleSingle_updateRef",
			"inputs": [
				{ "name": "value0", "type": "bool" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenWallet_balance",
			"inputs": [
				{ "name": "value0", "type": "uint128" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ITokenRoot_deployWallet",
			"inputs": [
				{ "name": "value0", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_owner", "type": "uint256" },
		{ "key": 2, "name": "_manager", "type": "uint256" },
		{ "key": 3, "name": "_nonce", "type": "uint256" },
		{ "key": 4, "name": "_singleCode", "type": "cell" }
	],
	"events": [
		{
			"name": "commitEvent",
			"inputs": [
				{ "name": "saleAddress", "type": "address" },
				{ "name": "amount", "type": "uint128" },
				{ "name": "buyer", "type": "address" },
				{ "name": "single", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "refundEvent",
			"inputs": [
				{ "name": "saleAddress", "type": "address" },
				{ "name": "amount", "type": "uint128" },
				{ "name": "sender", "type": "address" },
				{ "name": "single", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "claimEvent",
			"inputs": [
				{ "name": "saleAddress", "type": "address" },
				{ "name": "amount", "type": "uint128" },
				{ "name": "owner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "distributedClaim",
			"inputs": [
				{ "name": "saleAddress", "type": "address" },
				{ "name": "amount", "type": "uint128" },
				{ "name": "owner", "type": "address" },
				{ "name": "single", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "_owner", "type": "uint256" },
		{ "name": "_manager", "type": "uint256" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_singleCode", "type": "cell" },
		{ "name": "_ownerAddress", "type": "address" },
		{ "name": "_managerContract", "type": "address" },
		{ "name": "_managerAddress", "type": "address" },
		{ "name": "_liquidityAddress", "type": "address" },
		{ "name": "_salePercentage", "type": "uint128" },
		{ "name": "_distributedTokenRoot", "type": "address" },
		{ "name": "_distributedTokenWallet", "type": "address" },
		{ "name": "_rate", "type": "uint128" },
		{ "name": "_minbuy", "type": "uint128" },
		{ "name": "_maxbuy", "type": "uint128" },
		{ "name": "_starttime", "type": "uint128" },
		{ "name": "_endtime", "type": "uint128" },
		{ "name": "_liqpercentage", "type": "uint128" },
		{ "name": "_supply", "type": "uint256" },
		{ "name": "_toRefund", "type": "bool" },
		{ "name": "_softcap", "type": "uint128" },
		{ "name": "_refBonusPercentage", "type": "uint128" },
		{ "name": "_reconciled", "type": "bool" },
		{ "name": "_startRedeem", "type": "bool" },
		{ "name": "_totalCommited", "type": "uint128" },
		{ "name": "_totalRefEarnings", "type": "uint128" }
	]
}


export const saleSingleABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "_owner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "updateCommit",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "_amount", "type": "uint128" },
				{ "name": "_owner", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "updateRef",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "_amount", "type": "uint128" },
				{ "name": "_owner", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "resetToZero",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "_owner", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "getInfo",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "components": [{ "name": "commited", "type": "uint128" }, { "name": "refEarnings", "type": "uint128" }], "name": "value0", "type": "tuple" }
			]
		},
		{
			"name": "parent",
			"inputs": [
			],
			"outputs": [
				{ "name": "parent", "type": "address" }
			]
		},
		{
			"name": "owner",
			"inputs": [
			],
			"outputs": [
				{ "name": "owner", "type": "address" }
			]
		},
		{
			"name": "commited",
			"inputs": [
			],
			"outputs": [
				{ "name": "commited", "type": "uint128" }
			]
		},
		{
			"name": "refEarnings",
			"inputs": [
			],
			"outputs": [
				{ "name": "refEarnings", "type": "uint128" }
			]
		}
	],
	"data": [
		{ "key": 1, "name": "parent", "type": "address" },
		{ "key": 2, "name": "owner", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "parent", "type": "address" },
		{ "name": "owner", "type": "address" },
		{ "name": "commited", "type": "uint128" },
		{ "name": "refEarnings", "type": "uint128" }
	]
}


export const tokenWalletABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "supportsInterface",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "interfaceID", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "destroy",
			"inputs": [
				{ "name": "remainingGasTo", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "burnByRoot",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "callbackTo", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "burn",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "callbackTo", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "balance",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "uint128" }
			]
		},
		{
			"name": "owner",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "root",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "walletCode",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "cell" }
			]
		},
		{
			"name": "transfer",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "recipient", "type": "address" },
				{ "name": "deployWalletValue", "type": "uint128" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "notify", "type": "bool" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "transferToWallet",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "recipientTokenWallet", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "notify", "type": "bool" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "acceptTransfer",
			"id": "0x67A0B95F",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "sender", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "notify", "type": "bool" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "acceptMint",
			"id": "0x4384F298",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "notify", "type": "bool" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "sendSurplusGas",
			"inputs": [
				{ "name": "to", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "root_", "type": "address" },
		{ "key": 2, "name": "owner_", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "root_", "type": "address" },
		{ "name": "owner_", "type": "address" },
		{ "name": "balance_", "type": "uint128" }
	]
}

export const tokenRootABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "initialSupplyTo", "type": "address" },
				{ "name": "initialSupply", "type": "uint128" },
				{ "name": "deployWalletValue", "type": "uint128" },
				{ "name": "mintDisabled", "type": "bool" },
				{ "name": "burnByRootDisabled", "type": "bool" },
				{ "name": "burnPaused", "type": "bool" },
				{ "name": "remainingGasTo", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "supportsInterface",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "interfaceID", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "disableMint",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "mintDisabled",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "burnTokens",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "walletOwner", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "callbackTo", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "disableBurnByRoot",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "burnByRootDisabled",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "burnPaused",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "setBurnPaused",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "paused", "type": "bool" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "transferOwnership",
			"inputs": [
				{ "name": "newOwner", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
			],
			"outputs": [
			]
		},
		{
			"name": "name",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "string" }
			]
		},
		{
			"name": "symbol",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "string" }
			]
		},
		{
			"name": "decimals",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "uint8" }
			]
		},
		{
			"name": "totalSupply",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "uint128" }
			]
		},
		{
			"name": "walletCode",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "cell" }
			]
		},
		{
			"name": "rootOwner",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "walletOf",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "walletOwner", "type": "address" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "deployWallet",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "walletOwner", "type": "address" },
				{ "name": "deployWalletValue", "type": "uint128" }
			],
			"outputs": [
				{ "name": "tokenWallet", "type": "address" }
			]
		},
		{
			"name": "mint",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "recipient", "type": "address" },
				{ "name": "deployWalletValue", "type": "uint128" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "notify", "type": "bool" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "acceptBurn",
			"id": "0x192B51B1",
			"inputs": [
				{ "name": "amount", "type": "uint128" },
				{ "name": "walletOwner", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "callbackTo", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "sendSurplusGas",
			"inputs": [
				{ "name": "to", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "name_", "type": "string" },
		{ "key": 2, "name": "symbol_", "type": "string" },
		{ "key": 3, "name": "decimals_", "type": "uint8" },
		{ "key": 4, "name": "rootOwner_", "type": "address" },
		{ "key": 5, "name": "walletCode_", "type": "cell" },
		{ "key": 6, "name": "randomNonce_", "type": "uint256" },
		{ "key": 7, "name": "deployer_", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "name_", "type": "string" },
		{ "name": "symbol_", "type": "string" },
		{ "name": "decimals_", "type": "uint8" },
		{ "name": "rootOwner_", "type": "address" },
		{ "name": "walletCode_", "type": "cell" },
		{ "name": "totalSupply_", "type": "uint128" },
		{ "name": "burnPaused_", "type": "bool" },
		{ "name": "burnByRootDisabled_", "type": "bool" },
		{ "name": "mintDisabled_", "type": "bool" },
		{ "name": "randomNonce_", "type": "uint256" },
		{ "name": "deployer_", "type": "address" }
	]
}

export const indexABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["time"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "collection", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getInfo",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "collection", "type": "address" },
				{ "name": "owner", "type": "address" },
				{ "name": "nft", "type": "address" }
			]
		},
		{
			"name": "destruct",
			"inputs": [
				{ "name": "gasReceiver", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_nft", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_nft", "type": "address" },
		{ "name": "_collection", "type": "address" },
		{ "name": "_owner", "type": "address" }
	]
}

export const NFTABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "owner", "type": "address" },
				{ "name": "sendGasTo", "type": "address" },
				{ "name": "remainOnNft", "type": "uint128" },
				{ "name": "json", "type": "string" },
				{ "name": "indexDeployValue", "type": "uint128" },
				{ "name": "indexDestroyValue", "type": "uint128" },
				{ "name": "codeIndex", "type": "cell" },
				{ "components": [{ "name": "numerator", "type": "uint128" }, { "name": "denominator", "type": "uint128" }, { "name": "receiver", "type": "address" }], "name": "royalty", "type": "tuple" }
			],
			"outputs": [
			]
		},
		{
			"name": "burn",
			"inputs": [
				{ "name": "sendGasTo", "type": "address" },
				{ "name": "callbackTo", "type": "address" },
				{ "name": "callbackPayload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "royaltyInfo",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "salePrice", "type": "uint128" }
			],
			"outputs": [
				{ "name": "receiver", "type": "address" },
				{ "name": "royaltyAmount", "type": "uint128" }
			]
		},
		{
			"name": "indexCode",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "code", "type": "cell" }
			]
		},
		{
			"name": "indexCodeHash",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "hash", "type": "uint256" }
			]
		},
		{
			"name": "resolveIndex",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "collection", "type": "address" },
				{ "name": "owner", "type": "address" }
			],
			"outputs": [
				{ "name": "index", "type": "address" }
			]
		},
		{
			"name": "getJson",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "json", "type": "string" }
			]
		},
		{
			"name": "transfer",
			"inputs": [
				{ "name": "to", "type": "address" },
				{ "name": "sendGasTo", "type": "address" },
				{ "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
			],
			"outputs": [
			]
		},
		{
			"name": "changeOwner",
			"inputs": [
				{ "name": "newOwner", "type": "address" },
				{ "name": "sendGasTo", "type": "address" },
				{ "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
			],
			"outputs": [
			]
		},
		{
			"name": "changeManager",
			"inputs": [
				{ "name": "newManager", "type": "address" },
				{ "name": "sendGasTo", "type": "address" },
				{ "components": [{ "name": "value", "type": "uint128" }, { "name": "payload", "type": "cell" }], "name": "callbacks", "type": "map(address,tuple)" }
			],
			"outputs": [
			]
		},
		{
			"name": "getInfo",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "id", "type": "uint256" },
				{ "name": "owner", "type": "address" },
				{ "name": "manager", "type": "address" },
				{ "name": "collection", "type": "address" }
			]
		},
		{
			"name": "supportsInterface",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "interfaceID", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_id", "type": "uint256" }
	],
	"events": [
		{
			"name": "NftCreated",
			"inputs": [
				{ "name": "id", "type": "uint256" },
				{ "name": "owner", "type": "address" },
				{ "name": "manager", "type": "address" },
				{ "name": "collection", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "OwnerChanged",
			"inputs": [
				{ "name": "oldOwner", "type": "address" },
				{ "name": "newOwner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "ManagerChanged",
			"inputs": [
				{ "name": "oldManager", "type": "address" },
				{ "name": "newManager", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "NftBurned",
			"inputs": [
				{ "name": "id", "type": "uint256" },
				{ "name": "owner", "type": "address" },
				{ "name": "manager", "type": "address" },
				{ "name": "collection", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_supportedInterfaces", "type": "optional(cell)" },
		{ "name": "_id", "type": "uint256" },
		{ "name": "_collection", "type": "address" },
		{ "name": "_owner", "type": "address" },
		{ "name": "_manager", "type": "address" },
		{ "name": "_json", "type": "string" },
		{ "name": "_indexDeployValue", "type": "uint128" },
		{ "name": "_indexDestroyValue", "type": "uint128" },
		{ "name": "_codeIndex", "type": "cell" },
		{ "components": [{ "name": "numerator", "type": "uint128" }, { "name": "denominator", "type": "uint128" }, { "name": "receiver", "type": "address" }], "name": "_royalty", "type": "tuple" }
	]
}

export const nftSTakeABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "impulseNFTCollection", "type": "address" },
				{ "name": "rewardTokenRoot", "type": "address" },
				{ "name": "stakeNFTCollection", "type": "address" },
				{ "name": "amountOfTokenPerDayPerNFT", "type": "uint256" },
				{ "name": "possibleImpulseNFTToStake", "type": "uint256" },
				{ "name": "_owner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "stake",
			"inputs": [
				{ "name": "tokenId", "type": "uint256" },
				{ "name": "sender", "type": "address" },
				{ "name": "gasReceiver", "type": "address" },
				{ "name": "newOwner", "type": "address" },
				{ "name": "oldManager", "type": "address" },
				{ "name": "newManager", "type": "address" },
				{ "name": "payload", "type": "cell" },
				{ "name": "time", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "stakeImpulse",
			"inputs": [
				{ "name": "tokenId", "type": "uint256" },
				{ "name": "sender", "type": "address" },
				{ "name": "gasReceiver", "type": "address" },
				{ "name": "newOwner", "type": "address" },
				{ "name": "oldManager", "type": "address" },
				{ "name": "newManager", "type": "address" },
				{ "name": "payload", "type": "cell" },
				{ "name": "time", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "claimAll",
			"inputs": [
				{ "name": "delta", "type": "uint256" },
				{ "name": "user", "type": "address" },
				{ "name": "time", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "unStake",
			"inputs": [
				{ "name": "delta", "type": "uint256" },
				{ "name": "time", "type": "uint256" },
				{ "name": "user", "type": "address" },
				{ "name": "_id", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "unStakeImpulse",
			"inputs": [
				{ "name": "delta", "type": "uint256" },
				{ "name": "time", "type": "uint256" },
				{ "name": "user", "type": "address" },
				{ "name": "_id", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "getStuckedTokens",
			"inputs": [
				{ "name": "receiver", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getTokensByWallet",
			"inputs": [
				{ "name": "receiver", "type": "address" },
				{ "name": "wallet", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "updateDripStake",
			"inputs": [
				{ "name": "_newRewardPerDay", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "impulseStaked",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "uint256" }
			]
		},
		{
			"name": "_stakeNFTCollection",
			"inputs": [
			],
			"outputs": [
				{ "name": "_stakeNFTCollection", "type": "address" }
			]
		},
		{
			"name": "_rewardTokenRoot",
			"inputs": [
			],
			"outputs": [
				{ "name": "_rewardTokenRoot", "type": "address" }
			]
		},
		{
			"name": "_rewardTokenWallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "_rewardTokenWallet", "type": "address" }
			]
		},
		{
			"name": "rewardsPaid",
			"inputs": [
			],
			"outputs": [
				{ "name": "rewardsPaid", "type": "uint256" }
			]
		},
		{
			"name": "_rewardTokenDripRate",
			"inputs": [
			],
			"outputs": [
				{ "name": "_rewardTokenDripRate", "type": "uint256" }
			]
		},
		{
			"name": "_totalNFTStaked",
			"inputs": [
			],
			"outputs": [
				{ "name": "_totalNFTStaked", "type": "uint256" }
			]
		},
		{
			"name": "_impulseNFTCollection",
			"inputs": [
			],
			"outputs": [
				{ "name": "_impulseNFTCollection", "type": "address" }
			]
		},
		{
			"name": "_totalImpulseNFTStaked",
			"inputs": [
			],
			"outputs": [
				{ "name": "_totalImpulseNFTStaked", "type": "uint256" }
			]
		},
		{
			"name": "_possibleImpulseNFTToStake",
			"inputs": [
			],
			"outputs": [
				{ "name": "_possibleImpulseNFTToStake", "type": "uint256" }
			]
		},
		{
			"name": "_await_ITokenRoot_deployWallet",
			"inputs": [
				{ "name": "value0", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenWallet_balance",
			"inputs": [
				{ "name": "value0", "type": "uint128" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_nonce", "type": "uint256" }
	],
	"events": [
		{
			"name": "stakeEvent",
			"inputs": [
				{ "name": "tokenId", "type": "uint256" },
				{ "name": "sender", "type": "address" },
				{ "name": "newOwner", "type": "address" },
				{ "name": "oldManager", "type": "address" },
				{ "name": "newManager", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "claimEvent",
			"inputs": [
				{ "name": "amount", "type": "uint256" },
				{ "name": "user", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "unstakeEvent",
			"inputs": [
				{ "name": "collectionAddress", "type": "address" },
				{ "name": "tokenId", "type": "uint256" },
				{ "name": "user", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_stakeNFTCollection", "type": "address" },
		{ "name": "_rewardTokenRoot", "type": "address" },
		{ "name": "_rewardTokenWallet", "type": "address" },
		{ "name": "rewardsPaid", "type": "uint256" },
		{ "name": "_rewardTokenDripRate", "type": "uint256" },
		{ "name": "owner", "type": "address" },
		{ "name": "_totalNFTStaked", "type": "uint256" },
		{ "name": "_impulseNFTCollection", "type": "address" },
		{ "name": "_totalImpulseNFTStaked", "type": "uint256" },
		{ "name": "_possibleImpulseNFTToStake", "type": "uint256" }
	]
}

export const nftStakeSingleABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "owner", "type": "address" },
				{ "name": "impulseNFTCollection", "type": "address" },
				{ "name": "_timeframe", "type": "uint256" },
				{ "name": "stakeNFTCollection", "type": "address" },
				{ "name": "possibleImpulseNFTToStake", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "onNftTransfer",
			"inputs": [
				{ "name": "id", "type": "uint256" },
				{ "name": "oldOwner", "type": "address" },
				{ "name": "newOwner", "type": "address" },
				{ "name": "oldManager", "type": "address" },
				{ "name": "newManager", "type": "address" },
				{ "name": "collection", "type": "address" },
				{ "name": "gasReceiver", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "unStake",
			"inputs": [
				{ "name": "nft", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "unStakeImpulse",
			"inputs": [
				{ "name": "nft", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "claim",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "getStuckedNFT",
			"inputs": [
				{ "name": "nft", "type": "address" },
				{ "name": "receiver", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getAllStakedIds",
			"inputs": [
			],
			"outputs": [
				{ "name": "value0", "type": "address[]" }
			]
		},
		{
			"name": "getStakeIds",
			"inputs": [
			],
			"outputs": [
				{ "name": "value0", "type": "address[]" }
			]
		},
		{
			"name": "claimable",
			"inputs": [
				{ "name": "_rewardTokenDripRate", "type": "uint256" }
			],
			"outputs": [
				{ "components": [{ "name": "stakeId", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "tokenId", "type": "uint256" }], "name": "value0", "type": "tuple[]" }
			]
		},
		{
			"name": "isImpulseStaked",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "name": "value0", "type": "address" }
			]
		},
		{
			"name": "nftsStaked",
			"inputs": [
				{ "name": "answerId", "type": "uint32" }
			],
			"outputs": [
				{ "components": [{ "name": "nfts", "type": "uint256" }, { "name": "impulse", "type": "address" }], "name": "value0", "type": "tuple" }
			]
		},
		{
			"name": "parent",
			"inputs": [
			],
			"outputs": [
				{ "name": "parent", "type": "address" }
			]
		},
		{
			"name": "_owner",
			"inputs": [
			],
			"outputs": [
				{ "name": "_owner", "type": "address" }
			]
		},
		{
			"name": "_managerAddress",
			"inputs": [
			],
			"outputs": [
				{ "name": "_managerAddress", "type": "address" }
			]
		},
		{
			"name": "_impulseNFTCollection",
			"inputs": [
			],
			"outputs": [
				{ "name": "_impulseNFTCollection", "type": "address" }
			]
		},
		{
			"name": "_stakeNFTCollection",
			"inputs": [
			],
			"outputs": [
				{ "name": "_stakeNFTCollection", "type": "address" }
			]
		},
		{
			"name": "_possibleImpulseNFTToStake",
			"inputs": [
			],
			"outputs": [
				{ "name": "_possibleImpulseNFTToStake", "type": "uint256" }
			]
		},
		{
			"name": "_days",
			"inputs": [
			],
			"outputs": [
				{ "name": "_days", "type": "uint256" }
			]
		},
		{
			"name": "_await_INFTStake_totStaked",
			"inputs": [
				{ "name": "value0", "type": "uint256" },
				{ "name": "value1", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_INFTStake_impulseStaked",
			"inputs": [
				{ "name": "value0", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ITIP4_1NFT_getInfo",
			"inputs": [
				{ "name": "id", "type": "uint256" },
				{ "name": "owner", "type": "address" },
				{ "name": "manager", "type": "address" },
				{ "name": "collection", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_ITIP4_1Collection_nftAddress",
			"inputs": [
				{ "name": "nft", "type": "address" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "parent", "type": "address" },
		{ "key": 2, "name": "_owner", "type": "address" },
		{ "key": 3, "name": "_managerAddress", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "parent", "type": "address" },
		{ "name": "_owner", "type": "address" },
		{ "name": "_managerAddress", "type": "address" },
		{ "name": "_impulseNFTCollection", "type": "address" },
		{ "name": "_stakeNFTCollection", "type": "address" },
		{ "name": "_possibleImpulseNFTToStake", "type": "uint256" },
		{ "name": "_days", "type": "uint256" },
		{ "name": "_impulseStaked", "type": "address" },
		{ "name": "myStaked", "type": "uint256" },
		{ "components": [{ "name": "nft", "type": "address" }, { "name": "_owner", "type": "address" }, { "name": "collectionContract", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "stakedTimestamp", "type": "uint256" }, { "name": "lastClaimTimestamp", "type": "uint256" }], "name": "stakedNFTs", "type": "map(address,tuple)" }
	]
}


export const lockerABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "lockTokenRoot", "type": "address" },
				{ "name": "fee", "type": "uint256" },
				{ "name": "manager", "type": "address" },
				{ "components": [{ "name": "amount", "type": "uint256" }, { "name": "unlock", "type": "uint256" }, { "name": "recipient", "type": "address" }], "name": "locks", "type": "tuple[]" }
			],
			"outputs": [
			]
		},
		{
			"name": "onAcceptTokensTransfer",
			"inputs": [
				{ "name": "tokenRoot", "type": "address" },
				{ "name": "amount", "type": "uint128" },
				{ "name": "sender", "type": "address" },
				{ "name": "senderWallet", "type": "address" },
				{ "name": "remainingGasTo", "type": "address" },
				{ "name": "payload", "type": "cell" }
			],
			"outputs": [
			]
		},
		{
			"name": "isReady",
			"inputs": [
			],
			"outputs": [
				{ "name": "value0", "type": "bool" }
			]
		},
		{
			"name": "unLock",
			"inputs": [
				{ "name": "_lockId", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "increaseUnlock",
			"inputs": [
				{ "name": "_lockId", "type": "uint256" },
				{ "name": "_newTime", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "getLock",
			"inputs": [
				{ "name": "_lockid", "type": "uint256" }
			],
			"outputs": [
				{ "components": [{ "name": "amount", "type": "uint256" }, { "name": "unlock", "type": "uint256" }, { "name": "claimed", "type": "bool" }, { "name": "supplied", "type": "bool" }, { "name": "recipient", "type": "address" }], "name": "value0", "type": "tuple" }
			]
		},
		{
			"name": "setLockFee",
			"inputs": [
				{ "name": "fee", "type": "uint128" }
			],
			"outputs": [
			]
		},
		{
			"name": "setManager",
			"inputs": [
				{ "name": "manager", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getStuckedTokens",
			"inputs": [
				{ "name": "receiver", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "getTokensByWallet",
			"inputs": [
				{ "name": "receiver", "type": "address" },
				{ "name": "wallet", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "_lockTokenRoot",
			"inputs": [
			],
			"outputs": [
				{ "name": "_lockTokenRoot", "type": "address" }
			]
		},
		{
			"name": "_lockTokenWallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "_lockTokenWallet", "type": "address" }
			]
		},
		{
			"name": "_fee",
			"inputs": [
			],
			"outputs": [
				{ "name": "_fee", "type": "uint256" }
			]
		},
		{
			"name": "_manager",
			"inputs": [
			],
			"outputs": [
				{ "name": "_manager", "type": "address" }
			]
		},
		{
			"name": "allLockIds",
			"inputs": [
			],
			"outputs": [
				{ "name": "allLockIds", "type": "uint256[]" }
			]
		},
		{
			"name": "amountLocked",
			"inputs": [
			],
			"outputs": [
				{ "name": "amountLocked", "type": "uint256" }
			]
		},
		{
			"name": "_await_ITokenRoot_deployWallet",
			"inputs": [
				{ "name": "value0", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenWallet_balance",
			"inputs": [
				{ "name": "value0", "type": "uint128" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_nonce", "type": "uint256" }
	],
	"events": [
		{
			"name": "lockEvent",
			"inputs": [
				{ "name": "amount", "type": "uint256" },
				{ "name": "sender", "type": "address" },
				{ "name": "timestamp", "type": "uint128" }
			],
			"outputs": [
			]
		},
		{
			"name": "unlockEvent",
			"inputs": [
				{ "name": "amount", "type": "uint256" },
				{ "name": "recipient", "type": "address" },
				{ "name": "timestamp", "type": "uint128" }
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_lockTokenRoot", "type": "address" },
		{ "name": "_lockTokenWallet", "type": "address" },
		{ "name": "_fee", "type": "uint256" },
		{ "name": "_manager", "type": "address" },
		{ "components": [{ "name": "amount", "type": "uint256" }, { "name": "unlock", "type": "uint256" }, { "name": "claimed", "type": "bool" }, { "name": "supplied", "type": "bool" }, { "name": "recipient", "type": "address" }], "name": "lockIds", "type": "map(uint256,tuple)" },
		{ "name": "allLockIds", "type": "uint256[]" },
		{ "name": "amountLocked", "type": "uint256" }
	]
}

export const chefABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{ "name": "owner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "makePayment",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "getPayment",
			"inputs": [
				{ "name": "answerId", "type": "uint32" },
				{ "name": "_account", "type": "address" }
			],
			"outputs": [
				{ "components": [{ "name": "id", "type": "uint256" }, { "name": "amount", "type": "uint256" }], "name": "value0", "type": "tuple" }
			]
		},
		{
			"name": "updateOwner",
			"inputs": [
				{ "name": "newOwner", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "_managerAddress",
			"inputs": [
			],
			"outputs": [
				{ "name": "_managerAddress", "type": "address" }
			]
		}
	],
	"data": [
		{ "key": 1, "name": "_nonce", "type": "uint256" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_nonce", "type": "uint256" },
		{ "name": "_managerAddress", "type": "address" },
		{ "components": [{ "name": "id", "type": "uint256" }, { "name": "amount", "type": "uint256" }], "name": "payments", "type": "map(address,tuple)" }
	]
}

export const pairABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "onToken0Wallet",
			"inputs": [
				{"name":"value","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "onToken1Wallet",
			"inputs": [
				{"name":"value","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "getStartTime",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"uint128"}
			]
		},
		{
			"name": "reserveZero",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		},
		{
			"name": "reserveOne",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		},
		{
			"name": "addLiquidity",
			"inputs": [
				{"name":"in0","type":"uint256"},
				{"name":"in1","type":"uint256"},
				{"name":"time","type":"uint256"},
				{"name":"_owner","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "onAcceptTokensTransfer",
			"inputs": [
				{"name":"tokenRoot","type":"address"},
				{"name":"amount","type":"uint128"},
				{"name":"sender","type":"address"},
				{"name":"value3","type":"address"},
				{"name":"value4","type":"address"},
				{"name":"payload","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "liqOut",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"shares","type":"uint256"}
			],
			"outputs": [
				{"name":"value0","type":"uint256"},
				{"name":"value1","type":"uint256"}
			]
		},
		{
			"name": "_amountOut",
			"inputs": [
				{"name":"answerId","type":"uint32"},
				{"name":"_tokenRoot","type":"address"},
				{"name":"amount","type":"uint128"}
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		},
		{
			"name": "encoder",
			"inputs": [
				{"name":"min","type":"uint256"},
				{"name":"patch","type":"address"},
				{"name":"receiver","type":"address"},
				{"name":"stage","type":"uint8"}
			],
			"outputs": [
				{"name":"data","type":"cell"}
			]
		},
		{
			"name": "decodeSwapCell",
			"inputs": [
				{"name":"data","type":"cell"}
			],
			"outputs": [
				{"name":"minimum","type":"uint256"},
				{"name":"next_pair","type":"address"},
				{"name":"receiver","type":"address"},
				{"name":"stage","type":"uint8"}
			]
		},
		{
			"name": "removeAStucked",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "removeBStucked",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "lpStucked",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "emiter",
			"inputs": [
			],
			"outputs": [
				{"name":"emiter","type":"address"}
			]
		},
		{
			"name": "WVENOM",
			"inputs": [
			],
			"outputs": [
				{"name":"WVENOM","type":"address"}
			]
		},
		{
			"name": "token0",
			"inputs": [
			],
			"outputs": [
				{"name":"token0","type":"address"}
			]
		},
		{
			"name": "token1",
			"inputs": [
			],
			"outputs": [
				{"name":"token1","type":"address"}
			]
		},
		{
			"name": "token0Wallet",
			"inputs": [
			],
			"outputs": [
				{"name":"token0Wallet","type":"address"}
			]
		},
		{
			"name": "token1Wallet",
			"inputs": [
			],
			"outputs": [
				{"name":"token1Wallet","type":"address"}
			]
		},
		{
			"name": "reserve0",
			"inputs": [
			],
			"outputs": [
				{"name":"reserve0","type":"uint256"}
			]
		},
		{
			"name": "reserve1",
			"inputs": [
			],
			"outputs": [
				{"name":"reserve1","type":"uint256"}
			]
		},
		{
			"name": "totalSupply",
			"inputs": [
			],
			"outputs": [
				{"name":"totalSupply","type":"uint256"}
			]
		},
		{
			"name": "LPRoot",
			"inputs": [
			],
			"outputs": [
				{"name":"LPRoot","type":"address"}
			]
		},
		{
			"name": "startTime",
			"inputs": [
			],
			"outputs": [
				{"name":"startTime","type":"uint128"}
			]
		},
		{
			"name": "_await_ITokenRoot_walletOf",
			"inputs": [
				{"name":"value0","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenRoot_symbol",
			"inputs": [
				{"name":"value0","type":"string"}
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenWallet_balance",
			"inputs": [
				{"name":"value0","type":"uint128"}
			],
			"outputs": [
			]
		}
	],
	"data": [
		{"key":1,"name":"manager","type":"address"},
		{"key":2,"name":"_rootCode","type":"cell"},
		{"key":3,"name":"walletCode_","type":"cell"},
		{"key":4,"name":"_nonce","type":"uint256"},
		{"key":5,"name":"emiter","type":"address"},
		{"key":6,"name":"WVENOM","type":"address"},
		{"key":7,"name":"token0","type":"address"},
		{"key":8,"name":"token1","type":"address"},
		{"key":9,"name":"startTime","type":"uint128"}
	],
	"events": [
	],
	"fields": [
		{"name":"_pubkey","type":"uint256"},
		{"name":"_timestamp","type":"uint64"},
		{"name":"_constructorFlag","type":"bool"},
		{"name":"_await","type":"optional(cell)"},
		{"name":"manager","type":"address"},
		{"name":"_rootCode","type":"cell"},
		{"name":"walletCode_","type":"cell"},
		{"name":"_nonce","type":"uint256"},
		{"name":"emiter","type":"address"},
		{"name":"WVENOM","type":"address"},
		{"name":"token0","type":"address"},
		{"name":"token1","type":"address"},
		{"name":"token0Wallet","type":"address"},
		{"name":"token1Wallet","type":"address"},
		{"name":"reserve0","type":"uint256"},
		{"name":"reserve1","type":"uint256"},
		{"name":"totalSupply","type":"uint256"},
		{"name":"fee","type":"uint256"},
		{"name":"LPRoot","type":"address"},
		{"name":"startTime","type":"uint128"}
	]
}



export const singleABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "onToken0Wallet",
			"inputs": [
				{ "name": "value", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "onToken1Wallet",
			"inputs": [
				{ "name": "value", "type": "address" }
			],
			"outputs": [
			]
		},
		{
			"name": "addLiquidity",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "removeAStucked",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "removeBStucked",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "token0",
			"inputs": [
			],
			"outputs": [
				{ "name": "token0", "type": "address" }
			]
		},
		{
			"name": "token1",
			"inputs": [
			],
			"outputs": [
				{ "name": "token1", "type": "address" }
			]
		},
		{
			"name": "token0Wallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "token0Wallet", "type": "address" }
			]
		},
		{
			"name": "token1Wallet",
			"inputs": [
			],
			"outputs": [
				{ "name": "token1Wallet", "type": "address" }
			]
		},
		{
			"name": "_await_IPair_reserveZero",
			"inputs": [
				{ "name": "value0", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_IPair_reserveOne",
			"inputs": [
				{ "name": "value0", "type": "uint256" }
			],
			"outputs": [
			]
		},
		{
			"name": "_await_TIP3TokenWallet_balance",
			"inputs": [
				{ "name": "value0", "type": "uint128" }
			],
			"outputs": [
			]
		}
	],
	"data": [
		{ "key": 1, "name": "owner", "type": "address" },
		{ "key": 2, "name": "manager", "type": "address" },
		{ "key": 3, "name": "pair", "type": "address" },
		{ "key": 4, "name": "token0", "type": "address" },
		{ "key": 5, "name": "token1", "type": "address" }
	],
	"events": [
	],
	"fields": [
		{ "name": "_pubkey", "type": "uint256" },
		{ "name": "_timestamp", "type": "uint64" },
		{ "name": "_constructorFlag", "type": "bool" },
		{ "name": "_await", "type": "optional(cell)" },
		{ "name": "owner", "type": "address" },
		{ "name": "manager", "type": "address" },
		{ "name": "pair", "type": "address" },
		{ "name": "token0", "type": "address" },
		{ "name": "token1", "type": "address" },
		{ "name": "token0Wallet", "type": "address" },
		{ "name": "token1Wallet", "type": "address" },
		{ "name": "amount0", "type": "uint256" },
		{ "name": "amount1", "type": "uint256" }
	]
}

export const WVENOMABI = {
	"ABI version": 2,
	"data": [
		{
			"key": 1,
			"name": "name_",
			"type": "string"
		},
		{
			"key": 2,
			"name": "symbol_",
			"type": "string"
		},
		{
			"key": 3,
			"name": "decimals_",
			"type": "uint8"
		},
		{
			"key": 4,
			"name": "rootOwner_",
			"type": "address"
		},
		{
			"key": 5,
			"name": "walletCode_",
			"type": "cell"
		},
		{
			"key": 6,
			"name": "randomNonce_",
			"type": "uint256"
		},
		{
			"key": 7,
			"name": "deployer_",
			"type": "address"
		},
		{
			"key": 8,
			"name": "platformCode_",
			"type": "cell"
		}
	],
	"events": [],
	"fields": [
		{
			"name": "_pubkey",
			"type": "uint256"
		},
		{
			"name": "_timestamp",
			"type": "uint64"
		},
		{
			"name": "_constructorFlag",
			"type": "bool"
		},
		{
			"name": "name_",
			"type": "string"
		},
		{
			"name": "symbol_",
			"type": "string"
		},
		{
			"name": "decimals_",
			"type": "uint8"
		},
		{
			"name": "rootOwner_",
			"type": "address"
		},
		{
			"name": "walletCode_",
			"type": "cell"
		},
		{
			"name": "totalSupply_",
			"type": "uint128"
		},
		{
			"name": "burnPaused_",
			"type": "bool"
		},
		{
			"name": "burnByRootDisabled_",
			"type": "bool"
		},
		{
			"name": "mintDisabled_",
			"type": "bool"
		},
		{
			"name": "randomNonce_",
			"type": "uint256"
		},
		{
			"name": "deployer_",
			"type": "address"
		},
		{
			"name": "platformCode_",
			"type": "cell"
		},
		{
			"name": "walletVersion_",
			"type": "uint32"
		},
		{
			"name": "upgrade_assistant_admin",
			"type": "address"
		},
		{
			"name": "upgrade_assistant",
			"type": "address"
		},
		{
			"name": "legacy_vault",
			"type": "address"
		},
		{
			"name": "legacy_vault_token_wallet",
			"type": "address"
		},
		{
			"name": "legacy_vault_reserves",
			"type": "uint128"
		}
	],
	"functions": [
		{
			"inputs": [],
			"name": "constructor",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "legacy_vault_",
					"type": "address"
				}
			],
			"name": "setLegacyVault",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				}
			],
			"name": "setLegacyVaultReserves",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "delta",
					"type": "uint128"
				}
			],
			"name": "decreaseLegacyVaultReserves",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "delta",
					"type": "uint128"
				}
			],
			"name": "increaseLegacyVaultReserves",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "admin",
					"type": "address"
				}
			],
			"name": "setUpgradeAssistantAdmin",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "assistant",
					"type": "address"
				}
			],
			"name": "setUpgradeAssistant",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "recipient",
					"type": "address"
				},
				{
					"name": "deployWalletValue",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "mint",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				},
				{
					"name": "interfaceID",
					"type": "uint32"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "specialWalletOwners",
			"outputs": [
				{
					"name": "value0",
					"type": "address[]"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "currentVersion",
					"type": "uint32"
				},
				{
					"name": "walletOwner",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "requestUpgradeWallet",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "code",
					"type": "cell"
				}
			],
			"name": "setWalletCode",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "walletVersion",
			"outputs": [
				{
					"name": "value0",
					"type": "uint32"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "platformCode",
			"outputs": [
				{
					"name": "value0",
					"type": "cell"
				}
			]
		},
		{
			"id": "0x192B51B1",
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "walletOwner",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "callbackTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "acceptBurn",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "getReserves",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "walletOwner",
					"type": "address"
				},
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "acceptWrap",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "getReceiveSafeFee",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "getWrapDeployWalletValue",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "getInitialBalance",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [],
			"name": "grant",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "tokens",
					"type": "uint128"
				},
				{
					"name": "recipient",
					"type": "address"
				},
				{
					"name": "deployWalletValue",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "wrap",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "tokenRoot",
					"type": "address"
				},
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "sender",
					"type": "address"
				},
				{
					"name": "senderWallet",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "onAcceptTokensTransfer",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "wallets",
					"type": "address[]"
				},
				{
					"name": "accept_upgrade_value",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "upgradeWallets",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "code",
					"type": "cell"
				}
			],
			"name": "upgrade",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "disableMint",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "mintDisabled",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "walletOwner",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "callbackTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "burnTokens",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "disableBurnByRoot",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "burnByRootDisabled",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "burnPaused",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				},
				{
					"name": "paused",
					"type": "bool"
				}
			],
			"name": "setBurnPaused",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "newOwner",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"components": [
						{
							"name": "value",
							"type": "uint128"
						},
						{
							"name": "payload",
							"type": "cell"
						}
					],
					"name": "callbacks",
					"type": "map(address,tuple)"
				}
			],
			"name": "transferOwnership",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "name",
			"outputs": [
				{
					"name": "value0",
					"type": "string"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "symbol",
			"outputs": [
				{
					"name": "value0",
					"type": "string"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "decimals",
			"outputs": [
				{
					"name": "value0",
					"type": "uint8"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "totalSupply",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "walletCode",
			"outputs": [
				{
					"name": "value0",
					"type": "cell"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "rootOwner",
			"outputs": [
				{
					"name": "value0",
					"type": "address"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				},
				{
					"name": "walletOwner",
					"type": "address"
				}
			],
			"name": "walletOf",
			"outputs": [
				{
					"name": "value0",
					"type": "address"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				},
				{
					"name": "walletOwner",
					"type": "address"
				},
				{
					"name": "deployWalletValue",
					"type": "uint128"
				}
			],
			"name": "deployWallet",
			"outputs": [
				{
					"name": "tokenWallet",
					"type": "address"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "to",
					"type": "address"
				}
			],
			"name": "sendSurplusGas",
			"outputs": []
		},
		{
			"inputs": [],
			"name": "upgrade_assistant_admin",
			"outputs": [
				{
					"name": "upgrade_assistant_admin",
					"type": "address"
				}
			]
		},
		{
			"inputs": [],
			"name": "upgrade_assistant",
			"outputs": [
				{
					"name": "upgrade_assistant",
					"type": "address"
				}
			]
		},
		{
			"inputs": [],
			"name": "legacy_vault",
			"outputs": [
				{
					"name": "legacy_vault",
					"type": "address"
				}
			]
		},
		{
			"inputs": [],
			"name": "legacy_vault_token_wallet",
			"outputs": [
				{
					"name": "legacy_vault_token_wallet",
					"type": "address"
				}
			]
		},
		{
			"inputs": [],
			"name": "legacy_vault_reserves",
			"outputs": [
				{
					"name": "legacy_vault_reserves",
					"type": "uint128"
				}
			]
		}
	],
	"header": [
		"pubkey",
		"time",
		"expire"
	],
	"version": "2.2"
}

export const WVENOMWALLETABI = {
	"ABI version": 2,
	"data": [
		{
			"key": 1,
			"name": "root_",
			"type": "address"
		},
		{
			"key": 2,
			"name": "owner_",
			"type": "address"
		}
	],
	"events": [],
	"fields": [
		{
			"name": "_pubkey",
			"type": "uint256"
		},
		{
			"name": "_timestamp",
			"type": "uint64"
		},
		{
			"name": "_constructorFlag",
			"type": "bool"
		},
		{
			"name": "root_",
			"type": "address"
		},
		{
			"name": "owner_",
			"type": "address"
		},
		{
			"name": "balance_",
			"type": "uint128"
		},
		{
			"name": "version_",
			"type": "uint32"
		},
		{
			"name": "platformCode_",
			"type": "cell"
		}
	],
	"functions": [
		{
			"inputs": [],
			"name": "constructor",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				},
				{
					"name": "interfaceID",
					"type": "uint32"
				}
			],
			"name": "supportsInterface",
			"outputs": [
				{
					"name": "value0",
					"type": "bool"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "specialWalletOwners",
			"outputs": [
				{
					"name": "value0",
					"type": "address[]"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "platformCode",
			"outputs": [
				{
					"name": "value0",
					"type": "cell"
				}
			]
		},
		{
			"id": "0x15A038FB",
			"inputs": [
				{
					"name": "value0",
					"type": "cell"
				},
				{
					"name": "value1",
					"type": "uint32"
				},
				{
					"name": "sender",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "onDeployRetry",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "version",
			"outputs": [
				{
					"name": "value0",
					"type": "uint32"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "upgrade",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "newCode",
					"type": "cell"
				},
				{
					"name": "newVersion",
					"type": "uint32"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "acceptUpgrade",
			"outputs": []
		},
		{
			"id": "0x4384F298",
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "acceptMint",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "recipient",
					"type": "address"
				},
				{
					"name": "deployWalletValue",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "transfer",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "deployWalletValue",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "acceptNative",
			"outputs": []
		},
		{
			"id": "0x67A0B95F",
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "sender",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "acceptTransfer",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "callbackTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "burnByRoot",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "remainingGasTo",
					"type": "address"
				}
			],
			"name": "destroy",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "callbackTo",
					"type": "address"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "burn",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "balance",
			"outputs": [
				{
					"name": "value0",
					"type": "uint128"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "owner",
			"outputs": [
				{
					"name": "value0",
					"type": "address"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "root",
			"outputs": [
				{
					"name": "value0",
					"type": "address"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "answerId",
					"type": "uint32"
				}
			],
			"name": "walletCode",
			"outputs": [
				{
					"name": "value0",
					"type": "cell"
				}
			]
		},
		{
			"inputs": [
				{
					"name": "amount",
					"type": "uint128"
				},
				{
					"name": "recipientTokenWallet",
					"type": "address"
				},
				{
					"name": "remainingGasTo",
					"type": "address"
				},
				{
					"name": "notify",
					"type": "bool"
				},
				{
					"name": "payload",
					"type": "cell"
				}
			],
			"name": "transferToWallet",
			"outputs": []
		},
		{
			"inputs": [
				{
					"name": "to",
					"type": "address"
				}
			],
			"name": "sendSurplusGas",
			"outputs": []
		}
	],
	"header": [
		"pubkey",
		"time",
		"expire"
	],
	"version": "2.2"
}


