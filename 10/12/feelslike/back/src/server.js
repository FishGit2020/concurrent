
import express from 'express';
import home from './routes/home.js';
import mongoose from 'mongoose';
import { dbUrl } from './dbInfo.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';
import routesV1 from './routes/routesV1.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}))
app.use('/api/v1', routesV1);
app.use('/home', home);

mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Database is connected.");

    app.listen(port, () => {
        console.log("Service is running at port:" + port);
    });
}).catch((err) => {
    console.log("Database is not connected: " + errr.stack);
});
