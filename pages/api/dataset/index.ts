import type { NextApiRequest, NextApiResponse } from 'next';

import { BigQuery } from '@google-cloud/bigquery';

import type { Dataset } from '../../../common/bigquery';

export const listDatasets = async (): Promise<Dataset[]> => {
    const client = new BigQuery();

    return client
        .getDatasets()
        .then(([datasets]) => datasets)
        .then((datasets) => datasets.map(({ id }) => <Dataset>{ id }));
};

const handler = (req: NextApiRequest, res: NextApiResponse<Dataset[]>) => {
    listDatasets()
        .then((datasets) => res.json(datasets))
        .catch(() => res.json([]));
};

export default handler;
