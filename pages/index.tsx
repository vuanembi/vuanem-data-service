import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

import { HStack } from '@chakra-ui/react';

import List from '../components/List';

import fetcher from '../lib/api';

type Dataset = {
    id: string;
    tables: {
        id: string;
    }[];
};

const Home: NextPage = () => {
    const { data, error } = useSWR<Dataset[]>({ url: '/api/dataset' }, fetcher);
    const [dataset, setDataset] = useState(data && data[0]);

    if (error || !data) return <h1>Hehe</h1>;

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List items={data} />
            <List items={data} />
            <List items={data} />
        </HStack>
    );
};

export default Home;
