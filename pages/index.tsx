import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

import { HStack, Icon, Text } from '@chakra-ui/react';

import List from '../components/List/List';

import fetcher from '../lib/fetcher';

type Dataset = {
    id: string;
    tables: {
        id: string;
    }[];
};

const Home: NextPage = () => {
    const { data, error } = useSWR<Dataset[]>({ url: '/api/dataset' }, fetcher);
    const [dataset, setDataset] = useState(data && data[0]);
    
    if (error) return <h1>Hehe</h1>;
    

    return (
        <HStack w="full" alignContent="space-between" spacing={10}>
            <List items={data} />
            <List items={data} />
            <List items={data} />
        </HStack>
    );
};

export default Home;
