import { Networks } from '../domain/ethereum'

export const DEFAULT_NETWORK = 'http://127.0.0.1:8545'

export type ContractAddresses = { [key in Networks]?: string }

export const TokenAddresses: ContractAddresses = {
  localhost: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
}

export const CrowdsaleContractAddresses: ContractAddresses = {
  localhost: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
}
