import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const handleRegister = async e => {
    e.preventDefault();
    const result = await registerUser({ username, password });
    if (result.user) { setMsg('Registro exitoso'); setTimeout(() => navigate('/login'), 1500); }
    else setMsg(result.msg || 'Error en registro');
  };
  return (
    <div className="page-container">
      <h1>Registro</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleRegister}>
        <input className="form-input" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="form-button" type="submit">Registrar</button>
      </form>
    </div>
  );
}
export default RegisterPage;