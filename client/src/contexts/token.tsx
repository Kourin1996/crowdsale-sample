import React from 'react'
import { useAsync, UseAsyncReturn } from 'react-async-hook'
import { ethers } from 'ethers'
import tokenAbi from '../abi/KourinToken.json'
import { useEthersWallet } from '../contexts/ethers-wallet'
import { getContractAddress } from '../utils/contract-address'
import { createCtx } from '../utils/context'
import { KourinToken } from '../types/KourinToken'

const tokenContractContext = createCtx<
  UseAsyncReturn<KourinToken | undefined, [ethers.Wallet]>
>()

export const useTokenContract = tokenContractContext[0]

const getTokenContract = async (wallet: ethers.Wallet) => {
  const network = await wallet.provider.getNetwork()

  const contractAddress = getContractAddress(
    'token',
    network.chainId === 31337 ? 'localhost' : network.name,
  )

  return contractAddress
    ? (new ethers.Contract(contractAddress, tokenAbi, wallet) as KourinToken)
    : undefined
}

export const TokenContractContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const [wallet] = useEthersWallet()

  const tokenContract = useAsync(getTokenContract, [wallet])

  const TokenContractContextProvider = tokenContractContext[1]

  return (
    <TokenContractContextProvider value={tokenContract}>
      {children}
    </TokenContractContextProvider>
  )
}
