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
  async error => {
    const Request = error.config;
    const isAuthMe = error.config?.url?.includes('/auth/me');
    const isLoginPage = window.location.pathname === '/login';

    if (error.response?.status === 401 && !isAuthMe && !isLoginPage && !Request.tentativa) {
      Request.tentativa = true;

      try {
      const { data } = await api.post('/auth/refresh')
      const newAccessToken = data.accessToken
      Request.headers['Authorization'] = `Bearer ${newAccessToken}`

      return api(Request)

      } catch (refreshError) {
          window.location.href = '/login'
          return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)