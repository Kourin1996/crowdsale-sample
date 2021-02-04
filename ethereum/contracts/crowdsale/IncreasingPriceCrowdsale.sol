pragma solidity ^0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Crowdsale.sol";

abstract contract IncreasingPriceCrowdsale is Crowdsale {
    using SafeMath for uint256;

    uint256[] public periods;

    uint256[] public rates;

    constructor(uint256[] memory _periods, uint256[] memory _rates) {
        require(
            _periods.length == _rates.length,
            "Periods and Rates must have same length"
        );

        uint256 lastPeriod = 0;
        for (uint256 i = 0; i < _periods.length; i++) {
            require(
                _periods[i] > lastPeriod,
                "Periods must be in ascending order"
            );
            require(_rates[i] > 0, "Rate must not be zero");
            lastPeriod = _periods[i];
        }

        periods = _periods;
        rates = _rates;
    }

    function getCurrentRate() public view returns (uint256) {
        uint256 nextPeriodStartTime = startTime;
        for (uint256 i = 0; i < periods.length; ++i) {
            uint256 nextPeriodEndTime = nextPeriodStartTime.add(periods[i]);
            if (block.timestamp < nextPeriodEndTime) {
                return rates[i];
            }
            nextPeriodStartTime = nextPeriodEndTime;
        }
        return rate;
    }

    function _getTokenAmount(uint256 _weiAmount)
        internal
        view
        virtual
        override
        returns (uint256)
    {
        uint256 currentRate = getCurrentRate();
        return currentRate.mul(_weiAmount);
    }
}