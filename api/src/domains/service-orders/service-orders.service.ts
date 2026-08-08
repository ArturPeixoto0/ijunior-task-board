import type { ServiceOrder, ServiceOrderStatus } from "@prisma/client"; 
import { prisma } from '../../config/PrismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ICriarOrdem {
    clientId: number;
  device: string;
  issue: string;
}

export class ordensService {
  
  async create({ device, issue, clientId }: ICriarOrdem) {
    
    if (!device) {
      throw new Error("Nome do aparelho é obrigatório");
    }
    if (!issue) {
      throw new Error("Nome do problema é obrigatório");
    }
    if (!clientId) {
        throw new Error("Id do cliente é obrigatório");
    }
    
    const novaOrdem = await prisma.serviceOrder.create( { data: {device: device, issue: issue, clientId: clientId} })

    return novaOrdem;
  }

  async delete(id:number){
    try {
      await prisma.serviceOrder.delete({where: {id}});
    
      const ListaDeOrdens = await prisma.serviceOrder.findMany();
    
      return ListaDeOrdens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Ordem de serviço não encontrada.');
      }
      throw error;
    }
  }

  async specific (id:number) {
    const OrdemEspecifica = await prisma.serviceOrder.findUnique({where: {id}})
    
    if (!OrdemEspecifica){
      throw new Error(`Não existe uma ordem de serviço com o ID ${id}`);
    }
    
    return OrdemEspecifica;
  }

  async update (id:number, status: ServiceOrderStatus) {
    try {
      let OrdemAtualizada = await prisma.serviceOrder.update({where: {id}, data: {}})

      OrdemAtualizada = await prisma.serviceOrder.update({where: {id}, data: {status: status}});

      return OrdemAtualizada;
    } catch (error) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
  }  

  async filter (status?: ServiceOrderStatus) {
    if (status === undefined) {
      return await prisma.serviceOrder.findMany();
    }

    const ListaFiltrada = await prisma.serviceOrder.findMany({where: {status: status}})

    if (ListaFiltrada.length === 0) {
      throw new Error(`Não há nenhuma ordem de serviço que possua tal atributo`);
    }

    return ListaFiltrada;
    }

}
