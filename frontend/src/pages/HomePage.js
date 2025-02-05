import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';
function HomePage() {
  return (
    <div className="page-container">
      <h1>Bienvenido a Gamified Learning</h1>
      <p>Descubre, aprende y mejora tus habilidades de forma divertida.</p>
      <div className="nav-links">
        <Link className="nav-link" to="/login">Inicio de Sesión</Link>
        <Link className="nav-link" to="/adminlogin">Administrador</Link>
      </div>
    </div>
  );
}
export default HomePage;
