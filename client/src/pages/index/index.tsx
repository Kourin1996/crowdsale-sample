import React from 'react'
import { ethers } from 'ethers'
import { IndexPageTemplate } from '../../components/templates/index'
import {
  useEthersProvider,
  useEthersProviderSwitchNetworkContext,
} from '../../contexts/ethers-provider'
import { useEthersWallet } from '../../contexts/ethers-wallet'

declare global {
  interface Window {
    ethereum: any
  }
}

const IndexPage: React.FC<{}> = () => {
  const switchNetwork = useEthersProviderSwitchNetworkContext()
  const provider = useEthersProvider()
  const [wallet, setWallet] = useEthersWallet()

  React.useEffect(() => {
    setTimeout(() => {
      console.log('timeout')
      switchNetwork('ropsten')
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted) {
      console.log('useEffect:provider', provider)
      setWallet(ethers.Wallet.createRandom().connect(provider))
    } else {
      setMounted(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider])

  // React.useEffect(() => {
  //   provider
  //     .getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
  //     .then((balance) => {
  //       console.log('account balance', balance.toString())
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [provider])

  return <IndexPageTemplate />
}

export default IndexPage
