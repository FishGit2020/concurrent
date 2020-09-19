import express from 'express';
import fs from 'fs';
import weather from './weather.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi");
});

app.get('/readFile/:fileName?', (req, res) => {
    if (req.params.fileName === undefined) {
        return res.send("missing file name");
    }

    fs.promises.readFile('./' + req.params.fileName, 'utf8')
        .then((fileContext) => {
            res.send(fileContext);
        })
        .catch((error) => {
            console.log(error.stack);
            res.status(500).send(error.message);
        });
});

app.get('/weather/:cityName?', (req, res) =>{
    if (req.params.cityName === undefined) {
        res.send("missing city name");
        return;
    };

    weather(req.params.cityName)
        .then((gotResJson) => {
            return gotResJson.body;
        })
        .then((cityWeather) => {
            res.send(cityWeather);
        })
        .catch((error) => {
            console.log(error.stack);
            res.status(500).send(error.message);
        });
});

app.listen(8080, () => {
    console.log("server running on port: " + 8080);
});


