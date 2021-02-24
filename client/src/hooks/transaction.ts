import { ethers } from 'ethers'
import React from 'react'
import useSWR from 'swr'
import { useEthersProvider } from '../contexts/ethers-provider'

type Transaction = {
  blockHash: string
  blockNumber: string
  transactionIndex: number
  confirmations: number
  from: string
  to: string
}

// type TransactionData = Transaction & {
//   hash: string
//   chainId: number
//   creates: null
//   data: string
//   gasLimit: ethers.BigNumber
//   gasPrice: ethers.BigNumber
//   value: ethers.BigNumber
//   nonce: number
//   r: string
//   s: string
//   v: number
// }

type TransactionEvent = Transaction & {
  byzantium: boolean
  contractAddress: string
  cumulativeGasUsed: ethers.BigNumber
  gasUsed: ethers.BigNumber
  logs: any[]
  logsBloom: string
  status: number
  transactionHash: string
}

export const useTransaction = (txHash: string) => {
  const provider = useEthersProvider()

  return useSWR(
    provider ? [`tx-${txHash}`, txHash] : null,
    async (_id: string, txHash: string) => provider.getTransaction(txHash),
    {},
  )
}

export const useTransactionEvent = (txHash: string) => {
  const provider = useEthersProvider()

  const [data, setData] = React.useState<TransactionEvent | undefined>(
    undefined,
  )

  const onReceived = React.useCallback((data) => {
    setData(data)
  }, [])

  React.useEffect(() => {
    if (provider) {
      provider.on(txHash, onReceived)
    }
    return () => {
      if (provider) {
        provider.off(txHash, onReceived)
      }
    }
  }, [onReceived, provider, txHash])

  return data
}
