import bcrypt from "bcrypt";
import { findByEmail, generateAuthToken, userCreate, findById, deleteUser } from "../models/usermodel";
import { findByEmailTenant, deleteTenant, tenantCreate, findByIdTenant } from "../models/tenantmodel";
import AppConstants from "../utils/constant";
import lodash from "lodash";

const appConstant = new AppConstants();

export default class UserService {

    async registerUser(userData: Record<string, any>) {
        try {
            const { tenant_id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password,
                last_active,
                status,
                created_by,
                last_accessed_by } = userData;
            const userAvailable = await findByEmail(email);
            if (userAvailable) {
                throw new Error(appConstant.ERROR_MESSAGES.EXISTING_USER);
            }
            const hashedPassword = await bcrypt.hash(password, 5);
            const user = await userCreate({
                tenant_id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                last_active,
                status,
                created_by,
                last_accessed_by
            });
            const userRes = lodash.omit(user, "password");
            return userRes;
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
                        name: user.first_name + " " + user.last_name,
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

    async tenantRegister(userData: Record<string, any>) {
        try {
            const { tenant_id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password,
                last_active,
                status,
                created_by,
                last_accessed_by,
                tenant_group_name,
                org_name } = userData;
            const [userExists, tenantExists] = await Promise.all([findByEmail(email),findByEmailTenant(email)]);
            if (userExists || tenantExists) {
                throw new Error(appConstant.ERROR_MESSAGES.EXISTING_USER);
            }
            const hashedPassword = bcrypt.hashSync(password, 5);
            const user = await userCreate({
                tenant_id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password: hashedPassword,
                last_active,
                status,
                created_by,
                last_accessed_by
            });
            const tenant = await tenantCreate({
                first_name,
                last_name,
                email,
                tenant_group_name,
                org_name,
                domain_name,
                user_id: user._id,
                created_by,
                last_accessed_by
            });
            const userRes = lodash.omit(user, "password");
            return { userRes, tenant };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async tenantDelete(params: Record<string, any>) {
        try {
            const { tenant_id, user_id } = params;
            const [ user, tenant ] = await Promise.all([findById(user_id),findByIdTenant(tenant_id)]);
            if (!user || !tenant) {
                throw new Error(appConstant.MESSAGES.USER_NOT_FOUND);
            }
            await deleteUser(user_id);
            await deleteTenant(tenant_id);
            return appConstant.MESSAGES.DELETE_USER;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}