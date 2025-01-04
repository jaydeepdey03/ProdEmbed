import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY!,
});


/* tslint:disable:no-unused-variable */
export const promptText = `
# This prompt is designed to help an AI model understand code examples from Solidity programming languages to Cairo Programming Language and vice-versa. The goal is to enable the AI model to generate equivalent code in the second language based on the provided example in the first language and vice-versa.

Data Type in solidity and Cairo


# Example 1: Solidity to Cairo


string in solidity is equivalent to ByteArray in Cairo

# Solidity code:

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private counter;
    uint256[] private values; // Updated array to uint256 for consistency

    // Events
    event CounterUpdated(address indexed updater, uint256 newCounter);
    event ValueAddedToArray(address indexed sender, uint256 value);

    // Constructor to initialize the counter
    constructor() {
        counter = 0;
    }

    // Function to update the counter value
    function setCounter(uint256 _counter) public {
        counter = _counter;
        emit CounterUpdated(msg.sender, _counter);
    }

    // Function to retrieve the current counter value
    function getCounterValue() public view returns (uint256) {
        return counter;
    }

    // Function to increment the counter value
    function incrementCounter() public {
        counter++;
        emit CounterUpdated(msg.sender, counter);
    }

    // Function to decrement the counter value
    function decrementCounter() public {
        require(counter > 0, "Counter can't be negative");
        counter--;
        emit CounterUpdated(msg.sender, counter);
    }

    // Function to add a value to the array
    function addValueToArray(uint256 _value) public {
        values.push(_value);
        emit ValueAddedToArray(msg.sender, _value);
    }

    // Function to get the length of the array
    function getArrayLength() public view returns (uint256) {
        return values.length;
    }

    // Function to get a value from the array by index
    function getArrayValue(uint256 index) public view returns (uint256) {
        require(index < values.length, "Index out of bounds");
        return values[index];
    }
}

# Cairo equivalent:


use core::starknet::{ContractAddress};

// Define an interface 'ICounter' for interacting with the contract
#[starknet::interface]
pub trait ICounter<TContractState> {
    fn set_count(ref self: TContractState, new_count: u64); // Sets the 'count value
    fn get_count(self: @TContractState) -> u64; // Gets the current 'count value
    fn increase_count(ref self: TContractState); // Increases the 'count by 1
    fn decrease_count(ref self: TContractState); // Decreases the 'count by 1
    fn get_user(self: @TContractState) -> ContractAddress; // Returns the caller's address

    // Functions to manage an array
    fn add_value_to_array(ref self: TContractState, value: u64); // Adds a value to the array
    fn get_array_length(self: @TContractState) -> u64; // Gets the array's length
    fn get_array(self: @TContractState) -> Array<u64>; // Returns the entire array
    // Modify a specific index of the array
    fn modify_nth_address(ref self: TContractState, index: u64, value: u64);
    fn get_array_element(
        self: @TContractState, index: u64,
    ) -> Option<u64>; // Gets an element by index

    // Functions for managing a mapping
    fn setMap(ref self: TContractState, value: u64); // Maps a 'value' to the caller's address
    fn getMap(
        self: @TContractState, value: u64,
    ) -> ContractAddress; // Gets the mapped address for a 'value'


    fn add_user_to_array(ref self: TContractState, value: ByteArray);
}

#[starknet::contract]
mod Counter {
    use super::ICounter;
    use core::starknet::{ContractAddress, get_caller_address};
    use core::starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait, MutableVecTrait, Map,
        StoragePathEntry,
    };

    // Define the storage structure for the contract
    #[storage]
    pub struct Storage {
        count: u64, // Holds a single count value
        arr: Vec<u64>, // A vector to store u64 values
        address_mapping: Map<
            u64, ContractAddress,
        > // A mapping of u64 keys to ContractAddress values


        user_arr: Vec<ByteArray>,
        boolean_arr: Vec<boo>,
    }

    // Constructor to initialize the contract's state
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.count.write(0); // Initialize the count to 0
    }

    // Events emitted by the contract
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        CounterEmission: CounterEmission, // Emitted when 'count changes
        ArrayValueAddition: ArrayValueAddition // Emitted when a value is added to the array
    }

    // Event structure for 'CounterEmission'
    #[derive(Drop, starknet::Event)]
    pub struct CounterEmission {
        pub counter: u64 // The new value of 'count
    }

    // Event structure for 'ArrayValueAddition'
    #[derive(Drop, starknet::Event)]
    pub struct ArrayValueAddition {
        pub value: u64 // The value added to the array
    }

    // Implementation of the 'ICounter' interface
    #[abi(embed_v0)]
    impl CounterImpl of ICounter<ContractState> {
        // Sets the 'count value and emits an event
        fn set_count(ref self: ContractState, new_count: u64) {
            self.count.write(new_count);
            self.emit(CounterEmission { counter: new_count });
        }

        // Returns the current value of 'count
        fn get_count(self: @ContractState) -> u64 {
            self.count.read()
        }

        // Increases the value of 'count by 1
        fn increase_count(ref self: ContractState) {
            assert!(self.count.read() > 0, "Count cannot be negative");
            self.count.write(self.count.read() + 1);
            self.emit(CounterEmission { counter: self.count.read() });
        }

        // Decreases the value of 'count by 1
        fn decrease_count(ref self: ContractState) {
            assert!(self.count.read() > 0, "Count cannot be negative");
            self.count.write(self.count.read() - 1);
            self.emit(CounterEmission { counter: self.count.read() });
        }

        // Returns the caller's contract address
        fn get_user(self: @ContractState) -> ContractAddress {
            let owner = get_caller_address();
            owner
        }

        // Adds a value to the 'arr' vector and emits an event
        fn add_value_to_array(ref self: ContractState, value: u64) {
            self.arr.append().write(value);
            self.emit(ArrayValueAddition { value });
        }

        fn add_user_to_array(ref self: ContractState, value: ByteArray) {
            self.user_arr.append().write(value);
        }

        // Returns the length of the 'arr' vector
        fn get_array_length(self: @ContractState) -> u64 {
            self.arr.len() // len() returns u64
        }

        // Gets an element from the array at the specified index
        fn get_array_element(self: @ContractState, index: u64) -> Option<u64> {
            if let Option::Some(storage_ptr) = self.arr.get(index) {
                return Option::Some(storage_ptr.read());
            }
            return Option::None;
        }

        // Modifies the value at a specific index in the array
        fn modify_nth_address(ref self: ContractState, index: u64, value: u64) {
            if let Option::Some(storage_ptr) = self.arr.get(index) {
                storage_ptr.write(value);
            } else {
                panic!("Index out of bounds");
            }
        }

        // Returns the entire array as a new array
        fn get_array(self: @ContractState) -> Array<u64> {
            let mut arr1 = array![];
            for i in 0..self.arr.len() {
                arr1.append(self.arr.at(i).read());
            };
            arr1
        }

        // Sets a mapping of 'value' to the caller's contract address
        fn setMap(ref self: ContractState, value: u64) {
            let caller = get_caller_address();
            self.address_mapping.entry(value).write(caller);
        }

        // Gets the address mapped to a given 'value'
        fn getMap(self: @ContractState, value: u64) -> ContractAddress {
            self.address_mapping.entry(value).read()
        }
    }
}
`




