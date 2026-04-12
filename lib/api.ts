// Centralized API utility for frontend
// Uses fetch and handles JWT auth

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch(path, { method = 'GET', body, token, isForm = false } = {}) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!isForm && body && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.json()).message || 'API error');
  return res.json();
}

export async function login(email, password) {
  return apiFetch('/auth/login', { method: 'POST', body: { email, password } });
}

export async function register(name, email, password) {
  return apiFetch('/auth/register', { method: 'POST', body: { name, email, password } });
}

export async function classifyImage(file, token) {
  const form = new FormData();
  form.append('image', file);
  return apiFetch('/classify', { method: 'POST', body: form, token, isForm: true });
}

export async function getStats(token) {
  return apiFetch('/stats/summary', { token });
}

export async function getActivity(token) {
  return apiFetch('/stats/history', { token });
}
