import React from 'react'
import { ThemeProvider } from 'styled-components'
import { EthersProviderContextProvider } from './contexts/ethers-provider'

const { theme } = require('rimble-ui')

export const ContextProviders: React.FC<{}> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <EthersProviderContextProvider>
          {children}
        </EthersProviderContextProvider>
      </ThemeProvider>
    </>
  )
}
