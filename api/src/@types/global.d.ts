import type { Client } from '.prisma/client'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: jwt.SignOptions['expiresIn']
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }

   namespace Express {
    interface Request {
      client?: Pick<Client, 'id' | 'email'>
    }
  }
}

export {}