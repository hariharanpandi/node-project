import UserService from "../services/userservice";
import { Request, Response } from 'express';
import Validation from "../validators/validators";

const userService = new UserService();
const validation = new Validation();

export default class SigninController {

    /*Below function is used for register functionlity*/
    async userRegister(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            const { error, values } = validation.userRegister.validate(userData);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const user = await userService.registerUser(userData);
            res.status(200).json({
                _id: user._id,
                name: user.first_name+" "+user.last_name,
                email: user.email,
                last_active:user.last_active,
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

    async tenantRegister(req: Request, res: Response): Promise<void> {
        try {
            const tenantData = req.body;
            const { error, values } = validation.tenantRegister.validate(tenantData);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const teantUser = await userService.tenantRegister(tenantData);
            res.status(200).send(teantUser);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
    async tenantDelete(req: Request, res: Response): Promise<void> {
        try {
            const query = JSON.parse(JSON.stringify(req.query));
            await userService.tenantDelete(query);
            res.status(200).send("project deleted");
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
}