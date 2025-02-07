const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const redisClient = require('../redisClient');
const db = require('../models/db');

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'El email es requerido' });
  }
  // Se asume que el username es el email
  const user = db.prepare('SELECT id FROM users WHERE username = ?').get(email);
  if (!user) {
    return res.status(400).json({ msg: 'No se encontró un usuario con ese email' });
  }
  const resetToken = crypto.randomBytes(20).toString('hex');
  redisClient.set(`reset:${user.id}`, resetToken, 'EX', 3600, (err) => {
    if (err) {
      return res.status(500).json({ msg: 'Error al establecer el token de reseteo' });
    }
    // En producción se enviaría el token por email
    res.json({ msg: 'Token de reseteo generado', resetToken });
  });
};

exports.resetPassword = async (req, res) => {
  const { userId, resetToken, newPassword } = req.body;
  if (!userId || !resetToken || !newPassword) {
    return res.status(400).json({ msg: 'Faltan datos' });
  }
  redisClient.get(`reset:${userId}`, async (err, token) => {
    if (err || !token) {
      return res.status(400).json({ msg: 'Token inválido o expirado' });
    }
    if (token !== resetToken) {
      return res.status(400).json({ msg: 'Token inválido' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const info = db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, userId);
    if (info.changes === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    redisClient.del(`reset:${userId}`);
    res.json({ msg: 'Contraseña restablecida correctamente' });
  });
};
