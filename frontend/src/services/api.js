// frontend/src/services/api.js
const API_URL = '/api/auth';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { msg: 'Error inesperado en el servidor' };
  }
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { msg: 'Error inesperado en el servidor' };
  }
};
