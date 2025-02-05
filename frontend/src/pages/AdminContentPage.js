import React, { useState, useEffect } from 'react';
import './PageStyles.css';
function AdminContentPage() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');
  const fetchContent = () => {
    fetch('/api/admin/content', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error(err));
  };
  useEffect(() => { fetchContent(); }, []);
  const handleCreate = async e => {
    e.preventDefault();
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    if (res.ok) { setMsg('Contenido creado correctamente'); setTitle(''); setDescription(''); fetchContent(); }
    else setMsg(data.msg || 'Error al crear contenido');
  };
  return (
    <div className="page-container">
      <h1>Gestión de Contenido Educativo</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleCreate}>
        <input className="form-input" type="text" placeholder="Título del contenido" value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="form-input" type="text" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required />
        <button className="form-button" type="submit">Crear Contenido</button>
      </form>
      <hr />
      <ul>
        {content.map(item => (
          <li key={item.id}><strong>{item.title}</strong>: {item.description}</li>
        ))}
      </ul>
    </div>
  );
}
export default AdminContentPage;