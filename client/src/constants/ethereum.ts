import { Networks } from '../domain/ethereum'

export const DEFAULT_NETWORK = 'http://localhost:8545'

export type ContractAddresses = { [key in Networks]?: string }

export const CrowdsaleContractAddresses: ContractAddresses = {
  localhost: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
}
