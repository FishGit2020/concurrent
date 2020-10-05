import express from 'express';
import fs from 'fs';
import got from 'got';

const app = express();

app.get('/', (req, res) => {
    res.send("Hi");
});

app.get('/readFile/:fileName?', (req, res) => {
    if (req.params.fileName === undefined) {
        res.send("missing file name");
        return;
    }

    fs.promises.readFile("./" + req.params.fileName, 'utf8')
        .then((fileContext) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(fileContext);
                }, 1500);
            });
        })
        .then((fileContext) => {
            res.send(fileContext);
        })
        .catch((error) => {
            console.log(error.stack);
            res.send(error.message);
        });
});

app.get('/google', (req, res) => {
    res.redirect("http://google.com");
});

app.get('/weather/:city?', (req, res) => {
    if (req.params.city === undefined) {
        res.send("missing city");
        return;
    }

    got(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=3442bc148b46b294a5ce5abf9240896d`)
        .then((response) => {
            console.log(response.body);
            res.send(response.body);
        })
        .catch((error) => {
            console.log(error.stack);
            res.send(error.message);
        });
});

app.get('/express', (req, res) => {
    res.redirect('https://github.com/expressjs/express');
});

app.listen(8080, () => {
    console.log("Server runs at: " + 8080);
});

