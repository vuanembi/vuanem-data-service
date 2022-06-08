import { FC, useState } from 'react';

import { VStack, Flex, Divider, Heading, Text, Button } from '@chakra-ui/react';
import { DateRangePicker } from 'react-date-range';

import { MdSend } from 'react-icons/md';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

type RequestProps = {
    table: string;
};

const Request: FC<RequestProps> = ({ table }) => {
    const [selectedDates, setSelectedDates] = useState({
        startDate: new Date('2022-01-01'),
        endDate: new Date(),
        key: 'selection',
    });

    return (
        <VStack
            h="50%"
            w="full"
            flex="1"
            alignItems="stretch"
            borderWidth={1}
            p={4}
        >
            <Heading pb={2}>{table || 'Table'}</Heading>
            <Divider />
            <Text pt={2}>Date Range</Text>
            <DateRangePicker
                ranges={[selectedDates]}
                onChange={(e) => setSelectedDates(e)}
            />
            <Flex w="full" pt={2} justifyContent="flex-end">
                <Button rightIcon={<MdSend fill="white" />} colorScheme="blue">
                    Request
                </Button>
            </Flex>
        </VStack>
    );
};
export default Request;
