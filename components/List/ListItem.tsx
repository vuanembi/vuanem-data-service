import { Dispatch, SetStateAction } from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

import type { Dataset, Table } from '../../common/bigquery';

export type ListItemProps<T extends Dataset | Table> = {
    item: T;
    iconFn: <T>(item: T) => IconType;
    active: boolean;
    setActiveIndex: () => void;
    setSelection: Dispatch<SetStateAction<string>>;
};

const ListItem = <T extends Dataset | Table>({
    item,
    iconFn,
    active,
    setActiveIndex,
    setSelection,
}: ListItemProps<T>) => {
    const onClick = () => {
        setSelection(item.id);
        setActiveIndex();
    };

    const bgColor = active ? 'blue.500' : 'transparent';
    const textColor = active ? 'white' : 'black';

    return (
        <HStack
            w="full"
            p={4}
            px={7}
            borderWidth={1}
            bgColor={bgColor}
            alignContent="stretch"
            onClick={onClick}
        >
            <Icon as={iconFn(item)} fill={textColor} />
            <Text pl={4} userSelect="none" flex="1" color={textColor}>
                {item.id.slice(0, 15)}
            </Text>
            <Icon as={FaChevronRight} fill={textColor} />
        </HStack>
    );
};

export default ListItem;
