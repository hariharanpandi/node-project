import UserService from "../services/signinservice";
import { Request, Response } from 'express';
import Validation from "../validators/validators";

const userService = new UserService();
const validation = new Validation();

export default class SigninController {

    /*Below function is used for register functionlity*/
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const { error, values } = validation.register.validate(userData);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const user = await userService.registerUser(userData);
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                status: user.status,
            });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    /*Below function is used for login functionlity*/
    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const userData = {
                email,
                password,
            };
            await userService.loginUser(userData).then((data) => {
                res.status(200).json(data);
            })
        } catch (error: any) {
            res.status(401).send(error.message);
        }
    }
}