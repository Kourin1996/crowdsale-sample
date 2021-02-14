import useSWR from 'swr'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { useCrowdsaleContract } from './crowdsale-contract'
import { useWaitTruthy } from './wait-truthy'

export type CrowdsaleInfo = {
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

const fetchCrowdsaleInfo = async (
  _key: string,
  crowdsale: KourinTokenCrowdsale,
) => {
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
  const { data: crowdsaleContract } = useCrowdsaleContract()

  useWaitTruthy(crowdsaleContract)

  return useSWR(
    crowdsaleContract ? ['crowdsale-info', crowdsaleContract] : null,
    fetchCrowdsaleInfo,
  )
}
