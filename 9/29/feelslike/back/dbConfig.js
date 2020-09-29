let dbPw = 'dbUserPassword';
let dbName = 'feelslikedb';
export const dbUrl = `mongodb+srv://dbUser:${dbPw}@cluster0.evesq.mongodb.net/` +
    `${dbName}?retryWrites=true&w=majority`;

export const dbCollection = '29-userInfo';
