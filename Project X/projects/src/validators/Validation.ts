const Joi = require('joi');
import AppConstants from "../utils/constant";

const appConstant = new AppConstants();
export default class Validation {

    schema = Joi.object({
        name: Joi.string().min(5).required(),
        age: Joi.number().required()
    })

    project = Joi.object({
        projectname: Joi.string().min(1).max(50).required().label('projectname'),
        description: Joi.string().min(5).max(255).required().label('description'),
        status: Joi.string().allow(appConstant.SCHEMA.STATUS_ACTIVE, appConstant.SCHEMA.STATUS_INACTIVE).label('status')
    });
}