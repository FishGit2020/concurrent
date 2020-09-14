// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js'

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());

// DB config
const connection_url = 'mongodb+srv://admin:nwvdAXTamhO7iebw@cluster0.uuzrn.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log(err);
});

// ???

// api routes
app.get('/', (req, res) => {
    console.log('GET /');
    res.status(200).send("hello world");
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data); // ok
        }
    })
});

app.post('/messages/new', (req, res) => {
    console.log('POST messages')
    
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data); // create ok
        }
    })
});

// listen
app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`)
})
