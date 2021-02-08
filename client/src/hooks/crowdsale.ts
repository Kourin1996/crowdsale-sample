import React from 'react'
import { ethers } from 'ethers'
import crowdsaleAbi from '../abi/KourinTokenCrowdsale.json'

export const useCrowdsale = (
  contractAddress: string,
  signer: ethers.Wallet,
) => {
  const crowdsale = React.useMemo(
    () => new ethers.Contract(contractAddress, crowdsaleAbi, signer),
    [contractAddress, signer],
  )

  return crowdsale
}
