import jwt from 'jsonwebtoken'
import { TokenAccessPayloadCreate, TokenRefreshPayloadCreate, TokenPayloadVerify } from '../@types/payloads'


const expiresIn = process.env.JWT_EXPIRES_IN;
const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

export function generateAccessToken (payload: TokenAccessPayloadCreate): string {
  return jwt.sign(payload, process.env.JWT_SECRET, 
    {...(expiresIn && {expiresIn})}
  )
}

export function generateRefreshToken (payload: TokenRefreshPayloadCreate): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, 
    {...(refreshExpiresIn && {expiresIn: refreshExpiresIn})}
  )
}

export function verifyAccessToken (token: string): TokenPayloadVerify {
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayloadVerify
  return decoded
}

export function verifyRefreshToken (token: string): TokenPayloadVerify {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as TokenPayloadVerify
  return decoded
}
