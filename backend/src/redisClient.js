const redis = require('redis-mock');

const redisClient = redis.createClient({
  // Puedes dejar la configuración por defecto
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;
