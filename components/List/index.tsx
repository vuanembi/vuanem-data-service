import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';

import { VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import ListItem from './ListItem';
import Search from './Search';

type ListProps = {
    items: string[];
    icon: IconType;
    handleSelect: Dispatch<SetStateAction<string>>;
};

const List: FC<ListProps> = ({ items, icon, handleSelect }) => {
    const [itemList, setItemList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        setItemList(items.filter((id) => id.match(searchTerm)));
        setActiveIndex(null);
    }, [items, searchTerm]);

    return (
        <VStack maxH="full" w="full" alignItems="stretch">
            <Search onChange={(e) => setSearchTerm(e.target.value)} />
            <VStack overflowY="auto">
                {itemList.map((item, i) => (
                    <ListItem
                        key={i}
                        item={item}
                        icon={icon}
                        active={i === activeIndex ? true : false}
                        setActiveIndex={() => setActiveIndex(i)}
                        setSelection={handleSelect}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
export default List;
