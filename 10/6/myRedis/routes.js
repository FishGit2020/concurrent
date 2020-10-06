'use strict';

import Axios from 'axios';
import express from 'express';
import { redisClient } from './redisClient.js';
import { promisify } from 'util';

const routes = express.Router();
const getAsync = promisify(redisClient.get).bind(redisClient);

const cache = (req, res, next) => {
    const { username } = req.params;
    getAsync(username).then((data) => {
        if (data != null) {
            console.log("Return cached response: " + data);
            res.send(data);
            return;
        }
        next();
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    })
}

routes.get('/home', (req, res) => {
    res.send("Hi");
});

routes.get('/repo/:username', cache, (req, res) => {
    const { username } = req.params;
    Axios.get(`https://api.github.com/users/${username}`)
    .then((axiosRes) => {
        const userInfo = JSON.stringify(axiosRes.data);
        console.log("Got response: " + userInfo);

        redisClient.setex(username, 3600, userInfo); // cache for one hour

        res.send(userInfo);
    }).catch((error) => {
        console.error(error.stack);
        res.status(500).send(error.message);
    })
});

export default routes;