import useSWR from 'swr'
import { useCrowdsaleContract } from '../hooks/crowdsale-contract'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { useWaitTruthy } from './wait-truthy'

const fetchCrowdsaleStatus = async (
  _key: string,
  crowdsale: KourinTokenCrowdsale,
) => {
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

export const useCrowdsaleStatus = () => {
  const { data: crowdsaleContract } = useCrowdsaleContract()

  useWaitTruthy(crowdsaleContract)

  return useSWR(
    crowdsaleContract ? ['crowdsale-status', crowdsaleContract] : null,
    fetchCrowdsaleStatus,
  )
}
