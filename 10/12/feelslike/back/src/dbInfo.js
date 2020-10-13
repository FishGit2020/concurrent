
const dbPW = 'dbUserPassword';
const dbName = 'feelslikedb';

export const dbUrl = `mongodb+srv://dbUser:${dbPW}@cluster0.evesq.mongodb.net/` + 
    `${dbName}?retryWrites=true&w=majority`;
