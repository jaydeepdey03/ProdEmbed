use core::starknet::{ContractAddress};

#[starknet::interface]
pub trait ITokenTransfer<TContractState> {
    fn transfer_eth(ref self: TContractState, recipient: ContractAddress, amount: u256);
}

#[starknet::contract]
pub mod TokenTransfer {
    use super::{ITokenTransfer};
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use core::starknet::{
        ContractAddress, contract_address_const, get_caller_address, get_contract_address,
    };
    // use core::starknet::storage::{
    //     StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait, Map,
    //     StoragePathEntry,
    // };

    const ETH_CONTRACT_ADDRESS: felt252 =
        0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7;


    #[storage]
    struct Storage {
        token_address: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        TransferMoney: TransferMoney,
    }

    #[derive(Drop, starknet::Event)]
    struct TransferMoney {
        token_address: ContractAddress,
    }


    #[abi(embed_v0)]
    impl TokenTransferImpl of ITokenTransfer<ContractState> {
        fn transfer_eth(
            ref self: ContractState,
            recipient: core::starknet::contract_address::ContractAddress,
            amount: u256,
        ) {
            let eth_contract_address = contract_address_const::<ETH_CONTRACT_ADDRESS>();
            let user = get_caller_address();
            let contract = get_contract_address();

            self.emit(TransferMoney { token_address: eth_contract_address });
        }
    }
}

