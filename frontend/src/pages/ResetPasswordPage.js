// frontend/src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { resetPassword } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function ResetPasswordPage() {
  const [userId, setUserId] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/login', label: 'Iniciar Sesión' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword({ userId, resetToken, newPassword });
    if(result.msg === 'Contraseña restablecida correctamente') {
      setMsg('Contraseña restablecida correctamente');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMsg(result.msg || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="page-container">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Restablecer Contraseña</h2>
        <p>Introduce los datos para restablecer tu contraseña.</p>
      </section>
      <section className="form-section">
        {msg && <p className="error-message">{msg}</p>}
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="ID de usuario"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="text"
            placeholder="Token de reseteo"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit">Restablecer Contraseña</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default ResetPasswordPage;
