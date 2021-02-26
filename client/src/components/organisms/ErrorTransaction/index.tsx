import React from 'react'

const { Flex, Icon, Heading, Box, Text } = require('rimble-ui')

type ErrorTransactionProps = {}

export const ErrorTransaction: React.FC<ErrorTransactionProps> = (props) => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <Icon name="Warning" color="danger" aria-label="Warning" />
        <Flex ml={4}>
          <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
            Transaction Error
          </Heading>
        </Flex>
      </Flex>
      <Box p={[3, 4]}>
        <Text my={2}>
          Transaction has been failed by some reasons. Please try later.
        </Text>
      </Box>
    </Flex>
  )
}
