import { useCrowdsale } from './crowdsale'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { useAsync } from 'react-async-hook'

const fetchCrowdsaleStatus = async (
  cronwdsalePromise: Promise<KourinTokenCrowdsale | undefined>,
) => {
  const crowdsale = await cronwdsalePromise
  if (crowdsale === undefined) {
    throw new Error('Crowdsale is undefined')
  }

  const results = await Promise.all([
    crowdsale.hasStarted(),
    crowdsale.hasClosed(),
    crowdsale.weiRaised(),
    crowdsale.getCurrentPhase(),
    crowdsale.getCurrentRate(),
  ])

  const hasStarted = results[0]
  const hasClosed = results[1]
  const weiRaised = results[2].toNumber()
  const currentPhase = results[3][1] ? results[3][0].toNumber() : -1
  const currentRate = results[4].toNumber()

  return {
    hasStarted,
    hasClosed,
    weiRaised,
    currentPhase,
    currentRate,
  }
}

export const useCrowdsaleStatus = () => {
  const crowdsale = useCrowdsale()
  const crowdsalePromise =
    crowdsale.currentPromise ?? Promise.resolve(undefined)

  return useAsync(fetchCrowdsaleStatus, [crowdsalePromise])
}
