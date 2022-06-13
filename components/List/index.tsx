import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VStack, Skeleton } from '@chakra-ui/react';

import ListItem, { ListItemProps } from './ListItem';
import Search from './Search';

type ListProps = {
    items: ListItemProps['item'][];
    iconFn: ListItemProps['iconFn'];
    loaded: boolean;
    handleSelect: Dispatch<SetStateAction<string>>;
};

const List = ({ items, iconFn, loaded, handleSelect }: ListProps) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        setItemList(
            items.filter(({ id }) =>
                id.toLowerCase().match(searchTerm.toLowerCase())
            )
        );
        setActiveIndex(null);
    }, [items, searchTerm]);

    return (
        <VStack maxH="full" flex="0 0 33%" alignItems="stretch">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            <VStack overflowY="auto">
                <Skeleton w="full" isLoaded={loaded} height="800px">
                    <VStack overflowY="auto">
                        {itemList.map((item, i) => (
                            <ListItem
                                key={item.id}
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
