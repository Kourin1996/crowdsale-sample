import React from 'react'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'
import { IcoCountDownView } from './view'

type IcoCountDownProps = {
  children?: never
}

export const IcoCountDown: React.FC<IcoCountDownProps> = React.memo(() => {
  const crowdsaleInfo = useCrowdsaleInfo()

  const [currentTime, setCurrentTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  if (crowdsaleInfo.error || !crowdsaleInfo.data) {
    return null
  }

  return (
    <IcoCountDownView
      crowdsaleInfo={crowdsaleInfo.data}
      currentTime={currentTime}
    />
  )
})
