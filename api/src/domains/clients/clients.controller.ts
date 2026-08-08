import type { Request, Response } from 'express';
import { clientService } from './clients.service';  
import { ServiceOrderStatus } from '@prisma/client';

const client = new clientService();
export class clientController {
  async create(req: Request, res: Response) {
   try{ 
    const { name, phone, email } = req.body

    const cliente = await client.create({ name, phone, email })

     return res.status(201).json(cliente)
  } catch (error) {
     if (error instanceof Error) {
       return res.status(400).json({ erro: error.message });
    }
  }
}
  
  async list(req: Request, res: Response) {
    try {

    const { name } = req.query;

      let nameConverted: string | undefined = undefined;

      const cliente = await client.filter(nameConverted);

    return res.status(200).json(cliente);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async delete(req:Request, res:Response) {
    try {
      const { id } = req.params;

      const cliente = await client.delete(Number(id));
      
      return res.status(200).json(cliente);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async specific (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const cliente = await client.specific(Number(id));
      
      return res.status(200).json(cliente);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { phone } = req.body;

      const nameConverted = typeof name === 'string' ? name: undefined;
      const phoneConverted = typeof phone=== 'string' ? name: undefined;

      const cliente =  await client.update(Number(id), nameConverted, phoneConverted);
      
      return res.status(200).json(cliente);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ erro: error.message });
      }
    }
  }

}
