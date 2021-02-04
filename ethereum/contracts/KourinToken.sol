pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract KourinToken is ERC20, ERC20Capped, ERC20Burnable {
    string public constant TOKEN_NAME = "KourinToken";
    string public constant TOKEN_SYMBOL = "KT";
    uint256 public constant TOKEN_CAPACITY = 10**(18 + 6);

    constructor()
        public
        ERC20(TOKEN_NAME, TOKEN_SYMBOL)
        ERC20Capped(TOKEN_CAPACITY)
    {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Capped) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