const prompt = new PromptTemplate({
    template: "How to convert the given {inputLanguage} which is given as follows to {outputLanguage} code? {inputCode}",
    inputVariables: ["inputLanguage", "inputCode", "outputLanguage"],
});


export const chain = prompt.pipe(llm);


export const solidityCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EchoVerse {
    uint public postCount = 0;
    uint public replyCount = 0;

    struct Post {
        uint id;
        address author;
        string title;
        string content;
        string[] tags;
        uint timestamp;
    }

    struct Reply {
        uint id;
        uint postId;
        address replier;
        string content;
        uint timestamp;
    }

    mapping(uint => Post) public posts;
    mapping(uint => Reply) public replies;
    mapping(uint => uint[]) public postReplies;

    event PostCreated(
        uint id,
        address author,
        string title,
        string content,
        string[] tags,
        uint timestamp
    );
    event ReplyCreated(
        uint id,
        uint postId,
        address replier,
        string content,
        uint timestamp
    );

    function createPost(
        string memory _title,
        string memory _content,
        string[] memory _tags
    ) public {
        postCount++;
        posts[postCount] = Post(
            postCount,
            msg.sender,
            _title,
            _content,
            _tags,
            block.timestamp
        );
        emit PostCreated(
            postCount,
            msg.sender,
            _title,
            _content,
            _tags,
            block.timestamp
        );
    }

    function replyToPost(uint _postId, string memory _content) public {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        replyCount++;
        replies[replyCount] = Reply(
            replyCount,
            _postId,
            msg.sender,
            _content,
            block.timestamp
        );
        postReplies[_postId].push(replyCount);
        emit ReplyCreated(
            replyCount,
            _postId,
            msg.sender,
            _content,
            block.timestamp
        );
    }

    function getPost(
        uint _postId
    )
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string[] memory,
            uint
        )
    {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        Post memory post = posts[_postId];
        return (
            post.id,
            post.author,
            post.title,
            post.content,
            post.tags,
            post.timestamp
        );
    }

    function getReply(
        uint _replyId
    ) public view returns (uint, uint, address, string memory, uint) {
        require(_replyId > 0 && _replyId <= replyCount, "Reply does not exist");
        Reply memory reply = replies[_replyId];
        return (
            reply.id,
            reply.postId,
            reply.replier,
            reply.content,
            reply.timestamp
        );
    }

    function getPostReplies(uint _postId) public view returns (uint[] memory) {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        return postReplies[_postId];
    }

    function getAllPosts()
        public
        view
        returns (
            uint[] memory,
            address[] memory,
            string[] memory,
            string[] memory,
            string[][] memory,
            uint[] memory
        )
    {
        uint[] memory ids = new uint[](postCount);
        address[] memory authors = new address[](postCount);
        string[] memory titles = new string[](postCount);
        string[] memory contents = new string[](postCount);
        string[][] memory tagsArray = new string[][](postCount);
        uint[] memory timestamps = new uint[](postCount);

        for (uint i = 1; i <= postCount; i++) {
            Post memory post = posts[i];
            ids[i - 1] = post.id;
            authors[i - 1] = post.author;
            titles[i - 1] = post.title;
            contents[i - 1] = post.content;
            tagsArray[i - 1] = post.tags;
            timestamps[i - 1] = post.timestamp;
        }

        return (ids, authors, titles, contents, tagsArray, timestamps);
    }

    function getPostWithReplies(
        uint _postId
    )
        public
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string[] memory,
            uint,
            uint[] memory
        )
    {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        Post memory post = posts[_postId];
        uint[] memory replyIds = postReplies[_postId];
        return (
            post.id,
            post.author,
            post.title,
            post.content,
            post.tags,
            post.timestamp,
            replyIds
        );
    }
}
` 