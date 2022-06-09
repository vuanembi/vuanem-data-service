import { FC, useState } from 'react';

import { VStack } from '@chakra-ui/react';

import Request from './Request';
import Job from './Job';

type WorkbenchProps = {
    table: string;
};

const Workbench: FC<WorkbenchProps> = ({ table }) => {
    const [job, setJob] = useState('')

    return (
        <VStack w="full" flex="0 0 33%">
            <Request table={table} setJob={setJob}/>
            <Job job={job}/>
        </VStack>
    );
};
export default Workbench;
