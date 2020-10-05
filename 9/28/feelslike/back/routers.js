import express from 'express';
import got from 'got';
import {userInfoModel, userInfoSchema} from './userInfo.js';

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
        console.error(error.stack);
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

    userInfoModel.find({}).then((allUsers) => {
        res.send(allUsers);
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    });
});

/**
 * @swagger
 * /api/saveUserInfoAsync:
 *   post:
 *     description: save user info
 *     requestBody:
 *       description: save user and city to database
 *       required: true
 *       content:
 *         'application/json':
 *           schema:
 *             properties:
 *               name: 
 *                 description: user name
 *                 type: string
 *               city:
 *                 description: city name
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 */
routes.post('/saveUserInfoAsync', async (req, res) => {
    console.log(new Date(), '/saveUserInfo');

    try {
        console.log(req.body);
        const value = await userInfoSchema.validateAsync(req.body);
        
        const userInfo = new userInfoModel(value);
        const data = await userInfo.save();

        console.log("data saved " + data);
        res.send(data);
    } catch (error) {
        console.error(error.stack);
        res.status(500).send(error.message);
    }
});


/**
 * @swagger
 * /api/saveUserInfo:
 *   post:
 *     description: save user info
 *     requestBody:
 *       description: save user and city to database
 *       required: true
 *       content:
 *         'application/json':
 *           schema:
 *             properties:
 *               name: 
 *                 description: user name
 *                 type: string
 *               city:
 *                 description: city name
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 */
routes.post('/saveUserInfo', (req, res) => {
    console.log(new Date(), '/saveUserInfo');
    
    userInfoSchema.validateAsync(req.body).then((validatedBody) => {
        console.log("data is valide");

        const userInfo = new userInfoModel(validatedBody);
        userInfo.save().then((data) => {
            console.log("data saved " + data);
            res.send(data);
        }).catch((error) => {
            console.error("save data error: " + error.stack);
            res.status(500).send("save data error: " + error.message);
        })
    }).catch((error) => {
        console.error("request body validation error: " + error.stack);
        res.status(500).send("request body validation error: " + error.message);
    })

});

export default routes;