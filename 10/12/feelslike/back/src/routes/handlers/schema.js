import Joi from 'joi';
import mongoose from 'mongoose';

const dbSchema = {
    name: String,
    city: String,
    timestamp: String
}

export const dbModel = mongoose.model('10-12-userInfo', dbSchema)

export const joiSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
});
