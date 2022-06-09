import { createExportJob } from '.';

it('create export job', async () => {
    return createExportJob('IP_NetSuite', 'CLASSES')
        .then((url) => {
            expect(url).toBeTruthy();
        })
        .catch((err) => {
            console.log(err);
        });
});
