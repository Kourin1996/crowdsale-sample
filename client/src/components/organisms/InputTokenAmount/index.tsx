import React from 'react'
import { ethers } from 'ethers'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { ViewInputTokenAmount } from './view'
import { useCrowdsaleStatus } from '../../../hooks/crowdsale-status'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'
import { useCrowdsaleContract } from '../../../hooks/crowdsale-contract'

type InputTokenAmountProps = {
  onClickBuy: (eth: number, token: number) => void
}

export const InputTokenAmount: React.FC<InputTokenAmountProps> = React.memo(
  (props) => {
    const { onClickBuy } = props

    const provider = useEthersProvider()
    const crowdsale = useCrowdsaleContract()
    const crowdsaleInfo = useCrowdsaleInfo()
    const crowdsaleStatus = useCrowdsaleStatus()

    const currentRate = crowdsaleStatus.data?.currentRate

    const [ethAmount, setEthAmount] = React.useState('')
    const [tokenAmount, setTokenAmount] = React.useState('')
    const onEthChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEthAmount(e.target.value)
        if (currentRate !== undefined) {
          if (e.target.value) {
            const newEthAmount = Number.parseFloat(e.target.value)
            const newTokenAmount = newEthAmount * currentRate
            setTokenAmount(newTokenAmount.toString())
          } else {
            setTokenAmount('')
          }
        }
      },
      [currentRate],
    )

    const onTokenAmountChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTokenAmount(e.target.value)
        if (currentRate !== undefined) {
          if (e.target.value) {
            const newTokenAmount = Number.parseFloat(e.target.value)
            const newEthAmount = newTokenAmount / currentRate
            setEthAmount(newEthAmount.toString())
          } else {
            setEthAmount('')
          }
        }
      },
      [currentRate],
    )

    const onBuyButtonClick = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()

        const eth = Number.parseFloat(ethAmount)
        const token = Number.parseFloat(tokenAmount)
        const rate = currentRate

        if (token / eth === rate) {
          onClickBuy(eth, token)
        }
      },
      [ethAmount, tokenAmount, currentRate, onClickBuy],
    )

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

    const isBuyButtonDisable = !ethAmount || !tokenAmount

    return (
      <ViewInputTokenAmount
        networkName={networkName}
        crowdsaleAddress={crowdsaleAddress}
        tokenAddress={tokenAddress}
        purchasedAmount={purchasedAmount}
        totalAmount={totalAmount}
        ethRaised={ethRaised}
        currentRate={currentRate!}
        ethAmount={ethAmount}
        tokenAmount={tokenAmount}
        isBuyButtonDisable={isBuyButtonDisable}
        onEthChange={onEthChange}
        onTokenAmountChange={onTokenAmountChange}
        onBuyButtonClick={onBuyButtonClick}
      />
    )
  },
)
