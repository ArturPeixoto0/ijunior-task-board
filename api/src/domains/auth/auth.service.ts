// src/domains/auth/auth.service.ts
import bcrypt from 'bcrypt'
import { prisma } from '../../config/PrismaClient'
import { generateToken } from '../../utils/token' 
import { AppError } from '../../utils/AppError'  

const SALT_ROUNDS = 10

export class AuthService {

  async register(email: string, senha: string) {
    const clienteExistente = await prisma.client.findUnique({
      where: { email },
    })

    if (clienteExistente) {
      throw new AppError('Email já cadastrado', 409)
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    const cliente = await prisma.client.create({
      data: { email, senha: senhaHash },
      select: { id: true, email: true },  // nunca retorne o hash da senha
    })

    return cliente
  }

  async login(email: string, senha: string) {
    const cliente = await prisma.client.findUnique({
      where: { email },
    })

    if (!cliente) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const senhaCorreta = await bcrypt.compare(senha, cliente.senha)

    if (!senhaCorreta) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const token = generateToken({ id: cliente.id, email: cliente.email })

    return { token, cliente: { id: cliente.id, email: cliente.email } }
  }
}