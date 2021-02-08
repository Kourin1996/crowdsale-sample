import React from 'react'
import { IndexPageTemplate } from '../../components/templates/index'

declare global {
  interface Window {
    ethereum: any
  }
}

const IndexPage: React.FC<{}> = () => {
  // React.useEffect(() => {
  //   provider
  //     .getBalance('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
  //     .then((balance) => {
  //       console.log('account balance', balance.toString())
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }, [provider])

  return <IndexPageTemplate />
}

export default IndexPage
