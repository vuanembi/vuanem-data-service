import React from 'react';

import { VStack } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';

type ListProps = {
    items: ListItemProps[];
};

const List: React.FC<ListProps> = ({ items }) => (
    <VStack maxH="85vh" w="full" overflowY="auto">
        {items.map((item, i) => (
            <ListItem key={i} {...item} />
        ))}
    </VStack>
);

export default List;
