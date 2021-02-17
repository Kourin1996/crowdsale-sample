import React from 'react'
const { Loader, Box, Flex, Text, Flash } = require('rimble-ui')

type ViewSubmitTransactionProps = {
  children?: never
  eth: number
  token: number
  isMetamaskInstalled: boolean
  isConnectingToMetamask: boolean
}

export const ViewSubmitTransaction: React.FC<ViewSubmitTransactionProps> = (
  props,
) => {
  const { eth, token, isMetamaskInstalled, isConnectingToMetamask } = props

  return (
    <Flex flexDirection="column">
      {!isMetamaskInstalled && (
        <Flex py={3} justifyContent="center">
          <Box maxWidth="450px">
            <Flash variant="danger">
              Metamask is not installed in this browser. Please install Metamask
              in store.
            </Flash>
          </Box>
        </Flex>
      )}
      {isConnectingToMetamask && (
        <Flex
          flexDirection={['column', 'row']}
          bg={'light-grey'}
          py={3}
          alignItems={['center', 'auto']}
        >
          <Loader size={'3em'} mr={[0, 3]} mb={[2, 0]} />
          <Flex flexDirection="column" alignItems={['center', 'flex-start']}>
            <Text fontWeight={4}>Connecting to metamask</Text>
          </Flex>
        </Flex>
      )}
      <p>{eth}</p>
      <p>{token}</p>
    </Flex>
  )
}
