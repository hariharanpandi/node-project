const Joi = require("joi");
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();

export default class Validation {

    createUser = Joi.object({
        name: Joi.string().min(3).max(50).required().label('name'),
        email: Joi.string().min(3).max(50).required().label('email'),
        password: Joi.string().min(6).max(50).required().label('password'),
        role: Joi.string().min(3).max(50).required().label('role'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status')
    });
    
    register = Joi.object({
        name: Joi.string().min(1).max(50).required().label('name'),
        email: Joi.string().email().required().label('email'),
        password: Joi.string().min(6).max(255).required().label('password'),
        isAdmin: Joi.boolean().label('isAdmin'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status')
    });
}