import { useEffect, useState } from 'react';
import { getAllClients, deleteClient } from '../services/clientsService';
import type { Client } from '../types';

interface refreshKey {
   refreshKey: number;
}

export const ClientsList = ({refreshKey}:refreshKey) => {
   const [clients, setClients] = useState<Client[]>([]);

   useEffect( () => {
      async function load() {
         const data = await getAllClients();
 	 setClients(data);
      }
      load();
}, [refreshKey]);

    async function handleDelete(id:number) {
       await deleteClient(id);
       setClients(prev => prev.filter(c => c.id !== id));
       //filtra de modo que o cliente com o id não está mais incluido no vetor
    }

    return (
       <ul>
	  {clients.map(client => (
	      <li key={client.id} className="bg-amber-100 m-2 p-2 border border-black rounded-sm">
		    <p>Nome: {client.name} </p>
          <p>Telefone: {client.phone } </p>
          <p>Email: {client.email} </p>
          <p>ID: {client.id } </p>
		   <button onClick={() => handleDelete(client.id)}
            className="bg-red-600 p-1 mt-2 border border-black rounded-md cursor-pointer">
			Excluir
		   </button>
	      </li>
           ))}
       </ul>
     );
};
