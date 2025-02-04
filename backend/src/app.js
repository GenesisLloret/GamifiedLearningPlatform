// backend/src/app.js (modificación)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de la plataforma de aprendizaje gamificada');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const redisRoutes = require('./routes/redis');
app.use('/api/redis', redisRoutes);

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
