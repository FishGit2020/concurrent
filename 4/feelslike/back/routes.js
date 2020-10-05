import Axios from 'axios';
import express from 'express';
import { userJoiSchema, userModel } from './userInfo.js';
import { getWeatherUrl } from './weatherInfo.js';
const routes = express.Router();

/**
 * @swagger
 * /api/home:
 *   get:
 *     description: home page
 *     summary: return home page info
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/home', (req, res) => {
    res.send("Hi");
});

/**
 * @swagger
 * /api/feelslike/{city}:
 *   get:
 *     description: return city feelslike temperature
 *     summary: return city feelslike temperature
 *     parameters:
 *     - name: city
 *       in: path
 *       required: true
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/feelslike/:city?', (req, res) => {
    if (req.params.city === undefined || req.params.city === '') {
        console.error("missing city.");
        res.status(500).send("Missing city.");
        return;
    }

    const city = req.params.city;
    console.log("Looking for temperature at: " + city);
    const weatherUrl = getWeatherUrl(city);
    console.log("Url: " + weatherUrl);

    Axios.get(weatherUrl).then((response) => {
        console.log(response.data);
        res.send(response.data);
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    })
});

/**
 * @swagger
 * /api/saveInfo:
 *   post:
 *     description: save user info to database
 *     summary: save user info
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             name:
 *               type: string
 *               required: true
 *             city:
 *               type: string
 *               required: true
 *           example:
 *             name: Bruce
 *             city: Houston
 *       required: true
 *     responses:
 *       '201':
 *         description: save succceed
 */
routes.post('/saveInfo', (req, res) => {
    if (req.body === undefined) {
        console.error("Missing user info");
        res.status(500).send("Missing user info");
        return;
    }

    userJoiSchema.validateAsync(req.body).then((info) => {
        console.log("User Info is valid: " + info);

        info.timestamp = new Date();
        const userInfo = new userModel(info);

        userInfo.save().then((savedData) => {
            console.log(savedData);
            res.send(savedData);
        }).catch((error) => {
            console.error(error.stack);
            res.status(500).send(error.message);
        });
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    })

});

export default routes;