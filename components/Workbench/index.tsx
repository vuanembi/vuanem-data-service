import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import Request from './Request';
import Job from './Job';

type WorkbenchProps = {
    table: string;
};

const Workbench: FC<WorkbenchProps> = ({ table }) => {
    return (
        <VStack w="full">
            <Request table={table} />
            <Job />
        </VStack>
    );
};
export default Workbench;
