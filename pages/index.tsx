import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { HStack } from '@chakra-ui/react';
import { FaDatabase, FaTable, FaChartBar } from 'react-icons/fa';
import { SiGooglesheets } from 'react-icons/si';

import type { Dataset, Table } from '../common/bigquery';
import apiClient from '../lib/api';
import List from '../components/List';
import Workbench from '../components/Workbench';

const Home: NextPage = () => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [datasetsLoaded, setDatasetsLoaded] = useState(false);
    const [selectedDataset, selectDataset] = useState<string>('');

    const [tables, setTables] = useState<Table[]>([]);
    const [tablesLoaded, setTablesLoaded] = useState(true);
    const [selectedTable, selectTable] = useState<string>('');

    useEffect(() => {
        apiClient()
            .get<Dataset[]>('/dataset')
            .then(({ data }) => {
                setDatasets(data);
                setDatasetsLoaded(true);
            });
    }, []);

    useEffect(() => {
        setTablesLoaded(false);
        selectedDataset &&
            apiClient()
                .get<Table[]>(`/dataset/${selectedDataset}`)
                .then(({ data }) => {
                    setTables(data);
                    setTablesLoaded(true);
                })
                .finally(() => setTablesLoaded(true));
        !selectedDataset && setTablesLoaded(true);
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
                iconFn={() => FaDatabase}
                loading={datasetsLoaded}
                handleSelect={selectDataset}
            />
            <List
                items={tables}
                // @ts-expect-error
                iconFn={({ type }: Table) =>
                    type === 'TABLE'
                        ? FaTable
                        : type === 'VIEW'
                        ? FaChartBar
                        : SiGooglesheets
                }
                loading={tablesLoaded}
                handleSelect={selectTable}
            />
            <Workbench table={selectedTable} />
        </HStack>
    );
};

export default Home;
