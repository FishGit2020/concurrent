'use strict';

import Axios from 'axios';
import { redisGetAsync, redisClient, redisPrint } from './cache.js';

const apiKey = '3442bc148b46b294a5ce5abf9240896d';
const openWeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const units = 'imperial';

const getUrl = (city) => {
    return openWeatherBaseUrl + `?q=${city}&appid=${apiKey}&units=${units}`;
}

export const feelslike = (req, res) => {
    console.log("This is feelslike.");
    const { city } = req.params;

    if (city === undefined) {
        res.status(500).send("Please provide city");
        return;
    }

    const url = getUrl(city);
    Axios.get(url).then((axiosRes) => {
        const weather = axiosRes.data;
        console.log("Got weather response: " + JSON.stringify(weather));

        redisClient.setex(city, 600, JSON.stringify(weather), redisPrint);

        res.send(weather);
    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
};

export const cacheWeather = (req, res, next) => {
    console.log("This is cacheWeather.");
    const { city } = req.params;

    redisGetAsync(city).then((cachedWeather) => {
        if (cachedWeather !== null) {
            console.log("Redis result: " + cachedWeather);
            return res.send(cachedWeather);
        }

        next();
    })
};
