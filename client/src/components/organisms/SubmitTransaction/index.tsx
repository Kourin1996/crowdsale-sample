import React from 'react'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import {
  useIsMetamaskInstalled,
  useMetamaskAccounts,
  useMetamaskChainId,
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

    const provider = useEthersProvider()

    const isMetamaskInstalled = useIsMetamaskInstalled()
    const { data: metamaskAccounts } = useMetamaskAccounts()
    const { data: metamaskChainId } = useMetamaskChainId()

    const isConnectedToMetamask = !!metamaskAccounts && !!metamaskChainId
    const isConnectingToMetamask = isMetamaskInstalled && !isConnectedToMetamask

    return (
      <ViewSubmitTransaction
        eth={eth}
        token={token}
        providerChainId={provider.network.chainId}
        providerNetworkName={
          provider.network.chainId === 31337
            ? 'localhost'
            : provider.network.name
        }
        metamaskChainId={
          metamaskChainId ? Number.parseInt(metamaskChainId) : null
        }
        isMetamaskInstalled={isMetamaskInstalled}
        isConnectedToMetamask={isConnectedToMetamask}
        isConnectingToMetamask={isConnectingToMetamask}
      />
    )
  },
)
