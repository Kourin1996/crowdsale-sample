import useSWR from 'swr'
import { ethers } from 'ethers'
import { useEthersProvider } from '../contexts/ethers-provider'

const getRandomWallet = async (
  _key: string,
  _chainId: number,
  provider: ethers.providers.BaseProvider,
) => {
  return ethers.Wallet.createRandom().connect(provider)
}

export const useEthersWallet = () => {
  const provider = useEthersProvider()

  return useSWR(
    provider && provider.network !== undefined
      ? ['random-wallet', provider.network.chainId, provider]
      : null,
    getRandomWallet,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 3600,
    },
  )
}
