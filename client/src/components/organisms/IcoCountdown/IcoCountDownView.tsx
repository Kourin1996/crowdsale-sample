import React from 'react'
import { CrowdsaleContractInfo } from '../../../contexts/crowdsale-info'
import { CountDown } from '../../molecules/CountDown'

enum IcoCountType {
  NotStarted = 'NotStart',
  OnGoing = 'OnGoing',
  Ended = 'End',
  Error = 'Error',
}

const getTypeAndRemainingTime = (
  info: CrowdsaleContractInfo,
  timestamp: Date,
): [IcoCountType, number, number] => {
  if (info.openingTime > timestamp) {
    const remaining = info.openingTime.getTime() - timestamp.getTime()
    return [IcoCountType.NotStarted, remaining, -1]
  }
  if (info.closingTime <= timestamp) {
    return [IcoCountType.Ended, 0, -1]
  }

  const currentPhaseIndex = info.phases.findIndex((phase) => {
    return phase.startedAt <= timestamp && timestamp < phase.endedAt
  })

  if (currentPhaseIndex !== -1) {
    const currentPhase = info.phases[currentPhaseIndex]
    const remaining = currentPhase.endedAt.getTime() - timestamp.getTime()
    return [IcoCountType.OnGoing, remaining, currentPhaseIndex]
  }

  return [IcoCountType.Error, 0, -1]
}

const getLabelFromType = (type: IcoCountType, phase?: number) => {
  switch (type) {
    case IcoCountType.NotStarted:
      return 'ICO Begins In'
    case IcoCountType.Ended:
      return 'ICO Has Ended'
    case IcoCountType.OnGoing:
      return `Phase ${phase} Ends In`
    case IcoCountType.Error:
      return ''
    default:
      const invalidType: never = type
      throw new Error(`Invalid type: ${invalidType}`)
  }
}

const parseTime = (timeInSeconds: number) => {
  const day = 3600 * 24,
    hour = 3600,
    minute = 60

  let remaining = timeInSeconds
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  if (remaining >= day) {
    days = Math.floor(remaining / day)
    remaining %= day
  }
  if (remaining >= hour) {
    hours = Math.floor(remaining / hour)
    remaining %= hour
  }
  if (remaining >= minute) {
    minutes = Math.floor(remaining / minute)
    remaining %= minute
  }
  seconds = remaining

  return [days, hours, minutes, seconds] as const
}

type IcoCountDownViewProps = {
  children?: never
  crowdsaleInfo: CrowdsaleContractInfo
  currentTime: Date
}

export const IcoCountDownView: React.FC<IcoCountDownViewProps> = (props) => {
  const { crowdsaleInfo, currentTime } = props

  const [type, remainingTime, currentPhaseIndex] = getTypeAndRemainingTime(
    crowdsaleInfo,
    currentTime,
  )
  const label = getLabelFromType(type, currentPhaseIndex + 1)
  const [days, hours, minutes, seconds] = parseTime(
    Math.floor(remainingTime / 1000),
  )

  return (
    <div>
      <p className="mb-2 text-white text-xl font-bold">{label}</p>
      <CountDown
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
  )
}
