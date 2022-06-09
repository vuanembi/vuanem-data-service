import { Dispatch, FC, SetStateAction, useState } from 'react';

import {
    VStack,
    HStack,
    Flex,
    Divider,
    Heading,
    Button,
} from '@chakra-ui/react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

import { FaCloudUploadAlt } from 'react-icons/fa';

import PopoverDatePicker, { defaultDateRange } from './DatePicker';

type RequestProps = {
    table: string;
    setJob: Dispatch<SetStateAction<string>>;
};

const Request: FC<RequestProps> = ({ table, setJob }) => {
    const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);

    const [loading, setLoading] = useState(false);

    const handleRequest = () => {
        setLoading(true);
        setTimeout(() => {
            setJob(format(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS'));
            setLoading(false);
        }, 1000);
    };

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
            <Heading size="md">{table || 'Table'}</Heading>
            <Divider />
            <HStack justifyContent="stretch">
                <PopoverDatePicker range={range} setRange={setRange} />
            </HStack>
            <Flex w="full" justifyContent="flex-end">
                <Button
                    rightIcon={<FaCloudUploadAlt fill="white" />}
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={handleRequest}
                >
                    Request
                </Button>
            </Flex>
        </VStack>
    );
};
export default Request;
