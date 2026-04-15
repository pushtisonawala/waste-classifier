
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type ApiFetchOptions = {
  method?: string;
  body?: any;
  token?: string;
  isForm?: boolean;
};

export async function apiFetch(
  path: string,
  { method = 'GET', body, token, isForm = false }: ApiFetchOptions = {}
): Promise<any> {
  const headers: Record<string, string> = {};
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

export async function login(email: string, password: string): Promise<any> {
  return apiFetch('/auth/login', { method: 'POST', body: { email, password } });
}

export async function register(name: string, email: string, password: string): Promise<any> {
  return apiFetch('/auth/register', { method: 'POST', body: { name, email, password } });
}

export async function classifyImage(file: File, token: string): Promise<any> {
  const form = new FormData();
  form.append('image', file);
  return apiFetch('/classify', { method: 'POST', body: form, token, isForm: true });
}

export async function getStats(token: string): Promise<any> {
  return apiFetch('/stats/summary', { token });
}

export async function getActivity(token: string): Promise<any> {
  return apiFetch('/stats/history', { token });
}
