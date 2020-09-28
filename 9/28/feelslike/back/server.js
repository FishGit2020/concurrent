import express from 'express';

import swaggerDoc from './swaggerDoc.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @swagger
 * /:
 *   get:
 *     description: home page
 *     responses:
 *       '200':
 *         description: a successful response
 */
app.get('/', (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log("server running at: " + port);
});