const redis = require('redis-mock');
const redisClient = redis.createClient({});
redisClient.on('error', (err) => console.error('Redis Client Error', err));
module.exports = redisClient;