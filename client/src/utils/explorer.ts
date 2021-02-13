const getExplorerEndpoint = (network: string) => {
  switch (network) {
    case 'mainnet':
      return 'https://etherscan.io'
    case 'ropsten':
      return 'https://ropsten.etherscan.io'
    case 'kovan':
      return 'https://kovan.etherscan.io'
    case 'rinkeby':
      return 'https://rinkeby.etherscan.io'
    case 'goerli':
      return 'https://goerli.etherscan.io'
    default:
      break
  }
}

export const getExplorerURL = (
  network: string,
  type: 'block' | 'tx' | 'address',
  id: string,
) => {
  const endpoint = getExplorerEndpoint(network)

  return endpoint ? `${endpoint}/${type}/${id}` : undefined
}
