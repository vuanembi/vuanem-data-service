import { FC, Dispatch, SetStateAction, useRef } from 'react';

import {
    HStack,
    Icon,
    Text,
    useOutsideClick,
    useBoolean,
} from '@chakra-ui/react';
import { FiDatabase, FiChevronRight } from 'react-icons/fi';

export type ListItemType = {
    id: string;
};

export type ListItemProps = {
    item: ListItemType;
    setSelection: Dispatch<SetStateAction<string>>;
};

const ListItem: FC<ListItemProps> = ({ item, setSelection }) => {
    const ref = useRef(null);

    const [selected, setSelected] = useBoolean();

    useOutsideClick({
        ref,
        handler: () => setSelected.off(),
    });

    const onClick = () => {
        setSelection(item.id);
        setSelected.on();
    };

    const bgColor = selected ? 'blue.600' : 'transparent';
    const textColor = selected ? 'white' : 'black';

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
            <Text flex="1" color={textColor}>
                {item.id}
            </Text>
            <Icon as={FiChevronRight} stroke={textColor} />
        </HStack>
    );
};

export default ListItem;
