import axios from 'axios';

import { createExportJob } from '.';

it('create export job', async () => {
    return createExportJob('IP_NetSuite', 'CLASSES')
        .then((url) => {
            console.log(url);
            return axios.get(url);
        })
        .then((res) => expect(res.status).toBe(200));
});
