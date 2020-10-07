
const dbName = 'feelslikedb';
const dbPw = 'dbUserPassword';
const dbUser = 'dbUser';

export const dbUrl = `mongodb+srv://${dbUser}:${dbPw}` +
    `@cluster0.evesq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
