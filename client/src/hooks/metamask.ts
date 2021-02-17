import React from 'react'
import useSWR from 'swr'

export const useIsMetamaskInstalled = () => {
  const [isInstalled, setIsInstalled] = React.useState(false)

  React.useEffect(() => {
    setIsInstalled(typeof window.ethereum !== 'undefined')
  }, [])

  return isInstalled
}

export const useSelectedAccountAddress = () => {}

export const useMetamaskAccounts = () => {
  const isMetamaskInstalled = useIsMetamaskInstalled()

  const swr = useSWR<string[]>(
    isMetamaskInstalled ? 'metamask-eth_requestAccounts' : null,
    async () => window.ethereum.request({ method: 'eth_requestAccounts' }),
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
