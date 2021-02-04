pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "./ICrowdsale.sol";

contract Crowdsale is ICrowdsale, Context {
    using SafeMath for uint256;

    ERC20 public token;

    address payable public wallet;

    uint256 public rate;

    uint256 public weiRaised;

    constructor(
        ERC20 _token,
        address payable _wallet,
        uint256 _rate
    ) public {
        require(
            address(_token) != address(0),
            "Token address must not be zero"
        );
        require(_wallet != address(0), "Wallet address must not be zero");
        require(_rate > 0, "Rate must not be zero");

        token = _token;
        wallet = _wallet;
        rate = _rate;
    }

    function receive() external payable override {
        buyTokens(_msgSender());
    }

    function buyTokens(address _beneficiary) public payable override {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(_beneficiary, weiAmount);

        uint256 tokens = _getTokenAmount(weiAmount);

        weiRaised = weiRaised.add(weiAmount);

        _processPurchase(_beneficiary, tokens);
        emit TokenPurchase(_msgSender(), _beneficiary, weiAmount, tokens);
        _updatePurchasingState(_beneficiary, weiAmount);

        _forwardFunds();
        _postValidatePurchase(_beneficiary, weiAmount);
    }

    function _preValidatePurchase(address _beneficary, uint256 _weiAmount)
        internal
        virtual
    {
        require(
            _beneficary != address(0),
            "Beneficary Address must not be zero"
        );
        require(_weiAmount != 0, "Purchase amount must not be zero");
    }

    function _postValidatePurchase(address _beneficary, uint256 _weiAmount)
        internal
        virtual
    {}

    function _processPurchase(address _beneficiary, uint256 _tokenAmount)
        internal
        virtual
    {
        _deliverTokens(_beneficiary, _tokenAmount);
    }

    function _updatePurchasingState(address _beneficiary, uint256 _weiAmount)
        internal
        virtual
    {}

    function _getTokenAmount(uint256 _weiAmount)
        internal
        view
        virtual
        returns (uint256)
    {
        return _weiAmount.mul(rate);
    }

    function _deliverTokens(address _beneficiary, uint256 _tokenAmount)
        internal
    {
        token.transfer(_beneficiary, _tokenAmount);
    }

    function _forwardFunds() internal {
        wallet.transfer(msg.value);
    }
}
