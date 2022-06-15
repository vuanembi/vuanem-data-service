import {
    Firestore,
    CollectionReference,
    FieldValue,
    DocumentReference,
    DocumentSnapshot,
    UpdateData,
} from '@google-cloud/firestore';

import { Entity } from './entity.interface';

const client = new Firestore();

export type { Entity };

type ValidateDocResponse<T> = {
    docRef: DocumentReference<T>;
    doc: DocumentSnapshot<T>;
};

export class Repository<T extends Entity> {
    protected collection: CollectionReference;

    constructor(collection: string) {
        this.collection = client.collection(collection);
    }

    protected async validateId(id: string) {
        const docRef = this.collection.doc(id);
        return docRef
            .get()
            .then((doc) =>
                doc.exists
                    ? <ValidateDocResponse<T>>{ docRef, doc }
                    : Promise.reject(`id ${id} not found`)
            );
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

    async find(): Promise<T[]> {
        let results: T[] = [];

        return this.collection
            .get()
            .then((docs) =>
                docs.forEach((doc) => (results = [...results, <T>doc.data()]))
            )
            .then(() => results);
    }

    async findOne(id: string): Promise<T> {
        return this.validateId(id).then(({ doc }) => <T>doc.data());
    }

    protected async _update(id: string, data: Partial<T>) {
        return this.validateId(id)
            .then(({ docRef }) =>
                docRef.update({
                    ...data,
                    updatedAt: FieldValue.serverTimestamp(),
                } as UpdateData<T>)
            )
            .then(({ writeTime }) => ({ id, writeTime }));
    }

    async update(id: string, data: Partial<T>) {
        return this._update(id, data);
    }

    async delete(id: string) {
        return this._update(id, <Partial<T>>{ isDeleted: true });
    }
}
