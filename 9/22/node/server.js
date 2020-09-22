'use strict';

import express from 'express';
import got from 'got';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8080;
const weatherApiKey = '3442bc148b46b294a5ce5abf9240896d';

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi");
});

app.get('/api/v1/readFile/:fileName?', (req, res) => {
    if (req.params.fileName === undefined) {
        res.send("missing file name");
        return;
    }

    fs.promises.readFile('./' + req.params.fileName, 'utf8')
        .then((fileContext) => {
            console.log("Found file: " + req.params.fileName);
            res.send(fileContext);
        })
        .catch((error) => {
            console.log(error.stack);
            res.send(error.message);
        });
});

app.get('/api/v1/weather/:city?', (req, res) => {
    if (req.params.city === undefined) {
        res.send("missing city");
        return;
    }

    got(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${weatherApiKey}&units=imperial`)
        .then((data) => {
            const body = JSON.parse(data.body);
            console.log("feels like" + body.main.feels_like);

            return body.coord;
        })
        .then((coords) => {
            got(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely&appid=${weatherApiKey}&units=imperial`)
                .then((weather) => {
                    res.send(weather.body);
                })
                .catch((error) => {
                    console.log(error.stack);
                    res.status(500).send(error.message);
                });
        })
        .catch((error) => {
            console.log(error.stack);
            res.status(500).send(error.message);
        });
});

app.listen(port, () => {
    console.log("Server running on localhost " + port);
});

