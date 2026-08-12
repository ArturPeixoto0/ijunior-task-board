// src/domains/auth/auth.controller.ts
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { user } from '.prisma/client'
import { AppError } from '../../utils/AppError'

const authService = new AuthService()

export class AuthController {

  async register(req: Request, res: Response) {
    const { email, senha } = req.body
    const user = await authService.register(email, senha)
    return res.status(201).json(user)
  }


  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken
    if(!refreshToken) {
      throw new AppError('Não autorizado', 401)
    }

    const accessToken = await authService.refresh(refreshToken)

    return res.status(200).json({ accessToken })
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body
    const { refreshToken, accessToken, user } = await authService.login(email, senha)


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,     
      secure: false,     
      sameSite: 'lax',    
      maxAge: 168 * 60 * 60 * 1000,  // 7 dias
    })

    return res.status(200).json({ user, accessToken })
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken')
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  }

  
  async me(req: Request, res: Response) {
    return res.status(200).json({ usuario: req.user })
  }

}