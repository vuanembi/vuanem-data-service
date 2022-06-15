import type { Entity } from '../../service/database/firestore/entity.interface';

type User = Entity & {
    email: string;
    name: string;
};

export default User
