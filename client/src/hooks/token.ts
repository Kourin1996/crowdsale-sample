import useSWR from 'swr'
import { ethers } from 'ethers'
import tokenAbi from '../abi/KourinToken.json'
import { KourinToken } from '../types/KourinToken'
import { useEthersWallet } from '../hooks/ethers-wallet'
import { getContractAddress } from '../utils/contract-address'

const getTokenContract = async (_key: string, wallet: ethers.Wallet) => {
  const network = await wallet.provider.getNetwork()

  const contractAddress = getContractAddress(
    'token',
    network.chainId === 31337 ? 'localhost' : network.name,
  )
  if (contractAddress === undefined) {
    throw new Error('Address for Token is not found')
  }

  return new ethers.Contract(contractAddress, tokenAbi, wallet) as KourinToken
}

export const useTokenContract = () => {
  const { data: wallet } = useEthersWallet()

  return useSWR(wallet ? ['token-contract', wallet] : null, getTokenContract, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 3600,
  })
}
