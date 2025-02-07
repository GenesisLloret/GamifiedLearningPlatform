import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

function Header({ title, links }) {
  return (
    <header className="home-header">
      <div className="logo">
        <h1>{title}</h1>
      </div>
      <nav className="main-nav">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
