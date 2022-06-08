import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
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
    const [dataset, setDataset] = useState('');
    
    const { data: datasets, error } = useSWR<Dataset[]>(
        { url: '/api/dataset' },
        fetcher
    );

    useEffect(() => console.log(dataset), [dataset]);

    if (error || !datasets) return <h1>Hehe</h1>;

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List items={datasets} handleSelect={setDataset} />
            <List items={datasets} handleSelect={setDataset} />
            <List items={datasets} handleSelect={setDataset} />
        </HStack>
    );
};

export default Home;
