import { Networks } from '../domain/ethereum'

export const DEFAULT_NETWORK = 'http://localhost:8545'

export type ContractAddresses = { [key in Networks]?: string }

export const TokenAddresses: ContractAddresses = {
  localhost: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
}

export const CrowdsaleContractAddresses: ContractAddresses = {
  localhost: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
}
