// src/services/api.ts (atualizado)
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // lido do .env
  withCredentials: true,                 // envia o cookie httpOnly automaticamente
  headers: {
    'Content-Type': 'application/json',
  },

})

api.interceptors.response.use(
  response => response,
  error => {
    const isAuthMe = error.config?.url?.includes('/auth/me')
    const isLoginPage = window.location.pathname === '/login'

    if (error.response?.status === 401 && !isAuthMe && !isLoginPage) {
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)