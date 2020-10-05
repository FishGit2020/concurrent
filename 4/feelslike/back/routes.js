import Axios from 'axios';
import express from 'express';
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

export default routes;