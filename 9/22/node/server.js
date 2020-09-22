'use strict';

import express from 'express';
import got from 'got';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8080;


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

app.listen(port, () => {
    console.log("Server running on localhost " + port);
});

