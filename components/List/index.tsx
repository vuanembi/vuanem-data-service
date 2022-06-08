import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VStack } from '@chakra-ui/react';

import ListItem, { ListItemType } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemType[];
    handleSelect: Dispatch<SetStateAction<string>>;
};

const List: FC<ListProps> = ({ items, handleSelect }) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(
        () => setItemList(items.filter(({ id }) => id.match(searchTerm))),
        [items, searchTerm]
    );

    return (
        <VStack maxH="full" w="full" alignItems="stretch">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            <VStack overflowY="auto">
                {itemList.map((item, i) => (
                    <ListItem key={i} item={item} setSelection={handleSelect} />
                ))}
            </VStack>
        </VStack>
    );
};
export default List;
