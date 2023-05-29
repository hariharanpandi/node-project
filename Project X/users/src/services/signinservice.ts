import bcrypt from "bcrypt";
import { findByEmail, generateAuthToken, registerUser } from "../models/signupmodel";
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

export default class UserService {

    async registerUser(userData: Record<string, any>) {
        try {
            const { name, email, password, isAdmin, status } = userData;
            const userAvailable = await findByEmail(email);
            if (userAvailable) {
                throw new Error(appConstant.ERROR_MESSAGES.EXISTING_USER);
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await registerUser({
                name,
                email,
                password: hashedPassword,
                isAdmin,
                status,
            });
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async loginUser(userData: Record<string, any>) {
        try {
            const { email, password } = userData;
            const user = await findByEmail(email);
            if (user && (await bcrypt.compare(password, user.password))) {
                const accessToken = generateAuthToken(user);
                return {
                    authDetails: {
                        accessToken,
                    },
                    userDetails: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.status,
                    }
                }
            } else {
                throw new Error(appConstant.ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}