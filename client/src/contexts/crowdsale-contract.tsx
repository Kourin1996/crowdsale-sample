import React from 'react'
import { useAsync, UseAsyncReturn } from 'react-async-hook'
import { ethers } from 'ethers'
import crowdsaleAbi from '../abi/KourinTokenCrowdsale.json'
import { useEthersWallet } from '../contexts/ethers-wallet'
import { getContractAddress } from '../utils/contract-address'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'
import { createCtx } from '../utils/context'

const crowdsaleContractContext = createCtx<
  UseAsyncReturn<KourinTokenCrowdsale | undefined, [ethers.Wallet]>
>()

export const useCrowdsaleContract = crowdsaleContractContext[0]

const getCrowdsaleContract = async (wallet: ethers.Wallet) => {
  const network = await wallet.provider.getNetwork()

  const contractAddress = getContractAddress(
    'crowdsale',
    network.chainId === 31337 ? 'localhost' : network.name,
  )
  console.log('getCrowdsaleContract', wallet, contractAddress)

  return contractAddress
    ? (new ethers.Contract(
        contractAddress,
        crowdsaleAbi,
        wallet,
      ) as KourinTokenCrowdsale)
    : undefined
}

export const CrowdsaleContractContextProvider: React.FC<{}> = (props) => {
  const { children } = props

  const [wallet] = useEthersWallet()

  const crowdsaleContract = useAsync(getCrowdsaleContract, [wallet])

  const CrowdsaleContractContextProvider = crowdsaleContractContext[1]

  return (
    <CrowdsaleContractContextProvider value={crowdsaleContract}>
      {children}
    </CrowdsaleContractContextProvider>
  )
}
