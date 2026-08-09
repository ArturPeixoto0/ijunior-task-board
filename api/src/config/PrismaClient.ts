import 'dotenv/config'
import * as MariaDbAdapterModule from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'
import { createPool } from 'mariadb'

// Handle CJS/ESM interop and naming variances
const PrismaMariaDB =
  (MariaDbAdapterModule as any).PrismaMariaDB ||
  (MariaDbAdapterModule as any).PrismaMariaDb ||
  (MariaDbAdapterModule as any).default?.PrismaMariaDB ||
  (MariaDbAdapterModule as any).default?.PrismaMariaDb

const pool = createPool(process.env.DATABASE_URL!)
const adapter = new PrismaMariaDB(pool)

export const prisma = new PrismaClient({ adapter })