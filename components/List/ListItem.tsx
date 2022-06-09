import { FC, Dispatch, SetStateAction } from 'react';

import { HStack, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaChevronRight } from 'react-icons/fa';

export type ListItemType = {
    id: string;
};

export type ListItemProps = {
    item: ListItemType;
    icon: IconType;
    active: boolean;
    setActiveIndex: () => void;
    setSelection: Dispatch<SetStateAction<string>>;
};

const ListItem: FC<ListItemProps> = ({
    item,
    icon,
    active,
    setActiveIndex,
    setSelection,
}) => {
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
            <Icon as={icon} fill={textColor} />
            <Text pl={4} userSelect="none" flex="1" color={textColor}>
                {item.id}
            </Text>
            <Icon as={FaChevronRight} fill={textColor} />
        </HStack>
    );
};

export default ListItem;
