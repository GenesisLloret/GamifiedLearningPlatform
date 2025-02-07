const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Demasiadas solicitudes de autenticación, por favor intente de nuevo más tarde.'
});

module.exports = { authLimiter };
