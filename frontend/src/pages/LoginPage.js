// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser({ username, password });
    if (result.token) {
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    } else {
      setMsg(result.msg || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="page-container">
      <h1>Inicio de Sesión</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleLogin}>
        <input className="form-input" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="form-button" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;
