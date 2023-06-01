const Joi = require('joi');
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();
export default class Validation {

    project = Joi.object({
        project_name: Joi.string().trim().min(1).max(50).required().label('project_name'),
        description: Joi.string().trim().min(5).max(255).required().label('description'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status'),
        created_by: Joi.string().trim().min(1).max(50).required().label('created_by'),
        created_at: Joi.string().min(1).max(50).label('created_at'),
        last_accessed_by: Joi.string().trim().min(1).max(50).required().label('last_accessed_by'),
        last_accessed_at: Joi.string().min(1).max(50).label('last_accessed_at'),
    });
}