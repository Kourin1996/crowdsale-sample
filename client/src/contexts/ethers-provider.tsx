import React from 'react'
import { ethers } from 'ethers'
import { createCtx } from '../utils/context'

const ethersContext = createCtx<ethers.providers.BaseProvider>()

export const useEthersProvider = ethersContext[0]

type EthersContextProviderProps = {
  network?: string | ethers.providers.Network
  options?: any
}

export const EthersContextProvider: React.FC<EthersContextProviderProps> = (
  props,
) => {
  const { children, network, options } = props

  const ContextProvider = ethersContext[1]
  const ethersProvider = React.useMemo(
    () => ethers.getDefaultProvider(network, options),
    [],
  )

  return <ContextProvider value={ethersProvider}>{children}</ContextProvider>
}
