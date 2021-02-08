import { ContractNames } from '../domain/ethereum'
import { CrowdsaleContractAddresses } from '../constants/contract-address'

export const getContractAddressMap = (contractName: ContractNames) => {
  switch (contractName) {
    case 'crowdsale':
      return CrowdsaleContractAddresses
    default:
      const invalidName: never = contractName
      throw new Error(`Invalid Contract Name: ${invalidName}`)
  }
}

export const getContractAddress = (
  contractName: ContractNames,
  network: string,
) => {
  const contractAddresses: {
    [key: string]: string | undefined
  } = getContractAddressMap(contractName)
  return contractAddresses[network]
}
