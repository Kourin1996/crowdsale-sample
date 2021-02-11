import React from 'react'
import { useCrowdsaleInfo } from '../../../contexts/crowdsale-info'

type IcoCountDownProps = {
  children?: never
}

export const IcoCountDown: React.FC<IcoCountDownProps> = () => {
  // const {} = props;

  const crowdsaleInfo = useCrowdsaleInfo()
  console.log('crowdsaleInfo', crowdsaleInfo)

  // const crowdsaleStatus = useCrowdsaleStatus()
  // console.log('crowdsalestatus', crowdsaleStatus)

  return null
}
