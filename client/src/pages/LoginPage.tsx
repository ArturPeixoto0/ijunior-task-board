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
      <h1 className ="text-amber-100 flex items-center justify-center h-10">iRepair — Login</h1>
      <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="m-2 grid grid-cols-1">
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder=" Email" 
          required 
          className="bg-amber-50 border border-black rounded-sm mb-2"
        />
        <input 
          type="password" 
          value={senha} 
          onChange={e => setSenha(e.target.value)} 
          placeholder=" Senha" 
          required 
          className="bg-amber-50 border border-black rounded-sm mb-2"
        />
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </div>
        <button type="submit" disabled={carregando} className="bg-red-800 w-full p-1 border border-black rounded-lg cursor-pointer">
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      </div>
    </div>
  )
}