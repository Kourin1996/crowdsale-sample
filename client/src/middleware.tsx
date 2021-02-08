import React from 'react'
import { EthersNetworkContextProvider } from './contexts/ethers-network'
import { EthersProviderContextProvider } from './contexts/ethers-provider'
import { EthersWalletContextProvider } from './contexts/ethers-wallet'

const Middleware: React.FC<{}> = ({ children }) => {
  return (
    <>
      <EthersNetworkContextProvider>
        <EthersProviderContextProvider>
          <EthersWalletContextProvider>{children}</EthersWalletContextProvider>
        </EthersProviderContextProvider>
      </EthersNetworkContextProvider>
    </>
  )
}

export default Middleware
