import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PageStyles.css';

function HomePage() {
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/features', label: 'Características' },
    { path: '/contact', label: 'Contacto' }
  ];

  return (
    <div className="home-page">
      <Header title="Gamified Learning" links={navLinks} />
      <section className="hero-section">
        <h2>Bienvenido a Gamified Learning</h2>
        <p>La plataforma de aprendizaje diseñada para motivarte y ayudarte a alcanzar tus metas profesionales.</p>
        <div className="hero-buttons">
          <Link className="btn primary-btn" to="/login">Iniciar Sesión</Link>
          <Link className="btn secondary-btn" to="/register">Registrarse</Link>
        </div>
      </section>
      <section className="features-section">
        <h3>Características</h3>
        <div className="features-container">
          <div className="feature-card">
            <h4>Contenido Estructurado</h4>
            <p>Accede a cursos y módulos organizados para un aprendizaje progresivo.</p>
          </div>
          <div className="feature-card">
            <h4>Gamificación</h4>
            <p>Obtén logros, insignias y puntos por cada lección completada.</p>
          </div>
          <div className="feature-card">
            <h4>Soporte Profesional</h4>
            <p>Recibe tutorías y asesorías personalizadas para maximizar tu progreso.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
