pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface ICrowdsale {
    event TokenPurchase(
        address indexed purchaser,
        address indexed beneficary,
        uint256 value,
        uint256 amount
    );

    receive() external payable;

    function buyTokens(address) external payable;
}
