const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models/db');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Formato de token inválido' });
  }
  const token = parts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token inválido o expirado' });
    }
    const user = db.prepare('SELECT id, role, status FROM users WHERE id = ?').get(decoded.id);
    if (!user || user.status !== 'active') {
      return res.status(401).json({ msg: 'Usuario no encontrado o bloqueado' });
    }
    req.user = { id: user.id, role: user.role };
    next();
  });
};
