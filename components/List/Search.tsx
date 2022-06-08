import { FC, ChangeEvent } from 'react';

import {
    Flex,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export type SearchProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: FC<SearchProps> = ({ onChange }) => (
    <Flex w="full" p={4} borderWidth={1}>
        <InputGroup>
            <InputLeftElement>
                <Icon as={FaSearch} />
            </InputLeftElement>
            <Input placeholder="Search" onChange={onChange} />
        </InputGroup>
    </Flex>
);

export default Search;
