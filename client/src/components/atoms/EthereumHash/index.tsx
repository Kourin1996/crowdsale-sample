import React from 'react'
import { getExplorerURL } from '../../../utils/explorer'
const { Flex, Link, Text, Icon, Tooltip } = require('rimble-ui')

type EthereumHashProps = {
  children?: never
  network: string
  type: 'block' | 'tx' | 'address'
  hash: string
}

export const EthereumHash: React.FC<EthereumHashProps> = (props) => {
  const { network, type, hash } = props

  const url = getExplorerURL(network, type, hash)

  const viewHash = React.useMemo(() => {
    const prefixHash = hash.slice(0, 6)
    const suffixHash = hash.slice(-4)
    return `${prefixHash}...${suffixHash}`
  }, [hash])

  const content = (
    <Tooltip message={hash}>
      <Flex
        justifyContent={['center', 'auto']}
        alignItems={'center'}
        flexDirection="row"
      >
        {url !== undefined && (
          <Flex
            mr={2}
            p={1}
            borderRadius={'50%'}
            bg={'primary-extra-light'}
            height={'2em'}
            width={'2em'}
            alignItems="center"
            justifyContent="center"
          >
            <Icon color={'primary'} name="RemoveRedEye" size={'1em'} />
          </Flex>
        )}
        <Text fontWeight="bold">{viewHash}</Text>
      </Flex>
    </Tooltip>
  )

  return url !== undefined ? (
    <Link href={url} target={'_blank'}>
      {content}
    </Link>
  ) : (
    content
  )
}
