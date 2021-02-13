import React from 'react'
import { ethers } from 'ethers'
import { useCrowdsaleContract } from '../../../contexts/crowdsale-contract'
import { useCrowdsaleInfo } from '../../../contexts/crowdsale-info'
import { useCrowdsaleStatus } from '../../../contexts/crowdsale-status'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { ViewBuyTokenForm } from './view'

type BuyTokenFormProps = {}

export const BuyTokenForm: React.FC<BuyTokenFormProps> = React.memo((props) => {
  const provider = useEthersProvider()
  const crowdsale = useCrowdsaleContract()
  const crowdsaleInfo = useCrowdsaleInfo()
  const crowdsaleStatus = useCrowdsaleStatus()

  //todo
  if (
    crowdsaleInfo.loading ||
    crowdsaleStatus.loading ||
    crowdsaleInfo.error ||
    crowdsaleStatus.error
  ) {
    return null
  }

  const networkName =
    provider.network.chainId === 31337 ? 'localhost' : provider.network.name
  const crowdsaleAddress = crowdsale.result!.address
  const tokenAddress = crowdsaleInfo.result!.tokenAddress

  const decimals = 5
  const exp = ethers.BigNumber.from(10).pow(18 - decimals)

  const purchasedAmount =
    crowdsaleStatus.result!.purchasedAmount.div(exp).toNumber() / 10 ** decimals
  const totalAmount =
    crowdsaleStatus
      .result!.purchasedAmount.add(crowdsaleStatus.result!.remaining)
      .div(exp)
      .toNumber() /
    10 ** decimals
  const ethRaised =
    crowdsaleStatus.result!.ethRaised.div(exp).toNumber() / 10 ** decimals

  const currentRate = crowdsaleStatus.result!.currentRate

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
