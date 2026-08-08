import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { clientController } from './clients.controller' 

const serviceRoutes = Router()
const ServiceController = new clientController()

// Todas as rotas deste router exigem autenticação
serviceRoutes.use(authMiddleware)

serviceRoutes.get('/',        ServiceController.list.bind( ServiceController))
serviceRoutes.get('/:id',     ServiceController.specific.bind( ServiceController))
serviceRoutes.post('/',       ServiceController.create.bind( ServiceController))
serviceRoutes.put('/:id',     ServiceController.update.bind( ServiceController))
serviceRoutes.delete('/:id',  ServiceController.delete.bind( ServiceController))

export { serviceRoutes }