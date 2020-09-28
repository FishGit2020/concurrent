import express from 'express';
import got from 'got';
import userInfoSchema from './userInfoSchema.js';

const routes = express.Router();
const openWeatherApiKey = '3442bc148b46b294a5ce5abf9240896d';

/**
 * @swagger
 * /api:
 *   get:
 *     description: home page
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/', (req, res) => {
    console.log(new Date(), '/');
    res.send("Hi");
});

/**
 * @swagger
 * /api/feelslike/{cityName}:
 *   get:
 *     description: feels like temperature
 *     parameters:
 *       - name: cityName
 *         in: path
 *         required: true
 *     responses:
 *       '200':
 *         description: found the city
 *       '500':
 *         description: something is wrong
 */
routes.get('/feelslike/:cityName?', (req, res) => {
    console.log(new Date(), '/feelslike');

    if (req.params.cityName === undefined || req.params.cityName === '') {
        res.status(500).send("missing city name");
        console.error( "feels like call missing city name");
        return;
    }

    const cityName = req.params.cityName;
    const url = `http://api.openweathermap.org/data/2.5/weather` + 
        `?q=${cityName}&appid=${openWeatherApiKey}&units=imperial`;
    
    got(url).then((data) => {
        return JSON.parse(data.body);
    }).then((weather) => {
        console.log("found weather at " + cityName);
        res.send(weather.main);
    }).catch((error) => {
        console.log(error.stack);
        res.status(500).send(error.message);
    });
});

/**
 * @swagger
 * /api/getUserInfo:
 *   get:
 *     description: get existed user info
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/getUserInfo', (req, res) => {
    console.log(new Date(), '/getUserInfo');
    res.send("Hi");
});

/**
 * @swagger
 * /api/saveUserInfo:
 *   post:
 *     description: save user info
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.post('/saveUserInfo', (req, res) => {
    console.log(new Date(), '/saveUserInfo');

    const userInfo = new userInfoSchema;
    userInfo.save(req.body).then((data) => {
        console.log("Data saved");
        res.send(data);
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    });
});

export default routes;