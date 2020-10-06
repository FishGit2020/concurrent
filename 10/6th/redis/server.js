import express from 'express';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 8080

app.use('/api', routes);

app.listen(port, () => {
    console.log("server is running at: " + port);
});
