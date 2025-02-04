const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../redisClient');
const db = require('../models/db');

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Faltan datos' });
  }
  // Verificar si el usuario existe
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user) {
    return res.status(400).json({ msg: 'El usuario ya existe' });
  }
  bcrypt.hash(password, 10).then(hashedPassword => {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, hashedPassword);
    const newUser = { id: info.lastInsertRowid, username, password: hashedPassword };
    redisClient.set(`user:${newUser.id}`, username, (err) => {
      if (err) console.error(err);
      res.status(201).json({ msg: 'Usuario registrado correctamente', user: newUser });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    return res.status(400).json({ msg: 'Credenciales incorrectas' });
  }
  bcrypt.compare(password, user.password).then(isMatch => {
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  });
};
