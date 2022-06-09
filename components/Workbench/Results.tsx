import { FC, useEffect, useState } from 'react';

import {
    VStack,
    HStack,
    Fade,
    Button,
    Divider,
    Link,
    Heading,
    Text,
} from '@chakra-ui/react';

import { FaCloudDownloadAlt } from 'react-icons/fa';

import dayjs from 'dayjs';

export type ResultProps = {
    title: string;
    timestamp: dayjs.Dayjs;
    url: string;
};

const Result: FC<ResultProps> = ({ title, timestamp, url }) => {
    const [currentTimestamp, setCurrentTimestamp] = useState(dayjs());
    const [diff, setDiff] = useState(0);

    useEffect(() => {
        setInterval(() => setCurrentTimestamp(dayjs()), 1000);
    });

    useEffect(() => {
        setDiff(timestamp.add(1, 'hours').diff(dayjs(), 'seconds'));
    }, [timestamp, currentTimestamp]);

    return (
        <Fade in={!!url}>
            <VStack justifyContent="flex-end" alignItems="stretch">
                <Heading as="h3" size="sm">
                    {title}
                </Heading>
                <HStack justifyContent="space-between">
                    <Text>{timestamp.format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <Link isExternal href={url} variant="button">
                        <Button
                            size="sm"
                            rightIcon={<FaCloudDownloadAlt fill="white" />}
                            colorScheme="blue"
                        >
                            {diff}
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Fade>
    );
};

const Results: FC<{ results: ResultProps[] }> = ({ results }) => (
    <VStack
        p={4}
        spacing={4}
        alignItems="stretch"
        borderWidth={1}
        divider={<Divider />}
        overflowY="auto"
    >
        {results.map(
            (result, i) => (
                <Result key={i} {...result} />
            )
        )}
    </VStack>
);
export default Results;
