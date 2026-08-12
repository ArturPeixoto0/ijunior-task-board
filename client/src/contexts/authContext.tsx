// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { api } from '../services/api'

interface Usuario {
  id: number
  email: string
}

interface AuthContextType {
  user: Usuario | null
  accessToken: string
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]           = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [accessToken, setAccessToken] = useState("");

  // Recupera sessão existente ao recarregar a página (o cookie ainda é válido)
  useEffect(() => {
    async function inicializarSessao() {
      try {
        const responseRefresh = await api.post('/auth/refresh')
        const novoToken = responseRefresh.data.accessToken
        
        setAccessToken(novoToken)

        const responseMe = await api.get('/auth/me')
        setUser(responseMe.data.user)

      } catch (error) {
        setAccessToken('')
      } finally {
        setIsLoading(false)
      }
    }

    inicializarSessao()
  }, [])

  async function login(email: string, senha: string) {
    const response = await api.post('/auth/login', { email, senha })

    
    const tokenRecebido = response.data.accessToken
    const usuarioRecebido = response.data.user 

    setAccessToken(tokenRecebido)
    setUser(usuarioRecebido)
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      setUser(null)
      setAccessToken('')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  return context
}