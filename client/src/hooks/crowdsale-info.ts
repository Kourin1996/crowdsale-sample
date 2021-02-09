import { useCrowdsale } from './crowdsale'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { useAsync } from 'react-async-hook'

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

export const useCrowdsaleInfo = () => {
  const crowdsale = useCrowdsale()
  const crowdsalePromise =
    crowdsale.currentPromise ?? Promise.resolve(undefined)

  return useAsync(fetchCrowdsaleInfo, [crowdsalePromise])
}
