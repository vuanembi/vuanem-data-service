import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HStack } from '@chakra-ui/react';
import { FaDatabase, FaTable, FaChartBar } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

import type { Dataset, Table } from '../common/bigquery';

import List from '../components/List';
import Workbench from '../components/Workbench';

const Home: NextPage = () => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [selectedDataset, selectDataset] = useState('');

    const [tables, setTables] = useState<Table[]>([]);
    const [selectedTable, selectTable] = useState('');

    useEffect(() => {
        axios
            .get<Dataset[]>('/api/dataset')
            .then(({ data }) => setDatasets(data));
    }, []);

    useEffect(() => {
        axios
            .get<Table[]>(`/api/dataset/${selectedDataset}`)
            .then(({ data }) => setTables(data));
    }, [selectedDataset]);

    const tableIconFn = ({ type }: Table) =>
        type === 'TABLE'
            ? FaTable
            : type === 'VIEW'
            ? FaChartBar
            : SiGooglesheets;

    return (
        <HStack
            height="full"
            alignContent="space-between"
            alignItems="flex-start"
            spacing={10}
        >
            <List<Dataset>
                items={datasets}
                iconFn={() => FaDatabase}
                handleSelect={selectDataset}
            />
            <List<Table>
                items={tables}
                // @ts-expect-error
                iconFn={tableIconFn}
                handleSelect={selectTable}
            />
            {/* <List items={tables} icon={FaTable} handleSelect={selectTable} /> */}
            <Workbench table={selectedTable} />
        </HStack>
    );
};

export default Home;
