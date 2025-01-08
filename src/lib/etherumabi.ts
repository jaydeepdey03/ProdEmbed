export const ethereumabi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_productImage",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_stock",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_isEthereum",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "_isStarknet",
                "type": "bool"
            }
        ],
        "name": "addProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_image",
                "type": "string"
            }
        ],
        "name": "createDashboard",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "merchant",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "dashboardId",
                "type": "string"
            }
        ],
        "name": "DashboardCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "merchant",
                "type": "address"
            }
        ],
        "name": "MerchantRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "merchant",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "dashboardId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "productId",
                "type": "string"
            }
        ],
        "name": "ProductAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "merchant",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "dashboardId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "productId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "ProductPurchased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchant",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_productId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "purchaseProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchant",
                "type": "address"
            }
        ],
        "name": "getAllDashboards",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchant",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            }
        ],
        "name": "getDashboardDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchant",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            }
        ],
        "name": "getDashboardInventory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "productId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productImage",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isEthereum",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isStarknet",
                        "type": "bool"
                    }
                ],
                "internalType": "struct MerchantDashboard.Product[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchantsAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_productId",
                "type": "string"
            }
        ],
        "name": "getProductDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "productId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productImage",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stock",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isEthereum",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isStarknet",
                        "type": "bool"
                    }
                ],
                "internalType": "struct MerchantDashboard.Product",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_merchant",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dashboardApiKey",
                "type": "string"
            }
        ],
        "name": "getPurchaseHistory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "productId",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MerchantDashboard.Purchase[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]