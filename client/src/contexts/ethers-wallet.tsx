import React from 'react'
import { ethers } from 'ethers'
import { createCtx } from '../utils/context'
import { useEthersProvider } from './ethers-provider'

const ethersWalletContext = createCtx<ethers.Wallet>()

const ethersWalletActionContext = createCtx<
  React.Dispatch<React.SetStateAction<ethers.Wallet>>
>()

export const useEthersWallet = ethersWalletContext[0]

export const useEthersWalletAction = ethersWalletActionContext[0]

export const EthersWalletContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const provider = useEthersProvider()

  const [wallet, setWallet] = React.useState(
    ethers.Wallet.createRandom().connect(provider),
  )
  const EthersWalletContextProvider = ethersWalletContext[1]
  const EthersWalletActionContextProvider = ethersWalletActionContext[1]

  return (
    <EthersWalletContextProvider value={wallet}>
      <EthersWalletActionContextProvider value={setWallet}>
        {children}
      </EthersWalletActionContextProvider>
    </EthersWalletContextProvider>
  )
}
