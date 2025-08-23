// src/utility/adminAuth.js
const TOKEN_KEY = "pexdo_admin_token";

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch { return null; }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

export function isAuthenticated() {
  return !!getToken();
}

export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
