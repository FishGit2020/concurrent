import mongoose from 'mongoose'

const whatappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
}, { collection: 'messageContent' });

export default mongoose.model('messageContent', whatappSchema);