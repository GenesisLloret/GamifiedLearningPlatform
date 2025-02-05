import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';
function AdminDashboardPage() {
  return (
    <div className="page-container">
      <h1>Dashboard del Administrador</h1>
      <nav className="nav-links">
        <Link className="nav-link" to="/admin/users">Gestión de Usuarios</Link>
        <Link className="nav-link" to="/admin/content">Gestión de Contenido</Link>
        <Link className="nav-link" to="/admin/gamification">Configuración de Gamificación</Link>
        <Link className="nav-link" to="/admin/tutoring">Asignar Tutorías</Link>
      </nav>
    </div>
  );
}
export default AdminDashboardPage;
