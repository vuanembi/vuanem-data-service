import { Timestamp } from '@google-cloud/firestore';

export type Entity = {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    isDeleted: boolean;
};
