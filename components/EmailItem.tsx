import { Email } from '@/interface/Email'
import { Card, Flex, Text } from '@mantine/core'
import React from 'react'

function EmailItem({email}:{email:Email}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex>
            <Text>Haha</Text>
        </Flex>
    </Card>
  )
}

export default EmailItem