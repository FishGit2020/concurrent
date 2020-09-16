'use strict';

import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hi");
});

app.get('/readFile/:fileName?', (req, res) => {
    console.log("at reading file");
    if (req.params.fileName !== null && req.params.fileName !== undefined) {
        const fileName = req.params.fileName;
        fs.promises.readFile('./' + fileName, 'utf8')
            .then((fileContext) => {
                console.log("send file: " + fileName);
                res.send(fileContext);
            })
            .catch((error) => {
                console.log(error.stack);
                res.send(error.message);
            })
    } else {
        res.send("missing file name");
    };
});

app.get('/google', (req, res) => {
    res.redirect('http://google.com');
});

app.listen(port, () => {
    console.log("server runs on localhost:" + port);
});

