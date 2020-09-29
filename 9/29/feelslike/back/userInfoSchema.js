import mongoose from 'mongoose';
import Joi from 'joi';
import { dbCollection } from './dbConfig.js';

export const userInfoModel = mongoose.model(dbCollection, {
    user: String,
    city: String,
    timestamp: String
});

export const userInfoSchema = Joi.object({
    user: Joi.string().required(),
    city: Joi.string().required()
})
