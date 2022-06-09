import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery, Table } from '@google-cloud/bigquery';
import { Storage } from '@google-cloud/storage';
import { faker } from '@faker-js/faker';

import type { Dataset, Table as TableType } from '../../../common/bigquery';
import bigquery from '@google-cloud/bigquery/build/src/types';

const tempBucket = 'vuanem-export';
const tempDatasetId = 'temp_Export';

const generateId = () => {
    const char = faker.lorem
        .slug()
        .split('-')
        .map((i) => i.slice(0, 1).toUpperCase() + i.slice(1))
        .join('');
    const num = faker.datatype.number({ min: 1000, max: 9999 });

    return `${char}${num}`;
};

const pollJob = (job: bigquery.IJob): bigquery.IJob =>
    job.status === 'done' ? job : pollJob(job);

export const createExportJob = async (
    dataset: Dataset['id'],
    table: TableType['id']
) => {
    const bigquery = new BigQuery();
    const storage = new Storage();

    const id = generateId();

    const tempDataset = bigquery.dataset(tempDatasetId);

    const filename = `${id}.csv`;
    const file = storage.bucket(tempBucket).file(filename);

    return tempDataset
        .createTable(id, { location: 'us' })
        .then(() => tempDataset.table(id))
        .then(async (destinationTable) => {
            await bigquery.query({
                query: `SELECT * FROM ${dataset}.${table}`,
                destinationTable,
            });
            return destinationTable;
        })
        .then((table) => table.extract(file, { location: 'us' }))
        .then(([job]) => pollJob(job))
        .catch((err) => err)
        .then(() =>
            file.getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + 15 * 60 * 1000,
            })
        )
        .then(([url]) => url);
};

// const handler = (req: NextApiRequest, res: NextApiResponse<Dataset[]>) => {
//     listDatasets()
//         .then((datasets) => res.json(datasets))
//         .catch(() => res.json([]));
// };

// export default handler;
