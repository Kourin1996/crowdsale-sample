import useSWR from 'swr'
import { ethers } from 'ethers'
import { useEthersProvider } from '../contexts/ethers-provider'

export const useGasPrice = () => {
  const provider = useEthersProvider()

  return useSWR(
    provider ? ['gas-price', provider] : null,
    async (_key: string, provider: ethers.providers.BaseProvider) =>
      await provider.getGasPrice(),
  )
}

export const useEstimateTransferGas = (
  from: string,
  to: string,
  amount: ethers.BigNumber,
) => {
  const provider = useEthersProvider()

  return useSWR(
    from && to && provider
      ? [`transfer-gas-${from}-${to}-${amount.toString()}`, provider]
      : null,
    async (_key: string, provider: ethers.providers.BaseProvider) =>
      await provider.estimateGas({
        from: from,
        to: to,
        value: amount,
        data: '0x',
      }),
  )
}
