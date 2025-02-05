const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
require('dotenv').config();
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ msg: 'Faltan datos' });
  const existingAdmin = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
  if (existingAdmin) return res.status(400).json({ msg: 'Ya existe un administrador. Utiliza la interfaz de administrador para crear nuevos usuarios.' });
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user) return res.status(400).json({ msg: 'El usuario ya existe' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const info = stmt.run(username, hashedPassword, 'admin');
    const newAdmin = { id: info.lastInsertRowid, username, role: 'admin' };
    const token = jwt.sign({ id: newAdmin.id, role: newAdmin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ msg: 'Administrador registrado correctamente', token, user: newAdmin });
  } catch (error) { res.status(500).json({ msg: 'Error en el servidor' }); }
});
router.get('/exist', (req, res) => {
  const existingAdmin = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
  res.json({ adminExists: !!existingAdmin });
});
module.exports = router;
