import React from 'react'
const { Loader, Box, Flex, Text, Flash } = require('rimble-ui')
const NetworkIndicator = require('@rimble/network-indicator')

type ViewSubmitTransactionProps = {
  children?: never
  eth: number
  token: number
  providerChainId: number | null
  providerNetworkName: string | null
  metamaskChainId: number | null
  isMetamaskInstalled: boolean
  isConnectedToMetamask: boolean
  isConnectingToMetamask: boolean
}

export const ViewSubmitTransaction: React.FC<ViewSubmitTransactionProps> = (
  props,
) => {
  const {
    eth,
    token,
    providerChainId,
    providerNetworkName,
    metamaskChainId,
    isMetamaskInstalled,
    isConnectingToMetamask,
    isConnectedToMetamask,
  } = props

  const showsWrongNetworkAlert =
    isConnectedToMetamask &&
    metamaskChainId !== null &&
    providerChainId !== metamaskChainId

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
      {showsWrongNetworkAlert && (
        <Flex py={3} justifyContent="center">
          <Box maxWidth="450px">
            <Flash variant="danger">
              {`Switch to the ${providerNetworkName} network in MetaMask`}
            </Flash>
          </Box>
        </Flex>
      )}
      <Flex
        alignItems={'stretch'}
        flexDirection={'column'}
        borderRadius={2}
        borderColor={'moon-gray'}
        borderWidth={1}
        borderStyle={'solid'}
        overflow={'hidden'}
        my={[2, 3]}
      >
        <Box bg={'primary'} px={3} py={2}>
          <Text color={'white'}>Transaction Information</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

{
  /* <NetworkIndicator
currentNetwork={metamaskChainId}
requiredNetwork={providerChainId}
>
{{
  onNetworkMessage: 'Connected to correct network',
  noNetworkMessage: 'Not connected to anything',
  onWrongNetworkMessage: 'Wrong network',
}}
</NetworkIndicator> */
}
