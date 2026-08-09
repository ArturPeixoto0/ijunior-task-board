import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext' 

export function Login() {
  const [email, setEmail]           = useState('')
  const [senha, setSenha]           = useState('')
  const [erro, setErro]             = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate  = useNavigate()

  
  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // 3. Handler de envio do formulário
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      await login(email, senha)
      navigate('/')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div>
      <h1>iRepair — Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}