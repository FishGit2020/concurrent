
import express from 'express';
import mongoose from 'mongoose';
import { dbUrl } from './configs.js';
import routesV1 from './routes/v1/routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';
import routesHome from './routes/default.js';

const app = express();
const port = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {explorer: true}));
app.use('/api/v1', routesV1);
app.use('/home', routesHome);

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database is connected.')

    app.listen(port, () => {
        console.log('Server is running at: ' + port);
    })
}).catch((error) => {
    console.error(error.stack);
})
