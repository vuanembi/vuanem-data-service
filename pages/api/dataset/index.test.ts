import { listDataset } from '.';

it('return all datasets', async () => {
    return listDataset().then((datasets) => expect(datasets).toBeTruthy());
});
