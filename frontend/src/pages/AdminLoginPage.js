import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function AdminLoginPage() {
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        if (data.user && data.user.role === 'admin') {
          localStorage.setItem('token', data.token);
          navigate('/admin/dashboard');
        } else {
          setMsg('Acceso denegado: El usuario no es administrador');
        }
      } else {
        setMsg(data.msg || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error(error);
      setMsg('Error en el servidor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/admin/dashboard', label: 'Dashboard' }
  ];

  return (
    <div className="admin-login-page">
      <Header title="Gamified Learning - Admin" links={navLinks} />
      <section className="hero-section">
        <h2>Inicio de Sesión Administrador</h2>
        <p>Accede al panel de administración introduciendo tus credenciales.</p>
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

export default AdminLoginPage;
