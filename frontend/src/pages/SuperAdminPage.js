import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
function SuperAdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/superadmin/exist');
        const data = await res.json();
        if (data.adminExists) navigate('/');
      } catch (error) { console.error(error); }
    };
    checkAdmin();
  }, [navigate]);
  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/superadmin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) { localStorage.setItem('token', data.token); setMsg('Administrador registrado correctamente'); setTimeout(() => navigate('/admin/dashboard'), 1500); }
      else setMsg(data.msg || 'Error en el registro');
    } catch (error) { setMsg('Error en el servidor'); }
  };
  return (
    <div className="page-container">
      <h1>Registro de Super Administrador</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleRegister}>
        <input className="form-input" type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="form-button" type="submit">Registrar Administrador</button>
      </form>
    </div>
  );
}
export default SuperAdminPage;