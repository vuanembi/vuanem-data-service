import type { NextApiRequest, NextApiResponse } from 'next';

import { flatten } from 'lodash-es';

import mock from './mock.json';

export type Table = {
    id: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Table>) => {
    const table = flatten(mock.dataset.map(({ tables }) => tables)).find(
        ({ id }) => id === req.query.id
    );

    table ? res.json(table) : res.status(404).end();
};

export default handler;
