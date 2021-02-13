import React from 'react'
import { ThemeProvider } from 'styled-components'
import { CrowdsaleContractContextProvider } from './contexts/crowdsale-contract'
import { CrowdsaleContractInfoContextProvider } from './contexts/crowdsale-info'
import { CrowdsaleContractStatusContextProvider } from './contexts/crowdsale-status'
import { EthersProviderContextProvider } from './contexts/ethers-provider'
import { EthersWalletContextProvider } from './contexts/ethers-wallet'
import { TokenContractContextProvider } from './contexts/token'

const { theme } = require('rimble-ui')

export const ContextProviders: React.FC<{}> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <EthersProviderContextProvider>
          <EthersWalletContextProvider>
            <TokenContractContextProvider>
              <CrowdsaleContractContextProvider>
                <CrowdsaleContractInfoContextProvider>
                  <CrowdsaleContractStatusContextProvider>
                    {children}
                  </CrowdsaleContractStatusContextProvider>
                </CrowdsaleContractInfoContextProvider>
              </CrowdsaleContractContextProvider>
            </TokenContractContextProvider>
          </EthersWalletContextProvider>
        </EthersProviderContextProvider>
      </ThemeProvider>
    </>
  )
}
