// backend/src/routes/redis.js
const express = require('express');
const router = express.Router();
const redisClient = require('../redisClient');

router.get('/keys', async (req, res) => {
  try {
    const keys = await redisClient.keys('*');
    const data = {};
    for (const key of keys) {
      data[key] = await redisClient.get(key);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving keys' });
  }
});

module.exports = router;
