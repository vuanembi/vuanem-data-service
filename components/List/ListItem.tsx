import React from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiDatabase, FiChevronDown } from 'react-icons/fi';

export type ListItemProps = {
    id: string;
};

const ListItem: React.FC<ListItemProps> = ({ id }) => (
    <HStack
        w="full"
        p={4}
        borderWidth={1}
        borderColor="red"
        alignContent="stretch"
    >
        <Icon as={FiDatabase} />
        <Text flex="1">{id}</Text>
        <Icon as={FiChevronDown} />
    </HStack>
);

export default ListItem;
