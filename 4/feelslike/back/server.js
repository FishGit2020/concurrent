'user strict';

import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import { dbUrl } from './dbInfo.js';
import { swaggerDoc } from './swaggerDoc.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));
app.use('/api', routes);

app.post('/test', (req, res) => {
    res.send(req.body);
});

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected.");

    app.listen(port, () => {
        console.log("Server runs at: " + port);
    });
}).catch((error) => {
    console.error(error.stack);
});

