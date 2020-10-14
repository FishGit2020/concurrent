
import express from 'express';
import kafka from 'kafka-node';

const app = express();
const port = process.env.PORT || 8080;

const client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'});
const producer = new kafka.Producer(client);

const topics = [
    { topic: 'test', partition: 1 }
]

const consumer = new kafka.Consumer(client, topics);

consumer.on('ready', () => {
    console.log('Consumer is ready');
});

consumer.on('error', (err) => {
    console.log('Consumer error: ' + err.stack);
});

client.on('ready', () => {
    console.log("Client is ready.");
});

client.on('error', (err) => {
    console.log("Client error: " + err.stack);
});

producer.on('ready', () => {
    console.log("Producer is ready.");
});

producer.on('error', (err) => {
    console.log("Producer error: " + err.stack);
});

app.get('/', (req, res) => {
    console.log("Called Hi");
    res.send("Hi");
});

app.get('/kafka/send', (req, res) => {
    console.log("At kafka send.");

    const msg = [
        { topic: 'test', message: 'hi' },
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
