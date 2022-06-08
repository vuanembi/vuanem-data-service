import { FC, Dispatch, SetStateAction } from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { FiDatabase, FiChevronRight } from 'react-icons/fi';

export type ListItemType = {
    id: string;
};

export type ListItemProps = {
    item: ListItemType;
    active: boolean;
    setActiveIndex: () => void;
    setSelection: Dispatch<SetStateAction<string>>;
};

const ListItem: FC<ListItemProps> = ({
    item,
    active,
    setActiveIndex,
    setSelection,
}) => {
    const onClick = () => {
        setSelection(item.id);
        setActiveIndex();
    };

    const bgColor = active ? 'blue.600' : 'transparent';
    const textColor = active ? 'white' : 'black';

    return (
        <HStack
            w="full"
            p={4}
            borderWidth={1}
            bgColor={bgColor}
            alignContent="stretch"
            onClick={onClick}
        >
            <Icon as={FiDatabase} stroke={textColor} />
            <Text userSelect="none" flex="1" color={textColor}>
                {item.id}
            </Text>
            <Icon as={FiChevronRight} stroke={textColor} />
        </HStack>
    );
};

export default ListItem;
