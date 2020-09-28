import express from 'express';
import got from 'got';

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





export default routes;