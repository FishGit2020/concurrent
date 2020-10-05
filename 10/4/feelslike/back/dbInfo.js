
let pw = 'dbUserPassword';
let dbName = 'feelslikedb';

export const dbUrl = `mongodb+srv://dbUser:${pw}@cluster0.evesq.mongodb.net/${dbName}` + 
    `?retryWrites=true&w=majority`;
