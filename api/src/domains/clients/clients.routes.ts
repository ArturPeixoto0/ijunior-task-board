import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { clientController } from './clients.controller' 

const clientRoutes = Router()
const ClientController = new clientController()

// Todas as rotas deste router exigem autenticação
clientRoutes.use(authMiddleware)

clientRoutes.get('/',        ClientController.list.bind(ClientController))
clientRoutes.get('/:id',     ClientController.specific.bind(ClientController))
clientRoutes.post('/',       ClientController.create.bind(ClientController))
clientRoutes.put('/:id',     ClientController.update.bind(ClientController))
clientRoutes.delete('/:id',  ClientController.delete.bind(ClientController))

export { clientRoutes }