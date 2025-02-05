// backend/src/routes/tutoring.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const verifyToken = require('../middlewares/verifyToken');
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'No autorizado' });
  next();
};
router.get('/', verifyToken, adminOnly, (req, res) => {
  const stmt = db.prepare(`SELECT t.id, p.username AS professor, s.username AS student FROM tutoring t LEFT JOIN users p ON t.professor_id = p.id LEFT JOIN users s ON t.student_id = s.id`);
  const tutoringList = stmt.all();
  res.json(tutoringList);
});
router.post('/', verifyToken, adminOnly, (req, res) => {
  const { professor_id, student_id } = req.body;
  if (!professor_id || !student_id) return res.status(400).json({ msg: 'Faltan datos' });
  const professor = db.prepare('SELECT * FROM users WHERE id = ? AND role = ?').get(professor_id, 'profesor');
  if (!professor) return res.status(400).json({ msg: 'Profesor no encontrado o rol incorrecto' });
  const student = db.prepare('SELECT * FROM users WHERE id = ? AND role = ?').get(student_id, 'alumno');
  if (!student) return res.status(400).json({ msg: 'Alumno no encontrado o rol incorrecto' });
  const stmt = db.prepare('INSERT INTO tutoring (professor_id, student_id) VALUES (?, ?)');
  const info = stmt.run(professor_id, student_id);
  const newTutoring = { id: info.lastInsertRowid, professor_id, student_id };
  res.status(201).json({ msg: 'Relación de tutoría creada', tutoring: newTutoring });
});
router.delete('/:id', verifyToken, adminOnly, (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM tutoring WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) return res.status(404).json({ msg: 'Relación de tutoría no encontrada' });
  res.json({ msg: 'Relación de tutoría eliminada' });
});
module.exports = router;
