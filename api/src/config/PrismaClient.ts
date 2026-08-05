import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'
import { createPool } from 'mariadb'

const pool = createPool(process.env.DATABASE_URL!)

const adapter = new PrismaMariaDb(pool as any)

export const prisma = new PrismaClient({ adapter } as any )