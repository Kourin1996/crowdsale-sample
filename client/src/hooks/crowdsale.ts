import { useAsync } from 'react-async-hook'
import { ethers } from 'ethers'
import crowdsaleAbi from '../abi/KourinTokenCrowdsale.json'
import { useEthersWallet } from '../contexts/ethers-wallet'
import { getContractAddress } from '../utils/contract-address'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'

const getContract = async (
  wallet: ethers.Wallet,
  preferredContractAddress?: string,
) => {
  const network = await wallet.provider.getNetwork()

  const contractAddress = preferredContractAddress
    ? preferredContractAddress
    : getContractAddress(
        'crowdsale',
        network.chainId === 31337 ? 'localhost' : network.name,
      )
  return contractAddress
    ? (new ethers.Contract(
        contractAddress,
        crowdsaleAbi,
        wallet,
      ) as KourinTokenCrowdsale)
    : undefined
}

export const useCrowdsale = (
  contractAddress?: string,
  signer?: ethers.Wallet,
) => {
  const defaultSigner = useEthersWallet()
  const asyncContract = useAsync(getContract, [
    signer ?? defaultSigner,
    contractAddress,
  ])

  return asyncContract
}
