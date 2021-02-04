pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Crowdsale.sol";
import "./TimedCrowdsale.sol";
import "./IncreasingPriceCrowdsale.sol";

contract KourinTokenCrowdsale is
    Crowdsale,
    TimedCrowdsale,
    IncreasingPriceCrowdsale
{
    constructor(
        ERC20 _token,
        address payable _wallet,
        uint256 _rate,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256[] memory _periods,
        uint256[] memory _rates
    )
        Crowdsale(_token, _wallet, _rate)
        TimedCrowdsale(_openingTime, _closingTime)
        IncreasingPriceCrowdsale(_periods, _rates)
    {}

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount)
        internal
        override(Crowdsale, TimedCrowdsale)
    {
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }

    function _getTokenAmount(uint256 _weiAmount)
        internal
        view
        override(Crowdsale, IncreasingPriceCrowdsale)
        returns (uint256)
    {
        return super._getTokenAmount(_weiAmount);
    }
}
