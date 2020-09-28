'user strict';

import express from 'express';
import mongoose from 'mongoose';

import Joi from 'joi';
import got from 'got';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const port = process.env.PORT || 8080;



app.get('/', (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log("server running on port: " + port);
});

