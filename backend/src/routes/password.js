const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { forgotPassword, resetPassword } = require('../controllers/passwordController');

router.post('/forgot', [
  body('email').isEmail().withMessage('Email inválido')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, forgotPassword);

router.post('/reset', [
  body('userId').notEmpty().withMessage('El ID de usuario es requerido'),
  body('resetToken').notEmpty().withMessage('El token de reseteo es requerido'),
  body('newPassword').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, resetPassword);

module.exports = router;
