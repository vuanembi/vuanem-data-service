import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HStack } from '@chakra-ui/react';
import { FaDatabase, FaTable } from 'react-icons/fa';

import List from '../components/List';

type Table = {
    id: string;
};

type Dataset = {
    id: string;
    tables: Table[];
};

const Home: NextPage = () => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [selectedDataset, selectDataset] = useState('');

    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTable, selectTable] = useState('');

    useEffect(() => {
        axios
            .get<Dataset[]>('/api/datasets')
            .then(({ data }) => setDatasets(data));
    }, []);

    useEffect(() => {
        axios
            .get<Table[]>('/api/dataset', { params: { id: selectedDataset } })
            .then(({ data }) => setTables(data));
    }, [selectedDataset]);

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List
                items={datasets}
                icon={FaDatabase}
                handleSelect={selectDataset}
            />
            <List items={tables} icon={FaTable} handleSelect={selectTable} />
            <List
                items={datasets}
                icon={FaDatabase}
                handleSelect={selectDataset}
            />
        </HStack>
    );
};

export default Home;
