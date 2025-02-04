const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  const users = db.prepare('SELECT id, username FROM users').all();
  res.json(users);
});

module.exports = router;
