import type { NextApiRequest, NextApiResponse } from 'next';

import { Table } from './dataset';
import mock from './mock.json';

type Dataset = {
    id: string;
    tables: Table[];
};

const handler = (req: NextApiRequest, res: NextApiResponse<Dataset[]>) => {
    res.json(mock.dataset);
};

export default handler
