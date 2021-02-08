import React from 'react'
import { createCtx } from '../utils/context'
import { Networks } from '../domain/ethereum'

const ethersNetworkContext = createCtx<Networks>()

const ethersNetworkActionContext = createCtx<
  React.Dispatch<React.SetStateAction<Networks>>
>()

export const useEthersNetwork = ethersNetworkContext[0]

export const useEthersNetworkAction = ethersNetworkActionContext[1]

export const EthersNetworkContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const [network, setNetwork] = React.useState<Networks>('localhost')
  const EthersNetworkContextProvider = ethersNetworkContext[1]
  const EthersNetworkActionContextProvider = ethersNetworkActionContext[1]

  return (
    <EthersNetworkContextProvider value={network}>
      <EthersNetworkActionContextProvider value={setNetwork}>
        {children}
      </EthersNetworkActionContextProvider>
    </EthersNetworkContextProvider>
  )
}
