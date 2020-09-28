import express from 'express';
import routes from './routers.js';
import swaggerDoc from './swaggerDoc.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log("server running at: " + port);
});