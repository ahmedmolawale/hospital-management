import Joi from 'joi';

export const login = {
    body:{
        username: Joi.string().required(),
        password: Joi.string().required()
    }
};

export const admin = {
    body:{
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),

    }
};