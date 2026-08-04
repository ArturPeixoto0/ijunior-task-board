import type { Client } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
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