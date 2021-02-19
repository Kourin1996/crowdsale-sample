import React from 'react'
import { useCrowdsaleStatus } from '../../../hooks/crowdsale-status'
import { ConfirmTransaction } from '../../organisms/ConfirmTransaction'
import { InputTokenAmount } from '../../organisms/InputTokenAmount'
import { SubmitTransaction } from '../../organisms/SubmitTransaction'

const { Modal, Card, Button } = require('rimble-ui')

enum PageTypes {
  InputTokenAmount = 'InputTokenAmount',
  SubmitTransaction = 'SubmitTransaction',
  ConfirmTransaction = 'ConfirmTransaction',
}

type PurchaseModalProps = {
  children?: never
}

export const PurchaseModal: React.FC<PurchaseModalProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [pageType, setPageType] = React.useState(PageTypes.InputTokenAmount)

  const onBuyTokenClick = React.useCallback(() => setIsOpen(true), [])
  const onModalClose = React.useCallback(() => {
    setIsOpen(false)
    setPageType(PageTypes.InputTokenAmount)
  }, [])

  const [ethAmount, setEthAmount] = React.useState<number | undefined>(
    undefined,
  )
  const [tokenAmount, setTokenAmount] = React.useState<number | undefined>(
    undefined,
  )
  const [txHash, setTxHash] = React.useState<string | undefined>(undefined)
  const onClickBuy = React.useCallback((eth: number, token: number) => {
    setEthAmount(eth)
    setTokenAmount(token)
    setPageType(PageTypes.SubmitTransaction)
  }, [])
  const onTransactionCreated = React.useCallback((txHash: string) => {
    setTxHash(txHash)
    setPageType(PageTypes.ConfirmTransaction)
  }, [])

  const { data: crowdsaleStatus } = useCrowdsaleStatus()
  const isBuyButtonDisabled =
    !crowdsaleStatus || !crowdsaleStatus.hasStarted || crowdsaleStatus.hasClosed

  return (
    <div>
      <div className="flex justify-center">
        <Button disabled={isBuyButtonDisabled} onClick={onBuyTokenClick}>
          BUY TOKEN
        </Button>
      </div>
      <Modal isOpen={isOpen}>
        <Card minWidth="600px">
          <Button.Text
            icononly
            icon={'Close'}
            color={'moon-gray'}
            position={'absolute'}
            top={0}
            right={0}
            onClick={onModalClose}
          />
          {pageType === PageTypes.InputTokenAmount && (
            <InputTokenAmount onClickBuy={onClickBuy} />
          )}
          {pageType === PageTypes.SubmitTransaction &&
            ethAmount &&
            tokenAmount && (
              <SubmitTransaction
                eth={ethAmount}
                token={tokenAmount}
                onTransactionCreated={onTransactionCreated}
              />
            )}
          {pageType === PageTypes.ConfirmTransaction && txHash && (
            <ConfirmTransaction txHash={txHash} />
          )}
        </Card>
      </Modal>
    </div>
  )
}
