import React from 'react'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'

type IcoCountDownProps = {
  children?: never
}

export const IcoCountDown: React.FC<IcoCountDownProps> = () => {
  // const {} = props;

  const crowdsaleInfo = useCrowdsaleInfo()
  console.log('crowdsaleInfo', crowdsaleInfo)

  return null
}
