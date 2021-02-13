import React from 'react'
const { Flex, Text } = require('rimble-ui')

type TableColumnProps = {
  bgColor: 'light-grey' | 'near-white'
  label: string
}

export const TableColumn: React.FC<TableColumnProps> = (props) => {
  const { bgColor, label, children } = props

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg={bgColor}
      p={[2, 3]}
      borderBottom="1px solid gray"
      borderColor="moon-gray"
      flexDirection={['column', 'row']}
    >
      <Text textAlign={['center', 'left']} color="near-black" fontWeight="bold">
        {label}
      </Text>
      {children}
    </Flex>
  )
}
