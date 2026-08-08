// src/domains/auth/auth.service.ts
import bcrypt from 'bcrypt'
import { prisma } from '../../config/PrismaClient'
import { generateToken } from '../../utils/token' 
import { AppError } from '../../utils/AppError'  

const SALT_ROUNDS = 10

export class AuthService {

  async register(email: string, senha: string) {
    const userExistente = await prisma.user.findUnique({
      where: { email },
    })

    if (userExistente) {
      throw new AppError('Email já cadastrado', 409)
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: { email, senha: senhaHash },
      select: { id: true, email: true },  // nunca retorne o hash da senha
    })

    return user
  }

  async login(email: string, senha: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha)

    if (!senhaCorreta) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const token = generateToken({ id: user.id, email: user.email })

    return { token, user: { id: user.id, email: user.email } }
  }
}