'user strict';

import express from 'express';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use('/api', routes);

app.listen(port, () => {
    console.log("Server runs at: " + port);
});
