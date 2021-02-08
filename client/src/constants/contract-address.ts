import { Networks } from '../domain/ethereum'

export type ContractAddresses = { [key in Networks]?: string }

export const CrowdsaleContractAddresses: ContractAddresses = {
  localhost: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
}
