import React from 'react'
import { Count } from '../../atoms/Count'

type CountDownProps = {
  children?: never
}

export const CountDown: React.FC<CountDownProps> = (props) => {
  const {} = props

  return (
    <div className="flex items-center space-x-12">
      <Count value={1} label="DAYS" />
      <Count value={12} label="HOURS" />
      <Count value={23} label="MINS" />
      <Count value={34} label="SECS" />
    </div>
  )
}
