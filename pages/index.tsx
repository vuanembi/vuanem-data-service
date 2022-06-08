import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HStack } from '@chakra-ui/react';

import List from '../components/List';

type Table = {
    id: string;
};

type Dataset = {
    id: string;
    tables: Table[];
};

const Home: NextPage = () => {
    const [datasets, setDatasets] = useState([]);
    const [selectedDataset, selectDataset] = useState('');

    const [tables, setTables] = useState([]);
    const [selectedTable, selectTable] = useState('');

    useEffect(() => {
        axios.get('/api/datasets').then(({ data }) => setDatasets(data));
    }, []);

    useEffect(() => {
        axios
            .get('/api/dataset', { params: { id: selectedDataset } })
            .then(({ data }) => setTables(data));
    }, [selectedDataset]);

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List items={datasets} handleSelect={selectDataset} />
            <List items={tables} handleSelect={selectTable} />
            <List items={datasets} handleSelect={selectDataset} />
        </HStack>
    );
};

export default Home;
