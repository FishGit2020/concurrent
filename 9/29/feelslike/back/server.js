import express from 'express';
import routers from './routers.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';

import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 8080;
const dbPw = 'dbUserPassword';
const dbName = 'feelslikedb';
const dbUrl = `mongodb+srv://dbUser:${dbPw}@cluster0.evesq.mongodb.net/` +
    `${dbName}?retryWrites=true&w=majority`;

app.use('/api', routers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected");

    app.listen(port, () => {
        console.log("server runs at: " + port);
    });
}).catch((error) => {
    console.error(error.stack);
});

