import { FC, MouseEventHandler, useState } from 'react';

import {
    VStack,
    HStack,
    Flex,
    Divider,
    Heading,
    Button,
} from '@chakra-ui/react';
import { DateRange } from 'react-day-picker';

import { FaCloudUploadAlt } from 'react-icons/fa';

import PopoverDatePicker, { defaultDateRange } from './DatePicker';

type SubmitProps = {
    title: string;
    disabled: boolean;
    loading: boolean;
    onClick: MouseEventHandler;
};

const Submit: FC<SubmitProps> = ({ title, disabled, loading, onClick }) => {
    const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);

    return (
        <VStack
            h="50%"
            w="full"
            flex="1"
            alignItems="stretch"
            borderWidth={1}
            p={4}
            spacing={4}
        >
            <Heading size="md">{title || '...'}</Heading>
            <Divider />
            <HStack justifyContent="stretch">
                <PopoverDatePicker range={range} setRange={setRange} />
            </HStack>
            <Flex w="full" justifyContent="flex-end">
                <Button
                    isDisabled={disabled}
                    rightIcon={<FaCloudUploadAlt fill="white" />}
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={onClick}
                >
                    Request
                </Button>
            </Flex>
        </VStack>
    );
};
export default Submit;
