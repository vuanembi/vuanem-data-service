import { FC, useState, useEffect } from 'react';

import { VStack, HStack } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemProps[];
};

const List: FC<ListProps> = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');



    return (
        <VStack maxH="full" w="full" overflowY="auto">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            {items.map((item, i) => (
                <ListItem key={i} {...item} />
            ))}
        </VStack>
    );
};
export default List;
