export const starknetCounterAbi = [
    {
        "type": "impl",
        "name": "CounterImpl",
        "interface_name": "starknetcontract::counter::ICounter"
    },
    {
        "type": "enum",
        "name": "core::option::Option::<core::integer::u64>",
        "variants": [
            {
                "name": "Some",
                "type": "core::integer::u64"
            },
            {
                "name": "None",
                "type": "()"
            }
        ]
    },
    {
        "type": "struct",
        "name": "core::byte_array::ByteArray",
        "members": [
            {
                "name": "data",
                "type": "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
                "name": "pending_word",
                "type": "core::felt252"
            },
            {
                "name": "pending_word_len",
                "type": "core::integer::u32"
            }
        ]
    },
    {
        "type": "interface",
        "name": "starknetcontract::counter::ICounter",
        "items": [
            {
                "type": "function",
                "name": "set_count",
                "inputs": [
                    {
                        "name": "new_count",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_count",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::integer::u64"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "increase_count",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "decrease_count",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_user",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "add_value_to_array",
                "inputs": [
                    {
                        "name": "value",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_array_length",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::integer::u64"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "get_array",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::array::Array::<core::integer::u64>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "modify_nth_address",
                "inputs": [
                    {
                        "name": "index",
                        "type": "core::integer::u64"
                    },
                    {
                        "name": "value",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_array_element",
                "inputs": [
                    {
                        "name": "index",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::option::Option::<core::integer::u64>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "setMap",
                "inputs": [
                    {
                        "name": "value",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "getMap",
                "inputs": [
                    {
                        "name": "value",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "add_user_to_array",
                "inputs": [
                    {
                        "name": "value",
                        "type": "core::byte_array::ByteArray"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "constructor",
        "name": "constructor",
        "inputs": []
    },
    {
        "type": "event",
        "name": "starknetcontract::counter::Counter::CounterEmission",
        "kind": "struct",
        "members": [
            {
                "name": "counter",
                "type": "core::integer::u64",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "starknetcontract::counter::Counter::ArrayValueAddition",
        "kind": "struct",
        "members": [
            {
                "name": "value",
                "type": "core::integer::u64",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "starknetcontract::counter::Counter::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "CounterEmission",
                "type": "starknetcontract::counter::Counter::CounterEmission",
                "kind": "nested"
            },
            {
                "name": "ArrayValueAddition",
                "type": "starknetcontract::counter::Counter::ArrayValueAddition",
                "kind": "nested"
            }
        ]
    }
]