import React from 'react'

type CountProps = {
  children?: never
  value: number
  label: string
}

export const Count: React.FC<CountProps> = (props) => {
  const { value, label } = props

  return (
    <div className="flex flex-col justify-center">
      <span className="text-center text-white text-5xl font-bold">{value}</span>
      <span className="text-center text-white text-xl font-bold">{label}</span>
    </div>
  )
}
