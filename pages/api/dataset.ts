import type { NextApiRequest, NextApiResponse } from 'next';

import mock from './mock.json';

export type Table = {
    id: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Table[]>) => {
    const tables = mock.dataset.find(({ id }) => id === req.query.id)?.tables;

    tables ? res.json(tables) : res.status(404).end();
};

export default handler;
