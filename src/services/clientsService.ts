import { api } from './api';
import type { Client, CreateClientData } from '../types';

export async function getAllClients(): Promise<Client[]> {
   const response = await api.get<Client[]>('/clients');
   return response.data;
} //"baixa" o vetor de clientes

export async function getEspecificClient(id:number): Promise<Client> {
   const response = await api.get<Client>(`/clients/${id}`);
   return response.data;
} //"baixa" o vetor de clientes

export async function createClient(data: CreateClientData): Promise<Client> {
   const response = await api.post<Client>('/clients', data);
   return response.data;
} //cria um novo cliente

export async function deleteClient(id:number): Promise<void> {
   await api.delete(`/clients/${id}`);
} //deleta um cliente