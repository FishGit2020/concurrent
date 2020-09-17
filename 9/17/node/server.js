
import express from 'express';
import fs from 'fs';

const app = express();

app.get('/home', (req, res) => {
    res.send("Hi");
});

app.get('/readFile/:fileName?', (req, res) => {
    if (req.params.fileName !== undefined) {
        fs.readFile('./' + req.params.fileName, 'utf8', (error, data) => {
            if (error) {
                console.log(error.stack);
                res.send(error.message);
            }
            console.log("find file: " + req.params.fileName);
            res.send(data);
        })
    } else {
        console.log("missing file name");
        res.send("missing file name");
    }
});

app.listen(9000, () => {
    console.log("server listen at: " + 9000);
});


