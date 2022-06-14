import {
    Firestore,
    CollectionReference,
    FieldValue,
} from '@google-cloud/firestore';

import { Entity } from './entity.interface';

const client = new Firestore();

export type { Entity };

export class Repository<T extends Entity> {
    collection: CollectionReference;

    constructor(collection: string) {
        this.collection = client.collection(collection);
    }

    async create(data: T): Promise<string> {
        return this.collection
            .add({
                ...data,
                createdAt: FieldValue.serverTimestamp(),
                updatedAt: FieldValue.serverTimestamp(),
                isDeleted: false,
            })
            .then((res) => res.id);
    }

    async get(id: string): Promise<T> {
        return this.collection
            .doc(id)
            .get()
            .then((doc) => <T>doc.data());
    }

    async update(id: string, data: Partial<T>) {
        return this.collection
            .doc(id)
            .update({ ...data, updatedAt: FieldValue.serverTimestamp() })
            .then(({ writeTime }) => ({ id, writeTime }));
    }

    async delete(id: string) {
        return this.update(id, { isDeleted: true });
    }
}
