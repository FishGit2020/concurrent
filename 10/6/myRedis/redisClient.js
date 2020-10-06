import redis from 'redis';

const REDIS_PORT = process.env.REIDS_PORT || 6379;

export const redisClient = redis.createClient(REDIS_PORT, 'redis');

redisClient.on('error', (error) => {
    console.error("Redis client error: \n" + error.stack);
})