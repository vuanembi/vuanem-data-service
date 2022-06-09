import { FC } from 'react';

import { Flex, VStack, Heading, Divider, Button } from '@chakra-ui/react';

import { FaCloudDownloadAlt } from 'react-icons/fa';

type JobProps = {
    job: string;
};

const Job: FC<JobProps> = ({ job }) => {
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
            <Heading size="md">{job || 'Job'}</Heading>
            <Divider />
            <Flex w="full" justifyContent="flex-end">
                <Button
                    rightIcon={<FaCloudDownloadAlt fill="white" />}
                    colorScheme="blue"
                    // isLoading={loading}
                    // onClick={handleRequest}
                >
                    Request
                </Button>
            </Flex>
        </VStack>
    );
};
export default Job;
