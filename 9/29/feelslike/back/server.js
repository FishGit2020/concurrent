import express from 'express';
import routers from './routers.js';

const app = express();
const port = process.env.PORT || 8080;

app.use('/api', routers);

app.listen(port, () => {
    console.log("server runs at: " + port);
});
