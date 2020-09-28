import express from 'express';
import routes from './routers.js';
import mongoose from 'mongoose';
import swaggerDoc from './swaggerDoc.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080;

const dbPassword = 'dbUserPassword';
const dbName = 'feelslikedb';
const mongoDbUrl = `mongodb+srv://dbUser:${dbPassword}@cluster0.evesq.mongodb.net/` + 
    `${dbName}?retryWrites=true&w=majority`;

// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
app.use(express.json());
app.use('/api', routes);

mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("db connected");

    app.listen(port, () => {
        console.log("server running at: " + port);
    });
}).catch((error) => {
    console.error(error.stack);
});
