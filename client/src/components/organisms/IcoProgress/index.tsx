import { ethers } from 'ethers'
import React from 'react'
import { useCrowdsaleStatus } from '../../../contexts/crowdsale-status'
import { IcoProgressView } from './view'

export const IcoProgress: React.FC<{}> = React.memo(() => {
  const crowdsaleStatus = useCrowdsaleStatus()
  if (crowdsaleStatus.loading || crowdsaleStatus.error) {
    return null
  }

  console.log('crowdsaleStatus', crowdsaleStatus.result)

  console.log(
    'crowdsaleStatus.ethRaises',
    crowdsaleStatus.result?.ethRaised.toString(),
  )
  console.log(
    'crowdsaleStatus.purchasedAmount',
    crowdsaleStatus.result?.purchasedAmount.toString(),
  )
  console.log(
    'crowdsaleStatus.remaining',
    crowdsaleStatus.result?.remaining.toString(),
  )

  const decimals = 5
  const exp = ethers.BigNumber.from(10).pow(18 - decimals)

  const total = crowdsaleStatus.result!.purchasedAmount.add(
    crowdsaleStatus.result!.remaining,
  )
  const ethRaised =
    crowdsaleStatus.result!.ethRaised.div(exp).toNumber() / 10 ** decimals
  const purchasedAmount =
    crowdsaleStatus.result!.purchasedAmount.div(exp).toNumber() / 10 ** decimals
  const remainingAmount =
    total.sub(crowdsaleStatus.result!.purchasedAmount).div(exp).toNumber() /
    10 ** decimals

  const percent =
    Math.floor(
      (crowdsaleStatus.result!.purchasedAmount.div(exp).toNumber() /
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
