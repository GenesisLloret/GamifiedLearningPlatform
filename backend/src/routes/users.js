const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const verifyToken = require('../middlewares/verifyToken');
router.post('/', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'No autorizado' });
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ msg: 'Faltan datos' });
  if (!['alumno', 'profesor', 'admin'].includes(role)) return res.status(400).json({ msg: 'Rol no válido' });
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user) return res.status(400).json({ msg: 'El usuario ya existe' });
  bcrypt.hash(password, 10).then(hashedPassword => {
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const info = stmt.run(username, hashedPassword, role);
    const newUser = { id: info.lastInsertRowid, username, role };
    res.status(201).json({ msg: 'Usuario creado correctamente', user: newUser });
  }).catch(err => res.status(500).json({ msg: 'Error al crear el usuario' }));
});
router.get('/', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'No autorizado' });
  const users = db.prepare('SELECT id, username, role, status FROM users').all();
  res.json(users);
});
module.exports = router;