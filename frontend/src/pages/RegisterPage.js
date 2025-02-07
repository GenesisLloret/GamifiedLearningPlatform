// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser({ username, password });
    if (result.user) {
      setMsg('Registro exitoso');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMsg(result.msg || 'Error en registro');
    }
  };

  // Definimos algunos enlaces de navegación para el Header
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/login', label: 'Iniciar Sesión' }
  ];

  return (
    <div className="page-container">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Registro</h2>
        <p>Crea una cuenta para comenzar a aprender de manera gamificada.</p>
      </section>
      <section className="form-section">
        {msg && <p className="error-message">{msg}</p>}
        <form className="form-container" onSubmit={handleRegister}>
          <input
            className="form-input"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit">Registrar</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default RegisterPage;
