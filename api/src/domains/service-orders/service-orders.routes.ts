
import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { ordensController } from './service-orders.controller'

const ordensRoutes = Router()
const OrdensController = new ordensController()

// Todas as rotas deste router exigem autenticação
ordensRoutes.use(authMiddleware)

ordensRoutes.get('/',       OrdensController.list.bind(OrdensController))
ordensRoutes.get('/:id',    OrdensController.specific.bind(OrdensController))
ordensRoutes.post('/',      OrdensController.create.bind(OrdensController))
ordensRoutes.put('/:id',    OrdensController.update.bind(OrdensController))
ordensRoutes.delete('/:id', OrdensController.delete.bind(OrdensController))

export { ordensRoutes }