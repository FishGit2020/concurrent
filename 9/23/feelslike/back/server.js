'use strict';

import express from 'express';
import fs from 'fs';
import got from 'got';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080
const apiKey = '3442bc148b46b294a5ce5abf9240896d';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "feeslike API",
            version: "1.0.0",
            servers: ["http://localhost:8080"]
        },
    },
    apis: ["server.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 *  /health:
 *    get:
 *      description: Check server health
 *      responses:
 *        "200":
 *           description: A successfull response
 */
app.get('/health', (req, res) => {
    console.log("Health check");
    res.send("Good");
});

/**
 * @swagger
 *  /feelslike/:city?:
 *    get:
 *      summary: Get feels like temperature of a city
 *      description: Call Open Weather API for city weather
 *      parameters:
 *        - name: city
 *          in: path
 *          required: true
 *          description: City name to check the weather
 *      responses:
 *        "200":
 *           description: A successfull response
 */
app.get('/feelslike/:city?', (req, res) => {
    console.log("Get feelslike");
    
    if (req.params.city === undefined || req.params.city === "") {
        res.status(500).send("missing city params");
        return;
    }

    res.send("Got" + req.params.city);
});

app.listen(port, (req, res) => {
    console.log("Server runs on: " + port);
});