import React from 'react'
import { useAsync, UseAsyncReturn } from 'react-async-hook'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { createCtx } from '../utils/context'
import { useCrowdsaleContract } from './crowdsale-contract'

export type CrowdsaleContractInfo = {
  openingTime: Date
  closingTime: Date
  tokenAddress: string
  walletAddress: string
  phases: {
    startedAt: Date
    endedAt: Date
    period: number
    rate: number
  }[]
}

const crowdsaleContractInfoContext = createCtx<
  UseAsyncReturn<
    CrowdsaleContractInfo,
    [Promise<KourinTokenCrowdsale | undefined>]
  >
>()

export const useCrowdsaleInfo = crowdsaleContractInfoContext[0]

const fetchCrowdsaleInfo = async (
  cronwdsalePromise: Promise<KourinTokenCrowdsale | undefined>,
) => {
  const crowdsale = await cronwdsalePromise
  if (crowdsale === undefined) {
    throw new Error('Crowdsale is undefined')
  }

  const results = await Promise.all([
    crowdsale.openingTime(),
    crowdsale.closingTime(),
    crowdsale.token(),
    crowdsale.wallet(),
    crowdsale.getPeriods(),
    crowdsale.getRates(),
  ])

  const openingTime = new Date(results[0].toNumber() * 1000)
  const closingTime = new Date(results[1].toNumber() * 1000)
  const tokenAddress = results[2]
  const walletAddress = results[3]

  const periods = results[4].map((period) => period.toNumber() * 1000)
  const phases = []
  let startedAt = openingTime
  for (let i = 0; i < periods.length; ++i) {
    const period = periods[i]
    const endedAt = new Date(startedAt.getTime() + period)
    const rate = results[5][i].toNumber()
    phases.push({
      startedAt,
      endedAt,
      period,
      rate,
    })
    startedAt = endedAt
  }

  return {
    openingTime,
    closingTime,
    tokenAddress,
    walletAddress,
    phases,
  }
}

export const CrowdsaleContractInfoContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const crowdsaleContract = useCrowdsaleContract()
  const crowdsaleContractPromise =
    crowdsaleContract.currentPromise ?? Promise.resolve(undefined)

  const crowdsaleContractInfo = useAsync(fetchCrowdsaleInfo, [
    crowdsaleContractPromise,
  ])

  const CrowdsaleContractInfoContextProvider = crowdsaleContractInfoContext[1]

  return (
    <CrowdsaleContractInfoContextProvider value={crowdsaleContractInfo}>
      {children}
    </CrowdsaleContractInfoContextProvider>
  )
}
