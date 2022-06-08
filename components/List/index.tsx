import { FC, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemProps[];
};

const List: FC<ListProps> = ({ items }) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>
        setItemList(items.filter(({ id }) => id.match(searchTerm))),
        [items, searchTerm]
    );

    return (
        <VStack maxH="full" w="full" overflowY="auto">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            {itemList.map((item, i) => (
                <ListItem key={i} {...item} />
            ))}
        </VStack>
    );
};
export default List;
