import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HStack } from '@chakra-ui/react';
import { FaDatabase, FaTable } from 'react-icons/fa';

import List from '../components/List';
import Workbench from '../components/Workbench';

type Table = {
    id: string;
};

type DatasetId = string;

const Home: NextPage = () => {
    const [datasets, setDatasets] = useState<DatasetId[]>([]);
    const [selectedDataset, selectDataset] = useState('');

    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTable, selectTable] = useState('');

    useEffect(() => {
        axios
            .get<DatasetId[]>('/api/dataset')
            .then(({ data }) => setDatasets(data));
    }, []);

    useEffect(() => {
        axios
            .get<Table[]>(`/api/dataset/${selectedDataset}`)
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
            {/* <List items={tables} icon={FaTable} handleSelect={selectTable} /> */}
            <Workbench table={selectedTable} />
        </HStack>
    );
};

export default Home;
