import express from 'express';
import routers from './routers.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';

import mongoose from 'mongoose';
import { dbUrl } from './dbConfig.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // middleware has order, add before calls
app.use('/api', routers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));

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

