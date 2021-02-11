import React from 'react'
import { CrowdsaleContractContextProvider } from './contexts/crowdsale-contract'
import { CrowdsaleContractInfoContextProvider } from './contexts/crowdsale-info'
import { CrowdsaleContractStatusContextProvider } from './contexts/crowdsale-status'
import { EthersProviderContextProvider } from './contexts/ethers-provider'
import { EthersWalletContextProvider } from './contexts/ethers-wallet'

export const ContextProviders: React.FC<{}> = ({ children }) => {
  return (
    <>
      <EthersProviderContextProvider>
        <EthersWalletContextProvider>
          <CrowdsaleContractContextProvider>
            <CrowdsaleContractInfoContextProvider>
              <CrowdsaleContractStatusContextProvider>
                {children}
              </CrowdsaleContractStatusContextProvider>
            </CrowdsaleContractInfoContextProvider>
          </CrowdsaleContractContextProvider>
        </EthersWalletContextProvider>
      </EthersProviderContextProvider>
    </>
  )
}
