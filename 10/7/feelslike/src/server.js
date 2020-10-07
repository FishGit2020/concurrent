
import express from 'express';
import mongoose from 'mongoose';
import { dbUrl } from './configs.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';
import routesV1 from './routes/v1/routes.js';
import routesDefault from './routes/default.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));
app.use('/api/v1', routesV1);
app.use('/home', routesDefault);

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection established.')

    app.listen(port, () => {
        console.log('Server is running on port: ' + port);
    })
}).catch((err) => {
    console.error(err.stack);
})
