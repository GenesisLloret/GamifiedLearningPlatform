// frontend/src/pages/UsersPage.js (actualización)
import React, { useEffect, useState } from 'react';
import './PageStyles.css';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1>Usuarios Registrados</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados.</p>
      )}
    </div>
  );
}

export default UsersPage;
