import Axios from 'axios';
import { cacheClient } from './cacheClient.js';

const apiKey = '3442bc148b46b294a5ce5abf9240896d';
const openWeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const units = 'imperial';

const getUrl = (city) => {
    return openWeatherBaseUrl + `?q=${city}&appid=${apiKey}&units=${units}`;
}

export const feelslike = (req, res) => {
    console.log("This is feelslike.");
    if (req.params.city === undefined) {
        res.status(500).send("Please provide city");
        return;
    }

    const url = getUrl(req.params.city);
    Axios.get(url).then((axiosRes) => {
        const weather = axiosRes.data;
        console.log("Got weather response: " + JSON.stringify(weather));
        res.send(weather);
    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
};

export const cacheWeather = (req, res, next) => {
    console.log("This is cacheWeather.");

    next();
};
