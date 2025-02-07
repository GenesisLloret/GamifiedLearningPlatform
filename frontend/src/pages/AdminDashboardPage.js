import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function AdminDashboardPage() {
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/admin/users', label: 'Usuarios' },
    { path: '/admin/content', label: 'Contenido' },
    { path: '/admin/gamification', label: 'Gamificación' },
    { path: '/admin/tutoring', label: 'Tutorías' }
  ];

  return (
    <div className="admin-dashboard-page">
      <Header title="Gamified Learning - Admin" links={navLinks} />
      <section className="dashboard-hero">
        <h2>Bienvenido al Panel de Administración</h2>
        <p>Gestiona la plataforma, revisa estadísticas y administra el contenido.</p>
      </section>
      <section className="dashboard-cards">
        <div className="card">
          <h3>Gestión de Usuarios</h3>
          <p>Administra el registro y la gestión de usuarios, profesores y alumnos.</p>
          <Link className="btn" to="/admin/users">Ver Usuarios</Link>
        </div>
        <div className="card">
          <h3>Gestión de Contenido</h3>
          <p>Crea y edita el contenido educativo disponible para los estudiantes.</p>
          <Link className="btn" to="/admin/content">Ver Contenido</Link>
        </div>
        <div className="card">
          <h3>Gamificación</h3>
          <p>Configura la gamificación para incentivar el aprendizaje.</p>
          <Link className="btn" to="/admin/gamification">Configurar</Link>
        </div>
        <div className="card">
          <h3>Tutorías</h3>
          <p>Asigna y gestiona relaciones de tutoría entre profesores y alumnos.</p>
          <Link className="btn" to="/admin/tutoring">Gestionar Tutorías</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AdminDashboardPage;
