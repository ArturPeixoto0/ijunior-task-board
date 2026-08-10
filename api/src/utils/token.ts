import jwt from 'jsonwebtoken'
import { TokenPayloadCreate, TokenPayloadVerify } from '../@types/payloads'


const expiresIn = process.env.JWT_EXPIRES_IN;

export function generateToken (payload: TokenPayloadCreate): string {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    ...(expiresIn && {expiresIn})
  })
}

export function verifyToken (token: string): TokenPayloadVerify {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayloadVerify
  return decoded
}
