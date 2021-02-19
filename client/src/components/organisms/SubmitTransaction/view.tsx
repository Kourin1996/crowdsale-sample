import React from 'react'
import { TableColumn } from '../../atoms/TableColumn'
const {
  Loader,
  Box,
  Flex,
  Text,
  Flash,
  Button,
  MetaMaskButton,
} = require('rimble-ui')
const NetworkIndicator = require('@rimble/network-indicator')

type ViewSubmitTransactionProps = {
  children?: never
  eth: number
  token: number
  accountAddress: string | null
  contractAddress: string | null
  gasPriceInGWei: number | null
  estimateGas: number | null
  providerChainId: number | null
  providerNetworkName: string | null
  metamaskChainId: number | null
  isMetamaskInstalled: boolean
  isConnectedToMetamask: boolean
  isConnectingToMetamask: boolean
  isSubmitting: boolean
  onSubmit: React.MouseEventHandler
}

export const ViewSubmitTransaction: React.FC<ViewSubmitTransactionProps> = (
  props,
) => {
  const {
    eth,
    token,
    accountAddress,
    contractAddress,
    gasPriceInGWei,
    estimateGas,
    providerChainId,
    providerNetworkName,
    metamaskChainId,
    isMetamaskInstalled,
    isConnectingToMetamask,
    isConnectedToMetamask,
    isSubmitting,
    onSubmit,
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
        <TableColumn bgColor="light-grey" label="Network">
          <NetworkIndicator
            currentNetwork={metamaskChainId}
            requiredNetwork={providerChainId}
          />
        </TableColumn>
        <TableColumn bgColor="near-white" label="From">
          <Text
            mr={[2, 0]}
            color="near-black"
            fontWeight="bold"
            lineHeight={'1em'}
          >
            {accountAddress}
          </Text>
        </TableColumn>
        <TableColumn bgColor="light-grey" label="To">
          <Text
            mr={[2, 0]}
            color="near-black"
            fontWeight="bold"
            lineHeight={'1em'}
          >
            {contractAddress}
          </Text>
        </TableColumn>
        <div className="grid grid-cols-2">
          <TableColumn bgColor="near-white" label="Pay">
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              {`${eth} ETH`}
            </Text>
          </TableColumn>
          <TableColumn bgColor="near-white" label="Receive">
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              {`${token} Token`}
            </Text>
          </TableColumn>
        </div>
        <div className="grid grid-cols-2">
          <TableColumn bgColor="light-grey" label="Estimate Gas">
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              {`${estimateGas}`}
            </Text>
          </TableColumn>
          <TableColumn bgColor="light-grey" label="Gas Price">
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              {`${gasPriceInGWei} GWei`}
            </Text>
          </TableColumn>
        </div>
      </Flex>
      <Flex mt={2} justifyContent="center">
        <MetaMaskButton.Outline onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting !== true ? (
            `Submit with MetaMask`
          ) : (
            <Box>
              <Loader />
            </Box>
          )}
        </MetaMaskButton.Outline>
      </Flex>
    </Flex>
  )
}
