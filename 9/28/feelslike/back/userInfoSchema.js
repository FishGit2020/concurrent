import mongoose from 'mongoose';

const userInfoSchema = mongoose.Schema({
    name: String,
    city: String
});

export default mongoose.model('9/28-userInfo', userInfoSchema);