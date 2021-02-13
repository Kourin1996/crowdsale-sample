import React from 'react'
import { BuyTokenForm } from '../../organisms/BuyTokenForm'

const { Modal, Card, Button } = require('rimble-ui')

enum PageTypes {
  BuyTokenForm = 'BuyTokenForm',
}

type PurchaseModalProps = {
  children?: never
}

export const PurchaseModal: React.FC<PurchaseModalProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [pageType] = React.useState(PageTypes.BuyTokenForm)

  const onBuyTokenClick = React.useCallback(() => setIsOpen(true), [])
  const onModalClose = React.useCallback(() => setIsOpen(false), [])

  return (
    <div>
      <div className="flex justify-center">
        {/* todo: disable on close */}
        <Button onClick={onBuyTokenClick}>BUY TOKEN</Button>
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
          {pageType === PageTypes.BuyTokenForm && <BuyTokenForm />}
        </Card>
      </Modal>
    </div>
  )
}
