import React from 'react'
import { ethers } from 'ethers'
import { createCtx } from '../utils/context'
import { useEthersProvider } from './ethers-provider'

const ethersWalletContext = createCtx<
  [ethers.Wallet, React.Dispatch<React.SetStateAction<ethers.Wallet>>]
>()

export const useEthersWallet = ethersWalletContext[0]

export const EthersWalletContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const provider = useEthersProvider()

  const walletState = React.useState(
    ethers.Wallet.createRandom().connect(provider),
  )

  const EthersWalletContextProvider = ethersWalletContext[1]

  return (
    <EthersWalletContextProvider value={walletState}>
      {children}
    </EthersWalletContextProvider>
  )
}
