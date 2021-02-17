import React from 'react'
import {
  useIsMetamaskInstalled,
  useMetamaskAccounts,
} from '../../../hooks/metamask'
import { ViewSubmitTransaction } from './view'

type SubmitTransactionProps = {
  children?: never
  eth: number
  token: number
}

export const SubmitTransaction: React.FC<SubmitTransactionProps> = React.memo(
  (props) => {
    const { eth, token } = props

    const isMetamaskInstalled = useIsMetamaskInstalled()
    const { data: metamaskAccounts } = useMetamaskAccounts()

    const isConnectingToMetamask =
      isMetamaskInstalled && metamaskAccounts === undefined
    console.log(
      'isConnectingToMetamask',
      isMetamaskInstalled,
      isConnectingToMetamask,
      metamaskAccounts,
    )

    return (
      <ViewSubmitTransaction
        eth={eth}
        token={token}
        isMetamaskInstalled={isMetamaskInstalled}
        isConnectingToMetamask={isConnectingToMetamask}
      />
    )
  },
)
