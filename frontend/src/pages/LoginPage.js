// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const result = await loginUser({ username, password });
      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
      } else {
        setMsg(result.msg || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error(error);
      setMsg('Error en el servidor. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Enlaces de navegación para el Header
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/register', label: 'Registrarse' }
  ];

  return (
    <div className="page-container">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Inicio de Sesión</h2>
        <p>Ingresa tus credenciales para acceder a la plataforma.</p>
      </section>
      <section className="form-section">
        {msg && <p className="error-message">{msg}</p>}
        <form className="form-container" onSubmit={handleLogin}>
          <input
            className="form-input"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default LoginPage;
