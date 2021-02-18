import { ethers } from 'ethers'
import React from 'react'
import { useEthersProvider } from '../../../contexts/ethers-provider'
import { useCrowdsaleContract } from '../../../hooks/crowdsale-contract'
import { useCrowdsaleInfo } from '../../../hooks/crowdsale-info'
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
}

export const SubmitTransaction: React.FC<SubmitTransactionProps> = React.memo(
  (props) => {
    const { eth, token } = props

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
      />
    )
  },
)
