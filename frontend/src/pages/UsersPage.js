import React, { useEffect, useState } from 'react';
import './PageStyles.css';
function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="page-container">
      <h1>Usuarios Registrados</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      ) : <p>No hay usuarios registrados.</p>}
    </div>
  );
}
export default UsersPage;
