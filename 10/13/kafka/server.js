
import express from 'express';
import { producer } from './myKafka.js';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    console.log("Called Hi");
    res.send("Hi");
});

app.get('/kafka/send/:msg', (req, res) => {
    console.log("At kafka send.");

    const msg = [
        { topic: 'test', messages: req.params.msg },
        { topic: 'test-1', messages: req.params.msg },
        { topic: 'test-2', messages: req.params.msg }
    ];

    producer.send(msg, (err, data) => {
        if (err) {
            console.error(err.stack);
            res.send(err.message);
        }

        res.send(data);
    });
})

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})
