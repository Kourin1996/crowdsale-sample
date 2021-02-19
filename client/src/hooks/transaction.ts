import { ethers } from 'ethers'
import React from 'react'
import { useEthersProvider } from '../contexts/ethers-provider'

type TransactionInfo = {
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number
  byzantium: boolean
  confirmations: number
  contractAddress: string | undefined
  cumulativeGasUsed: ethers.BigNumber
  gasUsed: ethers.BigNumber
  from: string
  to: string
  logs: any[]
  logsBloom: string
  status: number
}

export const useTransaction = (txHash: string) => {
  const provider = useEthersProvider()

  const [data, setData] = React.useState<TransactionInfo | undefined>(undefined)

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
