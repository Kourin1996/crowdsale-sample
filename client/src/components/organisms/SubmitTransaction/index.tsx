import { ethers } from 'ethers'
import React from 'react'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { useCrowdsaleContract } from '../../../hooks/crowdsale-contract'
import { useEstimateTransferGas, useGasPrice } from '../../../hooks/gas'
import {
  useIsMetamaskInstalled,
  useMetamaskAccounts,
  useMetamaskChainId,
} from '../../../hooks/metamask'
import { wei2GWei } from '../../../utils/ether'
import { ViewSubmitTransaction } from './view'

type SubmitTransactionProps = {
  children?: never
  eth: number
  token: number
  onTransactionCreated: (txHash: string) => void
  onTransactionError: () => void
}

export const SubmitTransaction: React.FC<SubmitTransactionProps> = React.memo(
  (props) => {
    const { eth, token, onTransactionCreated, onTransactionError } = props

    const provider = useEthersProvider()
    const { data: crowdsale } = useCrowdsaleContract()
    const isMetamaskInstalled = useIsMetamaskInstalled()
    const { data: metamaskAccounts } = useMetamaskAccounts()
    const { data: metamaskChainId } = useMetamaskChainId()
    const { data: gasPrice } = useGasPrice()
    const { data: estimateGas } = useEstimateTransferGas(
      metamaskAccounts ? metamaskAccounts[0] : '',
      crowdsale ? crowdsale.address : '',
      ethers.utils.parseEther(`${eth}`),
    )

    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const onSubmit = React.useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                nonce: '0x00',
                gasPrice: gasPrice?.toHexString(),
                gas: estimateGas?.toHexString(),
                to: crowdsale?.address,
                from: metamaskAccounts ? metamaskAccounts[0] : '',
                value: ethers.utils.parseEther(`${eth}`).toHexString(),
                chainId: provider.network.chainId.toString(16),
              },
            ],
          })
          onTransactionCreated(txHash)
        } catch (error) {
          console.error(error)
          onTransactionError()
        } finally {
          setIsSubmitting(false)
        }
      },
      [
        onTransactionCreated,
        onTransactionError,
        provider,
        eth,
        crowdsale,
        gasPrice,
        estimateGas,
        metamaskAccounts,
      ],
    )

    const accountAddress = metamaskAccounts ? metamaskAccounts[0] : null
    const contractAddress = crowdsale ? crowdsale.address : null
    const gasPriceInGWei = gasPrice ? wei2GWei(gasPrice, 2) : null
    const estimateGasNumber = estimateGas ? estimateGas.toNumber() : null

    const isConnectedToMetamask = !!metamaskAccounts && !!metamaskChainId
    const isConnectingToMetamask = isMetamaskInstalled && !isConnectedToMetamask
    const providerNetworkName =
      provider.network.chainId === 31337 ? 'localhost' : provider.network.name
    const metamaskChainIdNumber = metamaskChainId
      ? Number.parseInt(metamaskChainId)
      : null

    return (
      <ViewSubmitTransaction
        eth={eth}
        token={token}
        accountAddress={accountAddress}
        contractAddress={contractAddress}
        gasPriceInGWei={gasPriceInGWei}
        estimateGas={estimateGasNumber}
        providerChainId={provider.network.chainId}
        providerNetworkName={providerNetworkName}
        metamaskChainId={metamaskChainIdNumber}
        isMetamaskInstalled={isMetamaskInstalled}
        isConnectedToMetamask={isConnectedToMetamask}
        isConnectingToMetamask={isConnectingToMetamask}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    )
  },
)
