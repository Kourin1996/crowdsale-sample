pragma solidity ^0.7.6;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Crowdsale.sol";

abstract contract TimedCrowdsale is Crowdsale {
    using SafeMath for uint256;

    uint256 public openingTime;

    uint256 public closingTime;

    modifier onlyWhileOpen {
        require(
            block.timestamp >= openingTime && block.timestamp <= closingTime,
            "Crowdsale is not open"
        );
        _;
    }

    constructor(uint256 _openingTime, uint256 _closingTime) {
        require(
            _openingTime >= block.timestamp,
            "Opening time must be greater than latest timestamp"
        );
        require(
            _closingTime >= _openingTime,
            "Closing time must be greater than opening time"
        );

        startTime = _openingTime;
        openingTime = _openingTime;
        closingTime = _closingTime;
    }

    function hasStarted() public view returns (bool) {
        return block.timestamp >= openingTime;
    }

    function hasClosed() public view returns (bool) {
        return block.timestamp > closingTime;
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount)
        internal
        virtual
        override
        onlyWhileOpen
    {
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }
}
