// Import Joi Class
const Joi = require('joi');

export default class Validation {
    schema = Joi.object({
        name: Joi.string().min(5).required(),
        age: Joi.number().required()
    })

    user = Joi.object({
        name: Joi.string().min(1).max(50).required().label('User Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).max(255).required().label('Password'),
        isAdmin: Joi.boolean()
    })
}




