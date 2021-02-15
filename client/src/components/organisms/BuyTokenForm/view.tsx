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
  ethAmount: string
  tokenAmount: string
  isBuyButtonDisable: boolean
  onEthChange: React.ChangeEventHandler
  onTokenAmountChange: React.ChangeEventHandler
  onBuyButtonClick: React.MouseEventHandler
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
    ethAmount,
    tokenAmount,
    isBuyButtonDisable,
    onEthChange,
    onTokenAmountChange,
    onBuyButtonClick,
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
          <NumberInput
            type="number"
            required={true}
            placeholder="ETH"
            value={ethAmount}
            onChange={onEthChange}
          />
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
          <NumberInput
            type="number"
            required={true}
            placeholder="Token"
            value={tokenAmount}
            onChange={onTokenAmountChange}
          />
          <Box position="absolute" right={0} top={0}>
            <Text color="near-black" lineHeight={'1em'} pt={3} pr={3}>
              Token
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex mt={3} justifyContent="center">
        <Button disabled={isBuyButtonDisable} onClick={onBuyButtonClick}>
          BUY TOKEN
        </Button>
      </Flex>
    </Flex>
  )
}
