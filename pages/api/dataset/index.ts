import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery } from '@google-cloud/bigquery';

export const listDataset = async () => {
    const client = new BigQuery();

    return client
        .getDatasets()
        .then(([datasets]) => datasets)
        .then((datasets) => datasets.map(({ id }) => id));
};

const handler = (req: NextApiRequest, res: NextApiResponse<string[]>) => {
    listDataset().then((datasetIds) =>
        datasetIds.every((i): i is string => !!i)
            ? res.json(datasetIds)
            : res.json([])
    );
};

export default handler;
