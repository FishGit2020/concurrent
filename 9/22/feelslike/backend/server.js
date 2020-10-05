
import express from 'express';
import got from 'got';

const app = express();
const port = process.env.PORT || 8080;
const apiKey = '3442bc148b46b294a5ce5abf9240896d';

app.get('/api/v1/health', (req, res) => {
    res.send("Good");
});

app.get('/api/v1/weather/:location?', (req, res) => {
    if (req.params.location === undefined) {
        res.status(500).send("missing location");
        return;
    }

    got(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&appid=${apiKey}&units=imperial`)
        .then((data) => {
            return JSON.parse(data.body);
        })
        .then((weather) => {
            console.log("found city");
            res.send(weather.main);
        })
        .catch((error) => {
            console.log(error.stack);
            res.send(error.message);
        });
});

app.listen(port, () => {
    console.log("server listening at port: " + port);
});


