import useSWR from 'swr'
import { ethers } from 'ethers'
import crowdsaleAbi from '../abi/KourinTokenCrowdsale.json'
import { useEthersWallet } from '../hooks/ethers-wallet'
import { getContractAddress } from '../utils/contract-address'
import { KourinTokenCrowdsale } from '../types/KourinTokenCrowdsale'

const getCrowdsaleContract = async (_key: string, wallet: ethers.Wallet) => {
  const network = await wallet.provider.getNetwork()

  const contractAddress = getContractAddress(
    'crowdsale',
    network.chainId === 31337 ? 'localhost' : network.name,
  )
  if (contractAddress === undefined) {
    throw new Error('Address for Crowdsale is not found')
  }

  return new ethers.Contract(
    contractAddress,
    crowdsaleAbi,
    wallet,
  ) as KourinTokenCrowdsale
}

export const useCrowdsaleContract = () => {
  const { data: wallet } = useEthersWallet()

  return useSWR(
    wallet ? ['crowdsale-contract', wallet] : null,
    getCrowdsaleContract,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 3600,
    },
  )
}
