import redis from 'redis';
import { promisify } from 'util';

const host = 'redisCache';
const port = process.env.REDIS_PORT || 6379;

const client = redis.createClient(port, host);

client.on("connect", () => {
    console.log("Redis connection established.");
});

client.on("error", (err) => {
    console.error(err);
});

client.on("monitor", (time, args, rawReply) => {
    console.log(time + ": " + args);
    console.log("Raw reply: " + rawReply);
});

export const redisGetAsync = promisify(client.get).bind(client);
export const redisClient = client;
export const redisPrint = redis.print;