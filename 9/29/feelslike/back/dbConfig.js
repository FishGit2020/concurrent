const dbPw = 'dbUserPassword';
const dbName = 'feelslikedb';
const dbUrl = `mongodb+srv://dbUser:${dbPw}@cluster0.evesq.mongodb.net/` +
    `${dbName}?retryWrites=true&w=majority`;

export default dbUrl;