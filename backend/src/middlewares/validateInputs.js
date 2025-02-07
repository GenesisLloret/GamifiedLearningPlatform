const { body } = require('express-validator');

const validateRegister = [
  body('username')
    .notEmpty().withMessage('El usuario es requerido')
    .isAlphanumeric().withMessage('El usuario debe ser alfanumérico'),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const validateLogin = [
  body('username').notEmpty().withMessage('El usuario es requerido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

module.exports = { validateRegister, validateLogin };
