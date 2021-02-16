import React from 'react'
import { IndexPageTemplate } from '../../components/templates/index'

declare global {
  interface Window {
    ethereum: any
  }
}

const IndexPage: React.FC<{}> = () => {
  return <IndexPageTemplate />
}

export default IndexPage
