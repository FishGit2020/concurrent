import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("called get / ");
    res.send("Hello world");
});

app.get('/readFile/:fileName?', (req, res) => {
    console.log("Called read file");

    if (req.params.fileName !== undefined) {
        const fileName = req.params.fileName;
        console.log("File name: " + fileName);

        fs.promises.readFile('./' + fileName, 'utf8')
            .then((fileContext) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("detention hall done");
                        resolve(fileContext);
                    }, 1000);
                });
            })
            .then((fileContext) => {
                console.log("get file: " + fileName);
                res.send(fileContext);
            })
            .catch((error) => {
                console.log(error.stack);
                res.send(error.message);
            });

    } else {
        console.log("Missing file name");
        res.send("Missing file name");
    }
});

app.get('/google', (req, res) => {
    console.log("Redirect to google");
    res.redirect(301, 'http://google.com');
});

app.listen(port, () => {
    console.log("Server listening at: " + port);
});

