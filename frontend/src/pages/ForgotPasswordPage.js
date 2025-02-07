// frontend/src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/login', label: 'Iniciar Sesión' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await forgotPassword({ email });
    if(result.resetToken) {
      // En producción se enviaría el token al correo del usuario.
      setMsg(`Token generado (solo para pruebas): ${result.resetToken}`);
    } else {
      setMsg(result.msg || 'Error al generar el token');
    }
  };

  return (
    <div className="page-container">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu email para recuperar tu contraseña.</p>
      </section>
      <section className="form-section">
        {msg && <p className="error-message">{msg}</p>}
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="form-button" type="submit">Enviar Solicitud</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
