import { Request, Response } from 'express';
import UserService from '../services/usersservice';
import Validation from '../validators/validators';

const _ = require('lodash');

const userService = new UserService();
const validation = new Validation();

export default class UserController {

    // // GET method to list all data from DB
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
           const userList = await userService.getAllUsers();
            res.send({ userList });
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }

    // POST method to create new data
    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = JSON.parse(JSON.stringify(req.body));
            // Validate the request objects using Joi
            const { error, values } = validation.createUser.validate(data);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const projectRes = await userService.createUser(data);
            // Response send to the client with only required keys in the object using lodash _.pick method
            res.send(_.pick(projectRes, ['name', 'email', 'status']));
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
}
