import React from 'react'

const INTERVAL = 1000

//workaround
export const useWaitTruthy = (value: any) => {
  const [_flag, setFlag] = React.useState(false)
  React.useEffect(() => {
    if (!value) {
      const timer = setInterval(() => {
        setFlag((flag) => !flag)
      }, INTERVAL)

      return () => {
        clearInterval(timer)
      }
    }
  }, [value])
}
