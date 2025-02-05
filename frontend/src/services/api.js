const API_URL = '/api/auth';
export const registerUser = async userData => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { msg: 'Error inesperado en el servidor' }; }
};
export const loginUser = async userData => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { msg: 'Error inesperado en el servidor' }; }
};