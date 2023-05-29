import { User, findAllUser, finByEmail, userCreate } from "../models/usermodel";
import AppConstants from "../utils/constant";
import bcrypt from "bcrypt";

const appConstant = new AppConstants();

export default class UserService {
    async createUser(data: Record<string, any>): Promise<Record<string, any>> {
        try {
            const { name, email, password, role, status } = data;
            const userdublicate = await finByEmail(email);
            if (userdublicate) {
                throw new Error(appConstant.ERROR_MESSAGES.DUPLICATE);
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = userCreate({
                name, email, password: hashedPassword, role, status
            });
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async getAllUsers(): Promise<Record<string, any>> {
        try {
            const userList = await findAllUser(appConstant.SCHEMA.STATUS_ACTIVE);
            const count = await User.countDocuments();
            return { count, userList };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

