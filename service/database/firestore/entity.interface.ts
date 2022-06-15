import { Timestamp } from '@google-cloud/firestore';

export type Entity = {
    id: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    isDeleted: boolean;
};
