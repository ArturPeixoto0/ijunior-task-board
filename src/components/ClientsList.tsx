import { useEffect, useState } from 'react';
import { getAllClients, deleteClient } from '../services/clientsService';
import type { Client } from '../types';
import axios from 'axios';

interface refreshKey {
   refreshKey: number;
}

export const ClientsList = ({refreshKey}:refreshKey) => {
   const [clients, setClients] = useState<Client[]>([]);
   const [carregando, setCarregando] = useState(true)


   useEffect( () => {
      async function load() {
         try {
            setCarregando(true);
         const data = await getAllClients();
 	      setClients(data);
      } catch (error) {
            if (axios.isAxiosError(error)) {
	            console.error('Erro da API: ', error.response?.data);
	            console.error('Status: ', error.response?.status);
            } else {
                console.error('Erro inesperado: ', error);
            }
        } finally {
            setCarregando(false);
        }
   } 
      load();
}, [refreshKey]);

    async function handleDelete(id:number) {
       await deleteClient(id);
       setClients(prev => prev.filter(c => c.id !== id));
       //filtra de modo que o cliente com o id não está mais incluido no vetor
    }

    if (carregando) {
      return (
         <div className="flex justify-center items-center p-8">
            <p className="text-amber-100 text-xl font-semibold animate-pulse">
               Carregando clientes...
            </p>
         </div>
      );
   }

    return (
       <ul>
	  {clients.map(client => (
	      <li key={client.id} className="bg-amber-100 m-2 p-2 border border-black rounded-sm">
		    <p>Nome: {client.name} </p>
          <p>Telefone: {client.phone } </p>
          <p>Email: {client.email} </p>
          <p>ID do Cliente: {client.id } </p>
		   <button onClick={() => handleDelete(client.id)}
            className="bg-red-600 p-1 mt-2 border border-black rounded-md cursor-pointer">
			Excluir
		   </button>
	      </li>
           ))}
       </ul>
     );
};
