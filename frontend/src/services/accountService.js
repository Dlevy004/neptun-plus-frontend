import { request } from './api'

const BASE = '/api/accounts'

export const register = (payload) =>
  request(`${BASE}/register/`, { method: 'POST', body: payload, auth: false })

export const login = (email, password) =>
  request(`${BASE}/login/`, { method: 'POST', body: { email, password }, auth: false })

export const logout = () =>
  request(`${BASE}/logout/`, { method: 'POST', auth: false })

export const getMe = () => request(`${BASE}/me/`)