import { NextApiRequest } from 'next';

import UserService from './user.service';

class UserController {
    protected userService: UserService;

    constructor(req: NextApiRequest) {
        this.userService = new UserService();
    }
}
