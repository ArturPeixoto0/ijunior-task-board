import type { Request, Response } from 'express';
import { ordensService } from './service-orders.service'; 
import { ServiceOrderStatus } from '@prisma/client';

const service = new ordensService();
export class ordensController {
  
  async create(req: Request, res: Response) {
  // req.user está disponível porque o authMiddleware rodou antes
  const usuarioId = req.client!.id

  const ordem = await service.create({
    ...req.body,
    clientId: usuarioId,
  })

  return res.status(201).json(ordem)
}
  
  async list(req: Request, res: Response) {
    try {

    const { status } = req.query;

      let statusConverted: ServiceOrderStatus | undefined = undefined;

      const ordem = await service.filter(statusConverted);

    return res.status(200).json(ordem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async delete(req:Request, res:Response) {
    try {
      const { id } = req.params;

      const ordem = await service.delete(Number(id));
      
      return res.status(200).json(ordem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async specific (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const ordem = await service.specific(Number(id));
      
      return res.status(200).json(ordem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const ordem =  await service.update(Number(id), status as ServiceOrderStatus);
      
      return res.status(200).json(ordem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

}
