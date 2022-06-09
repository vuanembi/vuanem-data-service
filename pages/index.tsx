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
    const [dataset, setDataset] = useState<string>('');

    const [tables, setTables] = useState<Table[]>([]);
    const [tablesLoaded, setTablesLoaded] = useState(true);
    const [table, setTable] = useState<string>('');

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
        setTable('');
        dataset &&
            apiClient()
                .get<Table[]>(`/dataset/${dataset}`)
                .then(({ data }) => {
                    setTables(data);
                    setTablesLoaded(true);
                })
                .finally(() => setTablesLoaded(true));
        !dataset && setTablesLoaded(true);
    }, [dataset]);

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
                handleSelect={setDataset}
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
                handleSelect={setTable}
            />
            <Workbench dataset={dataset} table={table} />
        </HStack>
    );
};

export default Home;
