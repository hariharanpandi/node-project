import UserService from "../services/userservice";
import { Request, Response } from 'express';
import Validation from "../validators/validators";
import AppConstants from "../utils/constant";

const userService = new UserService();
const validation = new Validation();
const appConstant = new AppConstants();

export default class SigninController {

    /**
     * The function below is used for the User register functionality
     */
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
                name: user.first_name + " " + user.last_name,
                email: user.email,
                last_active: user.last_active,
                status: user.status,
            });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
    /**
     * The below function is used for login functionality
     */
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
    /**
     * The function below is used for the Tenant and Tenant_User register functionality
     */
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
    /**
     * The below function is used for deleting Tenant functionality
     */
    async tenantDelete(req: Request, res: Response): Promise<void> {
        try {
            const query = JSON.parse(JSON.stringify(req.query));
            await userService.tenantDelete(query);
            res.status(200).send(appConstant.MESSAGES.TENANT_DELETED);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
    /**
     * The function below is used for the get Terms of service or Privacy Policy
     */
    async TermsofservicePrivacyPolicy(req: Request, res: Response): Promise<void> {
        try {
            const query = JSON.parse(JSON.stringify(req.query));
            const responseData = await userService.TermsofservicePrivacyPolicy(query);
            res.status(200).send(responseData);
        } catch (error: any) {
            res.status(404).send(error.message);
        }
    }
}