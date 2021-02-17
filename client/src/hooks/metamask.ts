import React from 'react'
import useSWR from 'swr'

export const useIsMetamaskInstalled = () => {
  const [isInstalled, setIsInstalled] = React.useState(false)

  React.useEffect(() => {
    setIsInstalled(typeof window.ethereum !== 'undefined')
  }, [])

  return isInstalled
}

export const useMetamaskChainId = () => {
  const isMetamaskInstalled = useIsMetamaskInstalled()

  const swr = useSWR<string>(
    isMetamaskInstalled ? 'metamask-eth_chainId' : null,
    async () => await window.ethereum.request({ method: 'eth_chainId' }),
  )

  React.useEffect(() => {
    if (isMetamaskInstalled) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        swr.mutate(chainId)
      })
    }
  }, [isMetamaskInstalled, swr])

  return swr
}

export const useMetamaskAccounts = () => {
  const isMetamaskInstalled = useIsMetamaskInstalled()

  const swr = useSWR<string[]>(
    isMetamaskInstalled ? 'metamask-eth_requestAccounts' : null,
    async () =>
      await window.ethereum.request({ method: 'eth_requestAccounts' }),
  )

  React.useEffect(() => {
    if (isMetamaskInstalled) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        swr.mutate(accounts)
      })
    }
  }, [isMetamaskInstalled, swr])

  return swr
}
