
import { api } from './api';
import type { ServiceOrder } from '../types';
import type { CreateServiceOrderData } from '../types'

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ServiceOrder[]>('/service-orders');
  return response.data;
} //"baixa" o vetor de ordens de serviço

export async function createServiceOrder( data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.post<ServiceOrder>('/service-orders', data);
  return response.data;
} //cria uma nova ordem de serviço

export async function deleteServiceOrder(id: number): Promise<void> {
  await api.delete(`/service-orders/${id}`);
} //deleta uma orem de serviço
