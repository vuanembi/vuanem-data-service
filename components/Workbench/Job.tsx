import { FC } from 'react';

import { VStack, Heading } from '@chakra-ui/react';

type JobProps = {
    table: string;
};

const Job: FC = () => {
    return (
        <VStack
            maxH="full"
            w="full"
            alignItems="stretch"
            borderWidth={1}
            p={4}
        ></VStack>
    );
};
export default Job;
