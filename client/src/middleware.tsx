import React from 'react'
import { EthersContextProvider } from './contexts/ethers-provider'

const Middleware: React.FC<{}> = ({ children }) => {
  const network = 'http://127.0.0.1:8545'

  return (
    <>
      <EthersContextProvider network={network}>
        {children}
      </EthersContextProvider>
    </>
  )
}

export default Middleware
