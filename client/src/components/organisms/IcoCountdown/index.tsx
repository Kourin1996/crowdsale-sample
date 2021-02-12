import React from 'react'
import { useCrowdsaleInfo } from '../../../contexts/crowdsale-info'
import { IcoCountDownView } from './IcoCountDownView'

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

  if (crowdsaleInfo.loading || crowdsaleInfo.error || !crowdsaleInfo.result) {
    return null
  }

  return (
    <IcoCountDownView
      crowdsaleInfo={crowdsaleInfo.result}
      currentTime={currentTime}
    />
  )
})
