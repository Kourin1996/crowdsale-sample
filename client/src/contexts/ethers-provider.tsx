import React from 'react'
import { ethers } from 'ethers'
import { createCtx } from '../utils/context'
import { useEthersNetwork } from './ethers-network'

const ethersProviderContext = createCtx<ethers.providers.Provider>()

export const useEthersProvider = ethersProviderContext[0]

export const EthersProviderContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const selectedNetwork = useEthersNetwork()
  const providerNetwork =
    selectedNetwork !== 'localhost' ? selectedNetwork : 'http://127.0.0.1:8545'
  const [options] = React.useState({})

  const ContextProvider = ethersProviderContext[1]
  const ethersProvider = React.useMemo(
    () => ethers.getDefaultProvider(providerNetwork, options),
    [providerNetwork, options],
  )

  return <ContextProvider value={ethersProvider}>{children}</ContextProvider>
}
