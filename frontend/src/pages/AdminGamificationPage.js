import React, { useState, useEffect } from 'react';
import './PageStyles.css';
function AdminGamificationPage() {
  const [settings, setSettings] = useState({});
  const [points, setPoints] = useState('');
  const [badgeCriteria, setBadgeCriteria] = useState('');
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(false);
  const [msg, setMsg] = useState('');
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/gamification', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      const data = await response.json();
      setSettings(data);
      setPoints(data.pointsPerLesson);
      setBadgeCriteria(data.badgeCriteria);
      setLeaderboardEnabled(data.leaderboardEnabled);
    } catch (error) { console.error(error); }
  };
  useEffect(() => { fetchSettings(); }, []);
  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/gamification', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ pointsPerLesson: parseInt(points), badgeCriteria, leaderboardEnabled })
      });
      const data = await response.json();
      if (response.ok) { setMsg('Configuración actualizada'); fetchSettings(); }
      else setMsg(data.msg || 'Error al actualizar configuración');
    } catch (error) { setMsg('Error en el servidor'); }
  };
  return (
    <div className="page-container">
      <h1>Configuración de Gamificación</h1>
      {msg && <p>{msg}</p>}
      <form className="form-container" onSubmit={handleUpdate}>
        <input className="form-input" type="number" placeholder="Puntos por lección" value={points} onChange={e => setPoints(e.target.value)} required />
        <input className="form-input" type="text" placeholder="Criterios de insignias" value={badgeCriteria} onChange={e => setBadgeCriteria(e.target.value)} required />
        <label>
          <input type="checkbox" checked={leaderboardEnabled} onChange={e => setLeaderboardEnabled(e.target.checked)} />
          Habilitar tabla de clasificación
        </label>
        <button className="form-button" type="submit">Actualizar Configuración</button>
      </form>
    </div>
  );
}
export default AdminGamificationPage;