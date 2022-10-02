pragma solidity ^0.8.0;

import https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol;

contract NFT is ERC1155 {
    uint256 public constant NFT = 0;

    constructor() ERC1155("https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec") {
        _mint(msg.sender, NFT, 1, "");
    }
}
