// @openzeppelin v4.6.0
pragma solidity ^0.8.4;

import "./lib/oz/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract GreenerGrocer is ERC721PresetMinterPauserAutoId {

    constructor() public
	ERC721PresetMinterPauserAutoId("GreenerGrocer", "GG", "https://media.istockphoto.com/vectors/hand-drawn-oak-tree-with-lush-green-crown-illustration-vector-id1212563426?b=1&k=20&m=1212563426&s=612x612&w=0&h=GwnHpk-Sl5l6SIaa3wLfsapHAQXUJWoXoiJ2A2TOLz8=")
	{}

}
