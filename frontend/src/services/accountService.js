import { request } from './api'

const BASE = '/api/accounts'
const ACCOUNT_API_BASE_URL = import.meta.env.VITE_ACCOUNT_API_BASE_URL ?? '';

export const register = (payload) =>
  request(`${ACCOUNT_API_BASE_URL}${BASE}/register/`, { method: 'POST', body: payload, auth: false })

export const login = (email, password) =>
  request(`${ACCOUNT_API_BASE_URL}${BASE}/login/`, { method: 'POST', body: { email, password }, auth: false })

export const logout = () =>
  request(`${ACCOUNT_API_BASE_URL}${BASE}/logout/`, { method: 'POST', auth: false })

export const getMe = () => request(`${ACCOUNT_API_BASE_URL}${BASE}/me/`)