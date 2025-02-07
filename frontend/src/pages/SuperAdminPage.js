import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function SuperAdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('/api/superadmin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMsg('Administrador registrado correctamente. Redirigiendo...');
        setTimeout(() => navigate('/admin/dashboard'), 2000);
      } else {
        setMsg(data.msg || 'Error en el registro');
      }
    } catch (error) {
      console.error(error);
      setMsg('Error en el servidor. Intente más tarde.');
    }
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/features', label: 'Características' },
    { path: '/contact', label: 'Contacto' }
  ];

  return (
    <div className="superadmin-page">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Registro de Super Administrador</h2>
        <p>Configure el sistema creando el primer administrador para gestionar la plataforma.</p>
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
          <button className="form-button" type="submit">Registrar Administrador</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default SuperAdminPage;
