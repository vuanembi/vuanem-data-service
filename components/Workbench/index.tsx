import { FC, useEffect, useState } from 'react';

import { VStack, useToast } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { format } from 'date-fns';

import apiClient from '../../lib/api';
import Submit from './Submit';
import Result from './Results';
import type { ResultProps } from './Results';

type WorkbenchProps = {
    dataset: string;
    table: string;
};

const Workbench: FC<WorkbenchProps> = ({ dataset, table }) => {
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultProps[]>([]);

    const title = () => `${dataset}.${table}`.slice(0, 30);

    const toast = useToast();

    useEffect(() => {
        dataset && table && setDisabled(false);
    }, [dataset, table]);

    const handleRequest = () => {
        setLoading(true);
        apiClient()
            .post<{ url: string }>('/export', { dataset, table })
            .then(({ data }) =>
                setResults([
                    ...results,
                    {
                        title: title(),
                        timestamp: dayjs(),
                        url: data.url,
                    },
                ])
            )
            .then(() =>
                toast({
                    title: 'Link Generated',
                    description: 'Link will be valid for 1 hour',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
            )
            .finally(() => setLoading(false));
    };

    return (
        <VStack maxH="full" flex="0 0 33%" alignItems="stretch">
            <Submit
                title={dataset && table ? title() : '...'}
                disabled={disabled}
                loading={loading}
                onClick={handleRequest}
            />
            <Result results={results} />
        </VStack>
    );
};
export default Workbench;
