import React from 'react'
import { CountDown } from '../../molecules/CountDown'
import { IcoCountType } from './IcoCountType'

const getLabelFromIcoCountType = (
  type: IcoCountType,
  currentPhase?: number,
) => {
  switch (type) {
    case IcoCountType.NotStarted:
      return 'ICO Begins In'
    case IcoCountType.Ended:
      return 'ICO has ended'
    case IcoCountType.OnGoing:
      if (!currentPhase) {
        throw new Error(`The info of current phase is invalid: ${currentPhase}`)
      }
      return `Phase ${currentPhase} Ends In`
    default:
      const invalidType: never = type
      throw new Error(`Invalid IcoCountType: ${invalidType}`)
  }
}

type IcoCountDownViewProps = {
  children?: never
  type: IcoCountType
  phase?: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const IcoCountDownView: React.FC<IcoCountDownViewProps> = (props) => {
  const { type, phase, days, hours, minutes, seconds } = props

  const label = getLabelFromIcoCountType(type, phase)

  return (
    <div>
      <p className="mb-2 text-white text-base font-bold">{label}</p>
      {type !== IcoCountType.Ended && (
        <CountDown
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      )}
    </div>
  )
}
