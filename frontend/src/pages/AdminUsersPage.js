import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [professorUsername, setProfessorUsername] = useState('');
  const [professorPassword, setProfessorPassword] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegisterProfessor = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username: professorUsername, password: professorPassword, role: 'profesor' })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Profesor registrado correctamente');
      setProfessorUsername('');
      setProfessorPassword('');
      fetchUsers();
    } else {
      setMsg(data.msg || 'Error al registrar profesor');
    }
  };

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username: studentUsername, password: studentPassword, role: 'alumno' })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Alumno registrado correctamente');
      setStudentUsername('');
      setStudentPassword('');
      fetchUsers();
    } else {
      setMsg(data.msg || 'Error al registrar alumno');
    }
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/content', label: 'Contenido' },
    { path: '/admin/gamification', label: 'Gamificación' },
    { path: '/admin/tutoring', label: 'Tutorías' }
  ];

  return (
    <div className="admin-users-page">
      <Header title="Gamified Learning - Admin" links={navLinks} />
      <section className="dashboard-hero">
        <h2>Gestión de Usuarios</h2>
        <p>Administre los usuarios, profesores y alumnos registrados en la plataforma.</p>
      </section>
      <section className="users-form-section">
        {msg && <p className="error-message">{msg}</p>}
        <div className="form-group">
          <h3>Registrar Profesor</h3>
          <form className="form-container" onSubmit={handleRegisterProfessor}>
            <input
              className="form-input"
              type="text"
              placeholder="Nombre de Usuario"
              value={professorUsername}
              onChange={(e) => setProfessorUsername(e.target.value)}
              required
            />
            <input
              className="form-input"
              type="password"
              placeholder="Contraseña"
              value={professorPassword}
              onChange={(e) => setProfessorPassword(e.target.value)}
              required
            />
            <button className="form-button" type="submit">Registrar Profesor</button>
          </form>
        </div>
        <div className="form-group">
          <h3>Registrar Alumno</h3>
          <form className="form-container" onSubmit={handleRegisterStudent}>
            <input
              className="form-input"
              type="text"
              placeholder="Nombre de Usuario"
              value={studentUsername}
              onChange={(e) => setStudentUsername(e.target.value)}
              required
            />
            <input
              className="form-input"
              type="password"
              placeholder="Contraseña"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              required
            />
            <button className="form-button" type="submit">Registrar Alumno</button>
          </form>
        </div>
      </section>
      <section className="users-list-section">
        <h3>Usuarios Registrados</h3>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
}

export default AdminUsersPage;
