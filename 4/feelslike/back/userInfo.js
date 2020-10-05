import mongoose from 'mongoose';
import Joi from 'joi';

let userDBSchema = {
    name: String,
    city: String,
    timestamp: String
};

export const userModel = mongoose.model('10-4-userInfo', userDBSchema);

export const userJoiSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
});
