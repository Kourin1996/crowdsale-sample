import React from 'react'
import { REQUIRED_CONFIRMATIONS } from '../../../constants/ethereum'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { useTransaction } from '../../../hooks/transaction'
import { ViewConfirmTransaction } from './view'

type ConfirmTransactionProps = {
  children?: never
  txHash: string
}

export const ConfirmTransaction: React.FC<ConfirmTransactionProps> = React.memo(
  (props) => {
    const { txHash } = props

    const transaction = useTransaction(txHash)
    const provider = useEthersProvider()

    const networkName = provider.network.name
    const confirmations = transaction?.confirmations ?? 0
    const progress = confirmations / REQUIRED_CONFIRMATIONS
    const isCompleted = transaction?.confirmations === REQUIRED_CONFIRMATIONS

    return (
      <ViewConfirmTransaction
        txHash={txHash}
        networkName={networkName}
        confirmations={confirmations}
        requiredConfirmations={REQUIRED_CONFIRMATIONS}
        progress={progress}
        isCompleted={isCompleted}
      />
    )
  },
)
