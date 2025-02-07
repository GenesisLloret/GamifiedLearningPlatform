import React, { useState, useEffect } from 'react';
import '../styles/PageStyles.css';

function AdminTutoringPage() {
  const [tutoring, setTutoring] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [tutorData, setTutorData] = useState({ professorId: '', studentId: '' });
  const [msg, setMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      const users = await res.json();
      setProfessors(users.filter(u => u.role === 'profesor'));
      setStudents(users.filter(u => u.role === 'alumno'));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTutoring = async () => {
    try {
      const res = await fetch('/api/tutoring', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      const data = await res.json();
      setTutoring(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTutoring();
  }, []);

  const handleTutorChange = (e) => {
    setTutorData({ ...tutorData, [e.target.name]: e.target.value });
  };

  const handleAssignTutoring = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/tutoring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ professor_id: parseInt(tutorData.professorId), student_id: parseInt(tutorData.studentId) })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Tutoría asignada');
      setTutorData({ professorId: '', studentId: '' });
      fetchTutoring();
    } else {
      setMsg(data.msg || 'Error al asignar tutoría');
    }
  };

  const handleDeleteTutoring = async (id) => {
    const res = await fetch(`/api/tutoring/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    const data = await res.json();
    if (res.ok) {
      setMsg('Relación eliminada');
      fetchTutoring();
    } else {
      setMsg(data.msg || 'Error al eliminar tutoría');
    }
  };

  return (
    <div className="page-container">
      <h1>Asignar Tutorías</h1>
      {msg && <p className="error-message">{msg}</p>}
      <form className="form-container" onSubmit={handleAssignTutoring}>
        <label>
          Profesor:
          <select className="form-input" name="professorId" value={tutorData.professorId} onChange={handleTutorChange} required>
            <option value="">Seleccione...</option>
            {professors.map(p => (
              <option key={p.id} value={p.id}>{p.username}</option>
            ))}
          </select>
        </label>
        <label>
          Alumno:
          <select className="form-input" name="studentId" value={tutorData.studentId} onChange={handleTutorChange} required>
            <option value="">Seleccione...</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.username}</option>
            ))}
          </select>
        </label>
        <button className="form-button" type="submit">Asignar Tutoría</button>
      </form>
      <hr />
      <h2>Relaciones existentes</h2>
      {tutoring.length > 0 ? (
        <ul>
          {tutoring.map((t) => (
            <li key={t.id}>
              Profesor: {t.professor} - Alumno: {t.student}
              <button className="form-button" onClick={() => handleDeleteTutoring(t.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No existen relaciones de tutoría.</p>
      )}
    </div>
  );
}

export default AdminTutoringPage;
