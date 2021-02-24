import React from 'react'
import { REQUIRED_CONFIRMATIONS } from '../../../constants/ethereum'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { useTransaction, useTransactionEvent } from '../../../hooks/transaction'
import { wei2GWei } from '../../../utils/ether'
import { ViewConfirmTransaction } from './view'

type ConfirmTransactionProps = {
  children?: never
  txHash: string
  onComplete: (txHash: string) => void
}

export const ConfirmTransaction: React.FC<ConfirmTransactionProps> = React.memo(
  (props) => {
    const { txHash, onComplete } = props

    const { data: transaction } = useTransaction(txHash)
    const transactionEvent = useTransactionEvent(txHash)

    const provider = useEthersProvider()

    const networkName = provider.network.name
    const chainId = transaction?.chainId ?? null
    const gasPrice = transaction ? wei2GWei(transaction.gasPrice, 2) : null

    const gasUsed = transactionEvent
      ? transactionEvent.gasUsed.toNumber()
      : null
    const confirmations = transactionEvent?.confirmations ?? 0
    const progress = confirmations / REQUIRED_CONFIRMATIONS
    const isCompleted = confirmations === REQUIRED_CONFIRMATIONS

    React.useEffect(() => {
      if (isCompleted) {
        const timer = setTimeout(() => {
          onComplete(txHash)
        }, 1000)
        return () => {
          clearTimeout(timer)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleted])

    return (
      <ViewConfirmTransaction
        chainId={chainId}
        txHash={txHash}
        blockHash={transaction?.blockHash ?? null}
        blockNumber={transaction?.blockNumber ?? null}
        gasUsed={gasUsed}
        gasPrice={gasPrice}
        networkName={networkName}
        confirmations={confirmations}
        requiredConfirmations={REQUIRED_CONFIRMATIONS}
        progress={progress}
        isCompleted={isCompleted}
      />
    )
  },
)
