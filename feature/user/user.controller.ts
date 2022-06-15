import { NextApiRequest, NextApiResponse } from 'next';

import { isString } from 'lodash';

import UserService from './user.service';

const validateId = async (req: NextApiRequest) => {
    const { id } = req.query;
    return isString(id) ? id : Promise.reject('invalid input');
};

class UserController {
    protected userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    create(req: NextApiRequest, res: NextApiResponse) {
        this.userService.create(req.body).then((id) => res.json({ id }));
    }

    findOne(req: NextApiRequest, res: NextApiResponse) {
        this.userService.find().then((users) => res.json({ users }));
    }

    find(req: NextApiRequest, res: NextApiResponse) {
        validateId(req).then((id) =>
            this.userService.findOne(id).then((user) => res.json({ user }))
        );
    }

    update(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query;
        isString(id)
            ? this.userService.findOne(id).then((user) => res.json({ user }))
            : res.status(400).end();
    }
}
