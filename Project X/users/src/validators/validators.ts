const Joi = require("joi");
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

export default class Validation {
    /** 
     * Defining validation schema for user registration
     */
    userRegister = Joi.object({
        tenant_id: Joi.string().trim().min(1).max(50).required().label('tenant_id'),
        tenant_group_id: Joi.string().trim().min(1).max(50).required().label('tenant_group_id'),
        domain_name: Joi.string().trim().min(1).max(50).required().label('domain_name'),
        first_name: Joi.string().trim().min(1).max(50).required().label('first_name'),
        last_name: Joi.string().trim().min(1).max(50).required().label('last_name'),
        email: Joi.string().email().trim().required().label('email'),
        password: Joi.string().min(6).max(255).required().label('password'),
        user_type: Joi.string().allow(appConstant.SCHEMA.ADMIN_USER, appConstant.SCHEMA.NORMAL_USER).label('user_type'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status'),
        created_by: Joi.string().trim().min(1).max(50).required().label('created_by'),
        last_accessed_by: Joi.string().trim().min(1).max(50).required().label('last_accessed_by')
    });
    /**
     * Defining validation schema for tenant registration
     */
    tenantRegister = Joi.object({
        first_name: Joi.string().trim().min(1).max(50).required().label('first_name'),
        last_name: Joi.string().trim().min(1).max(50).required().label('last_name'),
        email: Joi.string().email().trim().required().label('email'),
        tenant_group_name: Joi.string().trim().min(1).max(50).required().label('tenant_group_name'),
        org_name: Joi.string().trim().min(1).max(50).required().label('org_name'),
        domain_name: Joi.string().trim().min(1).max(50).required().label('domain_name'),
        user_id: Joi.string().trim().min(1).max(50).label('user_id'),
        user_type: Joi.string().allow(appConstant.SCHEMA.ADMIN_USER, appConstant.SCHEMA.NORMAL_USER).label('user_type'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status'),
        created_by: Joi.string().trim().min(1).max(50).required().label('created_by'),
        last_accessed_by: Joi.string().trim().min(1).max(50).required().label('last_accessed_by'),
        tenant_group_id: Joi.string().trim().min(1).max(50).required().label('tenant_group_id'),
        password: Joi.string().min(6).max(255).required().label('password')
    });
}