import { ethers } from 'ethers'

export const wei2GWei = (
  wei: ethers.BigNumber,
  decimal: number = 0,
): number => {
  return wei.div(10 ** (9 - decimal)).toNumber() / 10 ** decimal
}
