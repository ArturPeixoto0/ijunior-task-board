import jwt from 'jsonwebtoken'

interface TokenPayloadCreate {
  id: number   
  email: string
}

interface TokenPayloadVerify {
  id: number
  email: string
  iat: number
  exp: number
}

export function generateToken(payload: TokenPayloadCreate): string {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

export function verifyToken(token: string): TokenPayloadVerify {
  // jwt.verify lança uma exceção se o token for inválido ou expirado
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayloadVerify
  return decoded
}
