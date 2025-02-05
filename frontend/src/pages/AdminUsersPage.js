import React, { useState, useEffect } from 'react';
import './PageStyles.css';
function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [professorUsername, setProfessorUsername] = useState('');
  const [professorPassword, setProfessorPassword] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [msg, setMsg] = useState('');
  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    const data = await res.json();
    setUsers(data);
  };
  useEffect(() => { fetchUsers(); }, []);
  const handleRegisterProfessor = async e => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ username: professorUsername, password: professorPassword, role: 'profesor' })
    });
    const data = await res.json();
    if (res.ok) { setMsg('Profesor registrado'); setProfessorUsername(''); setProfessorPassword(''); fetchUsers(); }
    else setMsg(data.msg || 'Error al registrar profesor');
  };
  const handleRegisterStudent = async e => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ username: studentUsername, password: studentPassword, role: 'alumno' })
    });
    const data = await res.json();
    if (res.ok) { setMsg('Alumno registrado'); setStudentUsername(''); setStudentPassword(''); fetchUsers(); }
    else setMsg(data.msg || 'Error al registrar alumno');
  };
  return (
    <div className="page-container">
      <h1>Gestión de Usuarios</h1>
      {msg && <p>{msg}</p>}
      <div className="form-container">
        <h2>Registrar Profesor</h2>
        <form onSubmit={handleRegisterProfessor}>
          <input className="form-input" type="text" placeholder="Profesor: Usuario" value={professorUsername} onChange={e => setProfessorUsername(e.target.value)} required />
          <input className="form-input" type="password" placeholder="Profesor: Contraseña" value={professorPassword} onChange={e => setProfessorPassword(e.target.value)} required />
          <button className="form-button" type="submit">Registrar Profesor</button>
        </form>
      </div>
      <div className="form-container" style={{ marginTop: '2rem' }}>
        <h2>Registrar Alumno</h2>
        <form onSubmit={handleRegisterStudent}>
          <input className="form-input" type="text" placeholder="Alumno: Usuario" value={studentUsername} onChange={e => setStudentUsername(e.target.value)} required />
          <input className="form-input" type="password" placeholder="Alumno: Contraseña" value={studentPassword} onChange={e => setStudentPassword(e.target.value)} required />
          <button className="form-button" type="submit">Registrar Alumno</button>
        </form>
      </div>
      <hr />
      <h2>Usuarios Registrados</h2>
      {users.length > 0 ? (
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.username} - {u.role} - {u.status}</li>
          ))}
        </ul>
      ) : <p>No hay usuarios registrados.</p>}
    </div>
  );
}
export default AdminUsersPage;