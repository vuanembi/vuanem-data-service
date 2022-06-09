import { setTimeout } from 'timers/promises';
import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery, Job } from '@google-cloud/bigquery';
import { Storage, File } from '@google-cloud/storage';
import { faker } from '@faker-js/faker';

import type {
    Dataset as DatasetType,
    Table as TableType,
} from '../../../common/bigquery';

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

const createFile = async (id: string): Promise<[File, string]> => {
    const storage = new Storage();

    const file = storage.bucket(tempBucket).file(`${id}.csv`);
    return file
        .getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000,
        })
        .then(([url]) => [file, url]);
};

const pollJob = (job: Job): Promise<Job> =>
    job.metadata.status.state === 'RUNNING'
        ? setTimeout(1000)
              .then(() => job.get())
              .then(([job]) => pollJob(job))
        : Promise.resolve(job);

const createDestinationTable = async (
    id: string,
    dataset: string,
    table: string
) => {
    const bigquery = new BigQuery();

    const tempDataset = bigquery.dataset(tempDatasetId);

    const destination = await tempDataset
        .createTable(id, { location: 'us' })
        .then(() => tempDataset.table(id));

    await bigquery
        .createQueryJob({
            query: `SELECT * FROM ${dataset}.${table}`,
            location: 'us',
            destination,
        })
        .then(([job]) => pollJob(job));

    return destination;
};

export const createExportJob = async (
    dataset: DatasetType['id'],
    table: TableType['id']
) => {
    const id = generateId();

    return Promise.all([
        createFile(id),
        createDestinationTable(id, dataset, table),
    ]).then(async ([fileData, destination]) => {
        const [file, url] = fileData;
        return destination.extract(file, { location: 'us' }).then(() => url);
    });
};
// const handler = (req: NextApiRequest, res: NextApiResponse<Dataset[]>) => {
//     listDatasets()
//         .then((datasets) => res.json(datasets))
//         .catch(() => res.json([]));
// };

// export default handler;
