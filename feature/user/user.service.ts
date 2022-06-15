import { Repository } from '../../service/database/firestore';
import User from './user.entity';

class UserService {
    protected userRepository: Repository<User>;

    constructor() {
        this.userRepository = new Repository<User>('User');
    }

    create(data: User) {
        return this.userRepository.create(data);
    }

    find() {
        return this.userRepository.find();
    }

    findOne(id: string) {
        return this.userRepository.findOne(id);
    }

    update(id: string, data: User) {
        return this.userRepository.update(id, data);
    }

    delete(id: string) {
        return this.userRepository.delete(id);
    }
}

export default UserService;
