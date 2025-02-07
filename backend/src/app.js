const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Configurar trust proxy para identificar correctamente al cliente
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Limitador global de solicitudes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes, por favor intente de nuevo más tarde.'
});
app.use(globalLimiter);

// Rutas
app.get('/', (req, res) => {
  res.send('API de la plataforma de aprendizaje gamificada');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const redisRoutes = require('./routes/redis');
app.use('/api/redis', redisRoutes);
const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);
const superadminRoutes = require('./routes/superadmin');
app.use('/api/superadmin', superadminRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
const tutoringRoutes = require('./routes/tutoring');
app.use('/api/tutoring', tutoringRoutes);

// Rutas para gestión de contraseña
const passwordRoutes = require('./routes/password');
app.use('/api/password', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
