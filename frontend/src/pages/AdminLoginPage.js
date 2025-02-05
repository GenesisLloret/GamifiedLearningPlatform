import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const handleLogin = async e => {
    e.preventDefault();
    const result = await loginUser({ username, password });
    if (result.token) {
      if (result.user.role === 'admin') {
        localStorage.setItem('token', result.token);
        navigate('/admin/dashboard');
      } else setMsg('Acceso denegado: Usuario no es administrador');
    } else setMsg(result.msg || 'Error al iniciar sesión');
  };
  return (
    <div className="page-container">
      <h1>Inicio de Sesión Administrador</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleLogin}>
        <input className="form-input" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="form-button" type="submit">Entrar</button>
      </form>
    </div>
  );
}
export default AdminLoginPage;