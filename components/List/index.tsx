import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VStack, Skeleton } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemProps['item'][];
    iconFn: ListItemProps['iconFn'];
    loading: boolean;
    handleSelect: Dispatch<SetStateAction<string>>;
};

const List = ({ items, iconFn, loading, handleSelect }: ListProps) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        setItemList(items.filter(({ id }) => id.match(searchTerm)));
        setActiveIndex(null);
    }, [items, searchTerm]);

    return (
        <VStack maxH="full" flex="0 0 33%" alignItems="stretch">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            <VStack overflowY="auto">
                <Skeleton w="full" isLoaded={loading} height="800px">
                    <VStack overflowY="auto">
                        {itemList.map((item, i) => (
                            <ListItem
                                key={i}
                                item={item}
                                iconFn={iconFn}
                                active={i === activeIndex ? true : false}
                                setActiveIndex={() => setActiveIndex(i)}
                                setSelection={handleSelect}
                            />
                        ))}
                    </VStack>
                </Skeleton>
            </VStack>
        </VStack>
    );
};
export default List;
