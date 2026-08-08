// src/domains/auth/auth.controller.ts
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { User } from '.prisma/client'

const authService = new AuthService()

export class AuthController {

  async register(req: Request, res: Response) {
    const { email, senha } = req.body
    const user = await authService.register(email, senha)
    return res.status(201).json(user)
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body
    const { token, user } = await authService.login(email, senha)

    // Setando o cookie httpOnly
    res.cookie('token', token, {
      httpOnly: true,     
      secure: false,     
      sameSite: 'lax',    
      maxAge: 60 * 60 * 1000,  // 1 hora em milissegundos
    })

    return res.status(200).json({ user })
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token')
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  
  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }

}