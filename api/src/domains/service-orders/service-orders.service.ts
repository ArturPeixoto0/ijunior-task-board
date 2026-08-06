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
    
    const novaTarefa = await prisma.serviceOrder.create( { data: {device: device, issue: issue, clientId: clientId} })

    return novaTarefa;
  }

  async delete(id:number){
    try {
      await prisma.serviceOrder.delete({where: {id}});
    
      const ListaDeTarefas = await prisma.serviceOrder.findMany();
    
      return ListaDeTarefas;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada.');
      }
      throw error;
    }
  }

  async specific (id:number) {
    const TarefaEspecifica = await prisma.serviceOrder.findUnique({where: {id}})
    
    if (!TarefaEspecifica){
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
    
    return TarefaEspecifica;
  }

  async update (id:number, status: ServiceOrderStatus) {
    try {
      let TarefaAtualizada = await prisma.serviceOrder.update({where: {id}, data: {}})

      TarefaAtualizada = await prisma.serviceOrder.update({where: {id}, data: {status: status}});

      return TarefaAtualizada;
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
      throw new Error(`Não há nenhuma tarefa que possua tal atributo`);
    }

    return ListaFiltrada;
    }

}
