import mongoose from 'mongoose'

const userInfo = mongoose.Schema({
    name: String,
    city: String
});

export default mongoose.model('test', userInfo);