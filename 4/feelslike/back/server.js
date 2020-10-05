'user strict';

import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import { dbUrl } from './dbInfo.js';

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use('/api', routes);

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

