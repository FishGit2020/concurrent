import mongoose from 'mongoose';
import Joi from 'joi';

export const userInfoModel = mongoose.model('9/28-userInfo', mongoose.Schema({
    name: String,
    city: String
}));

export const userInfoSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
});
