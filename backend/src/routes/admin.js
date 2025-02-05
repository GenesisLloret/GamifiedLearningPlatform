const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const verifyToken = require('../middlewares/verifyToken');
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'No autorizado' });
  next();
};
router.get('/users', verifyToken, adminOnly, (req, res) => {
  const users = db.prepare('SELECT id, username, role, status FROM users').all();
  res.json(users);
});
router.post('/users', verifyToken, adminOnly, async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ msg: 'Faltan datos' });
  if (!['alumno', 'profesor', 'admin'].includes(role)) return res.status(400).json({ msg: 'Rol no válido' });
  const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (existing) return res.status(400).json({ msg: 'El usuario ya existe' });
  const hashedPassword = await bcrypt.hash(password, 10);
  const info = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run(username, hashedPassword, role);
  const newUser = { id: info.lastInsertRowid, username, role, status: 'active' };
  res.status(201).json({ msg: 'Usuario creado correctamente', user: newUser });
});
router.put('/users/:id', verifyToken, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { username, role, password } = req.body;
  if (!username || !role) return res.status(400).json({ msg: 'Faltan datos' });
  let query = 'UPDATE users SET username = ?, role = ?';
  let params = [username, role];
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ', password = ?';
    params.push(hashedPassword);
  }
  query += ' WHERE id = ?';
  params.push(id);
  const info = db.prepare(query).run(...params);
  if (info.changes === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json({ msg: 'Usuario actualizado correctamente' });
});
router.put('/users/:id/status', verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status || !['active', 'blocked'].includes(status)) return res.status(400).json({ msg: 'Estado no válido' });
  const info = db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id);
  if (info.changes === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json({ msg: 'Estado actualizado correctamente' });
});
router.delete('/users/:id', verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json({ msg: 'Usuario eliminado correctamente' });
});
router.get('/content', verifyToken, adminOnly, (req, res) => { res.json(contentItems); });
router.post('/content', verifyToken, adminOnly, (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ msg: 'Faltan datos' });
  const newContent = { id: contentItems.length + 1, title, description };
  contentItems.push(newContent);
  res.status(201).json({ msg: 'Contenido creado', content: newContent });
});
router.put('/content/:id', verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = contentItems.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ msg: 'Contenido no encontrado' });
  contentItems[index] = { id: parseInt(id), title, description };
  res.json({ msg: 'Contenido actualizado', content: contentItems[index] });
});
router.delete('/content/:id', verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const index = contentItems.findIndex(item => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({ msg: 'Contenido no encontrado' });
  contentItems.splice(index, 1);
  res.json({ msg: 'Contenido eliminado' });
});
let contentItems = [
  { id: 1, title: 'Módulo 1: Introducción', description: 'Contenido estático simulado' },
  { id: 2, title: 'Módulo 2: Avanzado', description: 'Contenido estático simulado' }
];
let gamificationSettings = {
  pointsPerLesson: 10,
  badgeCriteria: 'Completar 5 lecciones',
  leaderboardEnabled: true
};
router.get('/gamification', verifyToken, adminOnly, (req, res) => { res.json(gamificationSettings); });
router.put('/gamification', verifyToken, adminOnly, (req, res) => {
  const { pointsPerLesson, badgeCriteria, leaderboardEnabled } = req.body;
  gamificationSettings = {
    pointsPerLesson: pointsPerLesson || gamificationSettings.pointsPerLesson,
    badgeCriteria: badgeCriteria || gamificationSettings.badgeCriteria,
    leaderboardEnabled: typeof leaderboardEnabled === 'boolean' ? leaderboardEnabled : gamificationSettings.leaderboardEnabled
  };
  res.json({ msg: 'Configuración actualizada', settings: gamificationSettings });
});
module.exports = router;