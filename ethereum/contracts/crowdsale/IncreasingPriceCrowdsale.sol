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

        periods = _periods;
        rates = _rates;
    }

    function getPeriods() public view returns (uint256[] memory) {
        return periods;
    }

    function getRates() public view returns (uint256[] memory) {
        return rates;
    }

    function getCurrentPhase() public view returns (uint256, bool) {
        uint256 nextPeriodStartTime = startTime;
        for (uint256 i = 0; i < periods.length; ++i) {
            uint256 nextPeriodEndTime = nextPeriodStartTime.add(periods[i]);
            if (block.timestamp < nextPeriodEndTime) {
                return (i, true);
            }
            nextPeriodStartTime = nextPeriodEndTime;
        }
        return (0, false);
    }

    function getCurrentRate() public view returns (uint256) {
        (uint256 index, bool success) = getCurrentPhase();
        return success ? rates[index] : rate;
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
