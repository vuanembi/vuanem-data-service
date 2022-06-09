import { FC, useEffect, useState } from 'react';

import { VStack } from '@chakra-ui/react';

import apiClient from '../../lib/api';
import Request from './Request';
import Result from './Result';

type WorkbenchProps = {
    dataset: string;
    table: string;
};

const Workbench: FC<WorkbenchProps> = ({ dataset, table }) => {
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        console.log({ dataset, table });
        dataset && table && setDisabled(false);
    }, [dataset, table]);

    const handleRequest = () => {
        setLoading(true);
        apiClient()
            .post<{ url: string }>('/export', { dataset, table })
            .then(({ data }) => setUrl(data.url))
            .finally(() => setLoading(false));
    };

    return (
        <VStack w="full" flex="0 0 33%" alignItems="stretch">
            <Request
                title={dataset && table ? `${dataset}.${table}` : '...'}
                disabled={disabled}
                loading={loading}
                onClick={handleRequest}
            />
            <Result url={url} />
        </VStack>
    );
};
export default Workbench;
