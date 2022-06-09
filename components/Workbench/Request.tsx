import { FC, useState } from 'react';

import {
    VStack,
    HStack,
    Flex,
    Divider,
    Heading,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Icon,
} from '@chakra-ui/react';
import {
    DayPicker,
    DateRange,
    SelectRangeEventHandler,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { formatISO } from 'date-fns';

import { FaRegCalendarAlt, FaCloudUploadAlt } from 'react-icons/fa';

type RequestProps = {
    table: string;
};

type DatePickerProps = {
    range?: DateRange;
    setRange: SelectRangeEventHandler;
};

const PopoverDatePicker: FC<DatePickerProps> = ({ range, setRange }) => {
    const { from, to } = range || { from: new Date(), to: new Date() };

    return (
        <Popover>
            <PopoverTrigger>
                <Button w="full" leftIcon={<Icon as={FaRegCalendarAlt} />}>
                    {[from, to]
                        .map(
                            (value) =>
                                value &&
                                formatISO(value, { representation: 'date' })
                        )
                        .join(' - ')}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                    <DayPicker
                        mode="range"
                        fromYear={2018}
                        toYear={2023}
                        captionLayout="dropdown"
                        selected={range}
                        onSelect={setRange}
                        modifiersStyles={{
                            selected: {
                                backgroundColor: '#3182CE',
                            },
                        }}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const Request: FC<RequestProps> = ({ table }) => {
    const [range, setRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
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
            <Heading pb={2} size="md">{table || 'Table'}</Heading>
            <Divider />
            <HStack justifyContent="stretch">
                <PopoverDatePicker
                    range={range}
                    setRange={setRange}
                />
            </HStack>
            <Flex w="full" pt={2} justifyContent="flex-end">
                <Button rightIcon={<FaCloudUploadAlt fill="white" />} colorScheme="blue">
                    Request
                </Button>
            </Flex>
        </VStack>
    );
};
export default Request;
