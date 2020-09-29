import express from 'express';
import routers from './routers.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swaggerDoc.js';

const app = express();
const port = process.env.PORT || 8080;

app.use('/api', routers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(port, () => {
    console.log("server runs at: " + port);
});
