import React from 'react'
import styled from 'styled-components'
import { EthereumHash } from '../../atoms/EthereumHash'
import { TableColumn } from '../../atoms/TableColumn'

const { Button, Input, Box, Flex, Text } = require('rimble-ui')

const NumberInput = styled(Input)`
  max-width: 200px;
  padding-right: 65px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

type ViewBuyTokenFormProps = {
  networkName: string
  crowdsaleAddress: string
  tokenAddress: string
  purchasedAmount: number
  totalAmount: number
  ethRaised: number
  currentRate: number
}

export const ViewBuyTokenForm: React.FC<ViewBuyTokenFormProps> = (props) => {
  const {
    networkName,
    crowdsaleAddress,
    tokenAddress,
    purchasedAmount,
    totalAmount,
    ethRaised,
    currentRate,
  } = props

  return (
    <Flex justifyContent={'space-between'} flexDirection={'column'}>
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
          <Text color={'white'}>ICO Information</Text>
        </Box>
        <TableColumn bgColor="light-grey" label="Network">
          <Text
            mr={[2, 0]}
            color="near-black"
            fontWeight="bold"
            lineHeight={'1em'}
          >
            {networkName}
          </Text>
        </TableColumn>
        <div className="grid grid-cols-2">
          <TableColumn bgColor="near-white" label="ICO">
            <EthereumHash
              type="address"
              network={networkName}
              hash={crowdsaleAddress}
            />
          </TableColumn>
          <Box borderLeft="1px solid gray" borderColor="moon-gray">
            <TableColumn bgColor="near-white" label="Token">
              <EthereumHash
                type="address"
                network={networkName}
                hash={tokenAddress}
              />
            </TableColumn>
          </Box>
        </div>
        <div className="grid grid-cols-2">
          <TableColumn bgColor="light-grey" label="Raised">
            <Text
              ml={[0, 3]}
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              {`${ethRaised} ETH`}
            </Text>
          </TableColumn>

          <Box borderLeft="1px solid gray" borderColor="moon-gray">
            <TableColumn bgColor="light-grey" label="Purchased">
              <Text
                ml={[0, 3]}
                mr={[2, 0]}
                color="near-black"
                fontWeight="bold"
                lineHeight={'1em'}
              >
                {`${purchasedAmount} / ${totalAmount} Token`}
              </Text>
            </TableColumn>
          </Box>
        </div>
        <TableColumn bgColor="near-white" label="Rate">
          <Text
            mr={[2, 0]}
            color="near-black"
            fontWeight="bold"
            lineHeight={'1em'}
          >
            {`${currentRate} Token / ETH`}
          </Text>
        </TableColumn>
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        <Box position="relative">
          <NumberInput type="number" required={true} placeholder="ETH" />
          <Box position="absolute" right={0} top={0}>
            <Text color="near-black" lineHeight={'1em'} pt={3} pr={3}>
              ETH
            </Text>
          </Box>
        </Box>
        <Text color="near-black" fontSize={3} mx={2}>
          =
        </Text>
        <Box position="relative">
          <NumberInput type="number" required={true} placeholder="Token" />
          <Box position="absolute" right={0} top={0}>
            <Text color="near-black" lineHeight={'1em'} pt={3} pr={3}>
              Token
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}

/*
<TableColumn bgColor="near-white">
          <Text
            textAlign={['center', 'left']}
            color="near-black"
            fontWeight="bold"
          >
            Price
          </Text>
          <Flex
            alignItems={['center', 'flex-end']}
            flexDirection={['row', 'column']}
          >
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              5.4 ETH
            </Text>
            <Text color="mid-gray" fontSize={1}>
              $1450 USD
            </Text>
          </Flex>
        </TableColumn>

        <TableColumn bgColor="light-grey">
          <Flex alignItems={'center'}>
            <Text
              textAlign={['center', 'left']}
              color="near-black"
              fontWeight="bold"
            >
              Transaction fee
            </Text>
            <Tooltip
              message="Pays the Ethereum network to process your transaction. Spent even if the transaction fails."
              position="top"
            >
              <Icon
                ml={1}
                name={'InfoOutline'}
                size={'14px'}
                color={'primary'}
              />
            </Tooltip>
          </Flex>
          <Flex
            alignItems={['center', 'flex-end']}
            flexDirection={['row', 'column']}
          >
            <Text
              mr={[2, 0]}
              color="near-black"
              fontWeight="bold"
              lineHeight={'1em'}
            >
              $0.42
            </Text>
            <Text color="mid-gray" fontSize={1}>
              0.00112 ETH
            </Text>
          </Flex>
        </TableColumn>

        <TableColumn bgColor="near-white">
          <Text color="near-black" fontWeight="bold">
            Estimated time
          </Text>
          <Text color={'mid-gray'}>Less than 2 minutes</Text>
        </TableColumn>
        */
