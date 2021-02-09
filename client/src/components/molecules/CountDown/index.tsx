import React from 'react'
import { Count } from '../../atoms/Count'

type CountDownProps = {
  children?: never
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const CountDown: React.FC<CountDownProps> = (props) => {
  const { days, hours, minutes, seconds } = props

  return (
    <div className="flex items-center space-x-12">
      <Count value={days} label="DAYS" />
      <Count value={hours} label="HOURS" />
      <Count value={minutes} label="MINS" />
      <Count value={seconds} label="SECS" />
    </div>
  )
}
