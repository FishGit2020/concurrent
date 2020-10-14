
import kafka from 'kafka-node';

export const client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'});
export const producer = new kafka.HighLevelProducer(client); // round robin to all partitions [https://github.com/SOHU-Co/kafka-node/issues/275#issuecomment-169275673]

const consumerTest = new kafka.Consumer(client, [{ topic: 'test' }], { autoCommit: false});
const consumerTest1 = new kafka.Consumer(client, [{ topic: 'test-1' }], { autoCommit: false});
const consumerTest2 = new kafka.Consumer(client, [{ topic: 'test-2' }], { autoCommit: false});

client.on('ready', () => {
    console.log("Client is ready.");
});

client.on('error', (err) => {
    console.log("Client error: " + err.stack);
});

producer.on('ready', () => {
    console.log("Producer is ready.");

    producer.createTopics(['test-1','test-2'], true, function (err, data) {
        console.log(data);
    });
});

producer.on('error', (err) => {
    console.log("Producer error: " + err.stack);
});

consumerTest.on('message', (msg) => {
    console.log("consumerTest on message: " + JSON.stringify(msg));
});

consumerTest.on('error', (err) => {
    console.log("consumerTest error: " + err.stack);
});

consumerTest1.on('message', (msg) => {
    console.log("consumerTest1 on message: " + JSON.stringify(msg));
});

consumerTest1.on('error', (err) => {
    console.log("consumerTest1 error: " + err.stack);
});

consumerTest2.on('message', (msg) => {
    console.log("consumerTest2 on message: " + JSON.stringify(msg));
});

consumerTest2.on('error', (err) => {
    console.log("consumerTest2 error: " + err.stack);
});
