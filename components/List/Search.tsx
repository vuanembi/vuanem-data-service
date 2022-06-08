import { FC, ChangeEvent } from 'react';

import {
    Flex,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export type SearchProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: FC<SearchProps> = ({ onChange }) => (
    <Flex w="full" p={4} borderWidth={1}>
        <InputGroup>
            <InputLeftElement>
                <Icon as={FiSearch} />
            </InputLeftElement>
            <Input placeholder="Search" onChange={onChange} />
        </InputGroup>
    </Flex>
);

export default Search;
