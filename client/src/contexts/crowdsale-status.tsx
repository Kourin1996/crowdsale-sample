import { BigNumber } from 'ethers'
import React from 'react'
import { useAsync, UseAsyncReturn } from 'react-async-hook'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { createCtx } from '../utils/context'
import { useCrowdsaleContract } from './crowdsale-contract'

export type CrowdsaleContractStatus = {
  hasStarted: boolean
  hasClosed: boolean
  ethRaised: BigNumber
  purchasedAmount: BigNumber
  remaining: BigNumber
  currentPhase: number
  currentRate: number
}

const crowdsaleContractStatusContext = createCtx<
  UseAsyncReturn<
    CrowdsaleContractStatus,
    [Promise<KourinTokenCrowdsale | undefined>]
  >
>()

const crowdsaleContractStatusUpdateContext = createCtx<() => void>()

export const useCrowdsaleStatus = crowdsaleContractStatusContext[0]

export const useCrowdsaleStatusUpdate = crowdsaleContractStatusUpdateContext[0]

const fetchCrowdsaleStatus = async (
  cronwdsalePromise: Promise<KourinTokenCrowdsale | undefined>,
): Promise<CrowdsaleContractStatus> => {
  const crowdsale = await cronwdsalePromise
  if (crowdsale === undefined) {
    throw new Error('Crowdsale is undefined')
  }

  const results = await Promise.all([
    crowdsale.hasStarted(),
    crowdsale.hasClosed(),
    crowdsale.weiRaised(),
    crowdsale.purchasedAmount(),
    crowdsale.remaining(),
    crowdsale.getCurrentPhase(),
    crowdsale.getCurrentRate(),
  ])

  const hasStarted = results[0]
  const hasClosed = results[1]
  const ethRaised = results[2]
  const purchasedAmount = results[3]
  const remaining = results[4]
  const currentPhase = results[5][1] ? results[5][0].toNumber() + 1 : -1
  const currentRate = results[6].toNumber()

  return {
    hasStarted,
    hasClosed,
    ethRaised,
    purchasedAmount,
    remaining,
    currentPhase,
    currentRate,
  }
}

export const CrowdsaleContractStatusContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const crowdsaleContract = useCrowdsaleContract()
  const crowdsaleContractPromise =
    crowdsaleContract.currentPromise ?? Promise.resolve(undefined)

  const crowdsaleContractStatus = useAsync(fetchCrowdsaleStatus, [
    crowdsaleContractPromise,
  ])

  const updateStatus = React.useCallback(() => {
    crowdsaleContractStatus.execute(crowdsaleContractPromise)
  }, [crowdsaleContractStatus, crowdsaleContractPromise])

  const CrowdsaleContractStatusContextProvider =
    crowdsaleContractStatusContext[1]
  const CrowdsaleContractStatusUpdateContextProvider =
    crowdsaleContractStatusUpdateContext[1]

  return (
    <CrowdsaleContractStatusContextProvider value={crowdsaleContractStatus}>
      <CrowdsaleContractStatusUpdateContextProvider value={updateStatus}>
        {children}
      </CrowdsaleContractStatusUpdateContextProvider>
    </CrowdsaleContractStatusContextProvider>
  )
}
