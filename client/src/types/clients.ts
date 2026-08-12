export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export type CreateClientData = Omit<Client, 'id' | 'createdAt'>;