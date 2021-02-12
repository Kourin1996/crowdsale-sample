import React from 'react'

type IcoProgressViewProps = {
  children?: never
  percent: number
  ethRaised: number
  purchasedAmount: number
  remainingAmount: number
}

export const IcoProgressView: React.FC<IcoProgressViewProps> = (props) => {
  const { percent, ethRaised, purchasedAmount, remainingAmount } = props

  return (
    <div className="relative">
      <span className="text-white text-xl font-bold">
        {`${ethRaised} ETH Raised`}
      </span>
      <div className="flex mt-1 h-8 text-xs bg-red-200 rounded overflow-hidden">
        <div
          style={{ width: `${percent}%` }}
          className="flex flex-col justify-center text-center text-white whitespace-nowrap bg-red-500 shadow-none"
        ></div>
      </div>
      <div className="mt-1 w-full text-right text-white text-xl font-bold">
        {`${purchasedAmount} Token Purchased (${remainingAmount} remaining)`}
      </div>
    </div>
  )
}
