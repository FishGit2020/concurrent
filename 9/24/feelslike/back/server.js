'user strict';

import express from 'express';
import got from 'got';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import postUserInfo from './models/postUserInfo.js';
import Joi from 'joi';

const app = express();
const port = process.env.PORT || 8080;
const apiKey = '3442bc148b46b294a5ce5abf9240896d';
const userInfoSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required()
});

// database connection
const dbUser = 'dbUser';
const dbUserPassword = 'dbUserPassword';
const dbName = 'feelslikedb';
const dbUrl = `mongodb+srv://${dbUser}:${dbUserPassword}@cluster0.evesq.mongodb.net/${dbName}?retryWrites=true&w=majority`;

await mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// https://swagger.io/specification/
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        name: "feels like API",
        version: "1.0.0"
    }
};

// https://github.com/Surnet/swagger-jsdoc/blob/HEAD/docs/GETTING-STARTED.md
const options = {
    swaggerDefinition,
    apis: ['server.js']
};
const swaggerSpec = swaggerJSDoc(options);

// middleware
// https://github.com/scottie1984/swagger-ui-express#swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: home page
 *     description: this is home page
 *     responses:
 *       '200':
 *         description: a successful response
 */
app.get('/', (req, res) => {
    res.send("Hi");
});

/**
 * @swagger
 * /feelslike/{cityName}:
 *   get:
 *     summary: temparature of the city
 *     description: call open weather API for temps and humidity
 *     parameters:
 *       - in: path
 *         name: cityName
 *         required: true
 *     responses:
 *       '200':
 *         description: a successful response
 */
app.get('/feelslike/:cityName?', (req, res) => {
    if (req.params.cityName === undefined) {
        res.status(500).send("missing city name");
        return;
    }
    
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=${apiKey}&units=imperial`;
    
    got(weatherUrl)
        .then((data) => {
            return JSON.parse(data.body);
        })
        .then((weather) => {
            res.send(weather.main);
        })
        .catch((error) => {
            console.log(error.stack);
            res.status(500).send(error.message);
        })
});

/**
 * @swagger
 * /saveUser:
 *   post:
 *     summary: post city to database
 *     description: post city to database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: string
 *               city: string
 *           example:
 *             name: "Bruce"
 *             city: "Houston"
 *     responses:
 *       '201':
 *         description: saved to database
 */
app.post('/saveUser', (req, res) => {
    console.log("post user and city");

    userInfoSchema.validateAsync(req.body)
        .then((validatedBody) => {
            console.log("Data validated: " + validatedBody);

            const post = new postUserInfo(validatedBody);
            post.save()
                .then((dbResponse) => {
                    res.status(201).send(dbResponse);
                })
                .catch((error) => {
                    consolg.log(error.stack);
                    res.status(500).send(error.message);
                })
        })
        .catch((error) => {
            console.log(error.stack);
            res.status(500).send(error.message);
        })
});

app.listen(port, () => {
    console.log("Server runs at: " + port);
});
