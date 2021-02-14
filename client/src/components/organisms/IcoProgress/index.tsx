import { ethers } from 'ethers'
import React from 'react'
import { useCrowdsaleStatus } from '../../../hooks/crowdsale-status'
import { IcoProgressView } from './view'

export const IcoProgress: React.FC<{}> = React.memo(() => {
  const crowdsaleStatus = useCrowdsaleStatus()

  if (!crowdsaleStatus.data || crowdsaleStatus.error) {
    return null
  }

  const decimals = 5
  const exp = ethers.BigNumber.from(10).pow(18 - decimals)

  const total = crowdsaleStatus.data.purchasedAmount.add(
    crowdsaleStatus.data.remaining,
  )
  const ethRaised =
    crowdsaleStatus.data.ethRaised.div(exp).toNumber() / 10 ** decimals
  const purchasedAmount =
    crowdsaleStatus.data.purchasedAmount.div(exp).toNumber() / 10 ** decimals
  const remainingAmount =
    total.sub(crowdsaleStatus.data.purchasedAmount).div(exp).toNumber() /
    10 ** decimals

  const percent =
    Math.floor(
      (crowdsaleStatus.data.purchasedAmount.div(exp).toNumber() /
        total.div(exp).toNumber()) *
        10 ** 4,
    ) /
    10 ** 2

  return (
    <IcoProgressView
      percent={percent}
      ethRaised={ethRaised}
      purchasedAmount={purchasedAmount}
      remainingAmount={remainingAmount}
    />
  )
})
