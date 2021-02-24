import React from 'react'
import { getExplorerURL } from '../../../utils/explorer'
import { contractHash } from '../../../utils/string'
import { TableColumn } from '../../atoms/TableColumn'
const { Box, Flex, Text, Loader, Link, Tooltip } = require('rimble-ui')
const { CheckCircle } = require('@rimble/icons')
const NetworkIndicator = require('@rimble/network-indicator')

type AwaitingStatusProps = {
  children?: never
  confirmations: number
  required: number
}

const AwaitingStatus: React.FC<AwaitingStatusProps> = (props) => {
  const { confirmations, required } = props
  return (
    <>
      <Box
        position={'relative'}
        height={'2em'}
        width={'2em'}
        mr={[0, 3]}
        mb={[3, 0]}
      >
        <Box position={'absolute'} top={'0'} left={'0'}>
          <Loader size={'2em'} />
        </Box>
      </Box>
      <Box>
        <Text
          textAlign={['center', 'left']}
          fontWeight={'600'}
          fontSize={1}
          lineHeight={'1.25em'}
        >
          {`Waiting for confirmation... (${confirmations}/${required})`}
        </Text>
      </Box>
    </>
  )
}

type CompletedStatusProps = {
  children?: never
}

const CompletedStatus: React.FC<CompletedStatusProps> = () => {
  return (
    <>
      <Flex
        position={'relative'}
        alignItems="center"
        height={'2em'}
        width={'2em'}
        mr={[0, 2]}
        mb={[3, 0]}
      >
        <CheckCircle size={30} color="success" />
      </Flex>
      <Flex alignItems="center">
        <Text
          textAlign={['center', 'left']}
          fontWeight={'600'}
          fontSize={1}
          lineHeight={'1.25em'}
        >
          {`Your transaction has been confirmed!!`}
        </Text>
      </Flex>
    </>
  )
}

type ViewConfirmTransactionProps = {
  children?: never
  chainId: number | null
  networkName: string
  txHash: string
  blockHash: string | null
  blockNumber: number | null
  gasUsed: number | null
  gasPrice: number | null
  confirmations: number
  requiredConfirmations: number
  progress: number
  isCompleted: boolean
}

export const ViewConfirmTransaction: React.FC<ViewConfirmTransactionProps> = (
  props,
) => {
  const {
    chainId,
    networkName,
    txHash,
    blockHash,
    blockNumber,
    gasUsed,
    gasPrice,
    confirmations,
    requiredConfirmations,
    progress,
    isCompleted,
  } = props

  const minimumTxHash = contractHash(txHash)
  const minimumBlockHash = contractHash(blockHash ?? '')

  return (
    <Flex flexDirection="column">
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
        <Box bg={'success'} width={progress} px={3} py={2} />
        <Box bg={'primary'} px={3} py={2}>
          <Text color={'white'}>Transaction Status</Text>
        </Box>
        <Flex
          p={3}
          borderBottom={'1px solid gray'}
          borderColor={'moon-gray'}
          alignItems={'center'}
          flexDirection={['column', 'row']}
        >
          {isCompleted !== true ? (
            <AwaitingStatus
              confirmations={confirmations}
              required={requiredConfirmations}
            />
          ) : (
            <CompletedStatus />
          )}
        </Flex>
        <TableColumn bgColor="light-grey" label="Network">
          <NetworkIndicator currentNetwork={chainId} />
        </TableColumn>
        <TableColumn bgColor="near-white" label="Tx Hash">
          <Link
            href={getExplorerURL(networkName, 'tx', txHash)}
            target={'_blank'}
          >
            <Tooltip message={txHash}>
              <Flex
                justifyContent={['center', 'auto']}
                alignItems={'center'}
                flexDirection="row-reverse"
              >
                <Text fontWeight="bold">{minimumTxHash}</Text>
              </Flex>
            </Tooltip>
          </Link>
        </TableColumn>
        <TableColumn bgColor="light-grey" label="Block Hash">
          {blockHash && (
            <Link
              href={getExplorerURL(networkName, 'block', blockHash)}
              target={'_blank'}
            >
              <Tooltip message={txHash}>
                <Flex
                  justifyContent={['center', 'auto']}
                  alignItems={'center'}
                  flexDirection="row-reverse"
                >
                  <Text fontWeight="bold">{minimumBlockHash}</Text>
                </Flex>
              </Tooltip>
            </Link>
          )}
        </TableColumn>
        <TableColumn bgColor="near-white" label="Block Number">
          {blockNumber && <Text fontWeight="bold">{blockNumber}</Text>}
        </TableColumn>
        <div className="grid grid-cols-2">
          <TableColumn bgColor="light-grey" label="Gas Used">
            {gasUsed && <Text fontWeight="bold">{gasUsed}</Text>}
          </TableColumn>
          <TableColumn bgColor="light-grey" label="Gas Price">
            {gasPrice && <Text fontWeight="bold">{`${gasPrice} GWei`}</Text>}
          </TableColumn>
        </div>
      </Flex>
    </Flex>
  )
}
