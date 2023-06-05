import bcrypt from "bcrypt";
import { findByEmail, generateAuthToken, userCreate, findById, deleteUser } from "../models/usermodel";
import { findByEmailTenant, deleteTenant, tenantCreate, findByIdTenant, updateTenantUserId } from "../models/tenantmodel";
import AppConstants from "../utils/constant";
import _ from "lodash";
import { findByPageUrl } from "../models/logincmsmodel";

const appConstant = new AppConstants();

export default class UserService {

    /**
     * User registration and password registration in basic format 64
     */
    async registerUser(userData: Record<string, any>): Promise<Record<string, any>> {
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
            const verifyTenant = await findByIdTenant(tenant_id);
            if (!verifyTenant || (verifyTenant.status === appConstant.SCHEMA.STATUS_INACTIVE)) {
                throw new Error(appConstant.ERROR_MESSAGES.TENANT_NOT_FOUND_EXPIRED);
            }
            const userAvailable = await findByEmail(email);
            if (!_.isNil(userAvailable) && userAvailable.status === appConstant.SCHEMA.STATUS_ACTIVE) {
                throw new Error(appConstant.ERROR_MESSAGES.EXISTING_USER);
            }
            const user = await userCreate({
                tenant_id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password: await bcrypt.hash(password, 5),
                last_active,
                status,
                created_by,
                last_accessed_by
            });
            const userRes = _.omit(user, appConstant.MESSAGES.PASSWORD);
            return userRes;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    /**
     * Login the user and verify the tenant is active, then only allow the user to login and generate a token.
     */
    async loginUser(userData: Record<string, any>): Promise<Record<string, any>> {
        try {
            const { email, password } = userData;
            const user = await findByEmail(email);
            if (!user) {
                throw new Error(appConstant.ERROR_MESSAGES.USER_INACTIVE + appConstant.MESSAGES.OR + appConstant.ERROR_MESSAGES.USER_NOT_FOUND);
            }
            const tenant = await findByIdTenant(user.tenant_id.toString());
            if (!tenant) {
                throw new Error(appConstant.ERROR_MESSAGES.TENANT_INACTIVE + appConstant.MESSAGES.OR + appConstant.ERROR_MESSAGES.TENANT_NOT_FOUND);
            }
            if (user && await bcrypt.compare(password, user.password)) {
                const accessToken = generateAuthToken(user);
                return {
                    authDetails: {
                        accessToken,
                    },
                    userDetails: {
                        id: user.id,
                        name: user.first_name + appConstant.MESSAGES.EMPTY_SPACE + user.last_name,
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
    /**
     * Tenant and tenant_user creation
     */
    async tenantRegister(userData: Record<string, any>): Promise<Record<string, any>> {
        try {
            const {
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
                org_name } = userData;
            const userExists = await findByEmail(email);
            if (!_.isNil(userExists) && (userExists.status === appConstant.SCHEMA.STATUS_ACTIVE)) {
                const tenantExists = await findByIdTenant(userExists.tenant_id);
                if (tenantExists && tenantExists.status === appConstant.SCHEMA.STATUS_ACTIVE) {
                    throw new Error(appConstant.ERROR_MESSAGES.EXISTING_TENANT);
                }
            }
            const tenant: any = await tenantCreate({
                tenant_group_id,
                org_name,
                domain_name,
                created_by,
                last_accessed_by
            });
            const user = await userCreate({
                tenant_id: tenant._id,
                tenant_group_id,
                domain_name,
                first_name,
                last_name,
                email,
                password: bcrypt.hashSync(password, 5),
                last_active,
                status,
                created_by,
                last_accessed_by
            });
            const tenantRes = await updateTenantUserId(tenant._id, user._id);
            const userRes = _.omit(user, appConstant.MESSAGES.PASSWORD);
            return { userRes, tenantRes };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    /**
     * Tenant and tenant_user soft delete
     */
    async tenantDelete(params: Record<string, any>): Promise<void> {
        try {
            const { tenant_id } = params;
            const tenant = await findByIdTenant(tenant_id);
            if (!tenant) {
                throw new Error(appConstant.ERROR_MESSAGES.TENANT_NOT_FOUND);
            }
            await deleteUser(tenant.user_id.toString());
            await deleteTenant(tenant_id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    /**
     * Get Terms-of-service or Privacy-policy
     */
    async TermsofservicePrivacyPolicy(params: Record<string, any>): Promise<Record<string, any>> {
        try {
            const { page_url } = params;
            const data = await findByPageUrl(page_url);
            if (!data) {
                throw new Error(appConstant.ERROR_MESSAGES.RECORD_NOT_FOUND);
            }
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}