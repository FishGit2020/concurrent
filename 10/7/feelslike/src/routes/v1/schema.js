import mongoose from 'mongoose';
import Joi from 'joi';

export const userModel = mongoose.model('10-7-userInfo-collection', {
    name: String,
    city: String,
    timestamp: String
});

export const userSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
})
