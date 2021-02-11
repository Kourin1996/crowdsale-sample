import React from 'react'
import { ethers } from 'ethers'
import { createCtx } from '../utils/context'
import { DEFAULT_NETWORK } from '../constants/ethereum'

const ethersProviderContext = createCtx<ethers.providers.BaseProvider>()

const ethersProviderSwitchNetworkContext = createCtx<
  (network: string | ethers.providers.Network, options?: any) => void
>()

export const useEthersProvider = ethersProviderContext[0]

export const useEthersProviderSwitchNetworkContext =
  ethersProviderSwitchNetworkContext[0]

export const EthersProviderContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const [provider, setProvider] = React.useState(
    ethers.getDefaultProvider(DEFAULT_NETWORK, {}),
  )

  const switchNetwork = React.useCallback(
    (network: string | ethers.providers.Network, options: any = {}) => {
      setProvider(ethers.getDefaultProvider(network, options))
    },
    [],
  )

  const EthersProviderContextProvider = ethersProviderContext[1]
  const EthersProviderSwitchNetworkContextProvider =
    ethersProviderSwitchNetworkContext[1]

  return (
    <EthersProviderContextProvider value={provider}>
      <EthersProviderSwitchNetworkContextProvider value={switchNetwork}>
        {children}
      </EthersProviderSwitchNetworkContextProvider>
    </EthersProviderContextProvider>
  )
}
