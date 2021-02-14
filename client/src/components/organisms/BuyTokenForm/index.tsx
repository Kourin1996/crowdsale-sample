import React from 'react'
import { ethers } from 'ethers'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { ViewBuyTokenForm } from './view'
import { useCrowdsaleStatus } from '../../../hooks/crowdsale-status'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'
import { useCrowdsaleContract } from '../../../hooks/crowdsale-contract'

type BuyTokenFormProps = {}

export const BuyTokenForm: React.FC<BuyTokenFormProps> = React.memo((props) => {
  const provider = useEthersProvider()
  const crowdsale = useCrowdsaleContract()
  const crowdsaleInfo = useCrowdsaleInfo()
  const crowdsaleStatus = useCrowdsaleStatus()

  //todo
  if (
    !crowdsale.data ||
    !crowdsaleInfo.data ||
    !crowdsaleStatus.data ||
    crowdsaleInfo.error ||
    crowdsaleStatus.error
  ) {
    return null
  }

  const networkName =
    provider.network.chainId === 31337 ? 'localhost' : provider.network.name
  const crowdsaleAddress = crowdsale.data.address
  const tokenAddress = crowdsaleInfo.data.tokenAddress

  const decimals = 5
  const exp = ethers.BigNumber.from(10).pow(18 - decimals)

  const purchasedAmount =
    crowdsaleStatus.data.purchasedAmount.div(exp).toNumber() / 10 ** decimals
  const totalAmount =
    crowdsaleStatus.data.purchasedAmount
      .add(crowdsaleStatus.data.remaining)
      .div(exp)
      .toNumber() /
    10 ** decimals
  const ethRaised =
    crowdsaleStatus.data.ethRaised.div(exp).toNumber() / 10 ** decimals

  const currentRate = crowdsaleStatus.data.currentRate

  return (
    <ViewBuyTokenForm
      networkName={networkName}
      crowdsaleAddress={crowdsaleAddress}
      tokenAddress={tokenAddress}
      purchasedAmount={purchasedAmount}
      totalAmount={totalAmount}
      ethRaised={ethRaised}
      currentRate={currentRate}
    />
  )
})

// Input How much Token
// Input How much Ether

// Buy with Metamask
// Buy with Manyally
