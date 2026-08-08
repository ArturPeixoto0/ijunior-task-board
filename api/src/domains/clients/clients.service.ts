import type { Client } from "@prisma/client"; 
import { prisma } from '../../config/PrismaClient'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ICriarCliente {
  name: string;
  phone: string;
  email: string;
}

export class clientService {
  
  async create({ name, phone, email }: ICriarCliente) {
    
    if (!name) {
      throw new Error("Nome do cliente é obrigatório");
    }
    if (!phone) {
      throw new Error("Telefone do Cliente é obrigatório");
    }
    if (!email) {
        throw new Error("Email do cliente é obrigatório");
    }
    
    const novoCliente = await prisma.client.create( { data: {name: name, phone: phone, email: email} })

    return novoCliente;
  }

  async delete(id:number){
    try {
      await prisma.client.delete({where: {id}});
    
      const ListaDeClientes = await prisma.client.findMany();
    
      return ListaDeClientes;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada.');
      }
      throw error;
    }
  }

  async specific (id:number) {
    const ClienteEspecifico = await prisma.client.findUnique({where: {id}})
    
    if (!ClienteEspecifico){
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
    
    return ClienteEspecifico;
  }

  async update (id:number, name?: string, phone?: string) {
    if (name === undefined && phone === undefined) {
        throw new Error(`adicione ao menos um dos campos (nome ou telefone)`);
      }
    try {
      let ClienteAtualizado = await prisma.client.update({where: {id}, data: {}})
      if (name !== undefined) {
        ClienteAtualizado = await prisma.client.update({where: {id}, data: {name: name}});
      }
      if (phone !== undefined) {
        ClienteAtualizado = await prisma.client.update({where: {id}, data: {phone: phone}});
      }

      return ClienteAtualizado;
    } catch (error) {
      throw new Error(`Não existe uma tarefa com o ID ${id}`);
    }
  }  

  async filter (name?: string) {
      if (name === undefined) {
        return await prisma.client.findMany();
      }
  
      const ListaFiltrada = await prisma.client.findMany({where: {name: name}})
  
      if (ListaFiltrada.length === 0) {
        throw new Error(`Não há nenhuma ordem de serviço que possua tal atributo`);
      }
  
      return ListaFiltrada;
      }
  

}
