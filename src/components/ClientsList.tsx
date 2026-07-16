import { useEffect, useState } from 'react';
import { getAllClients, deleteClient } from '../services/clientsService';
import type { Client } from '../types';

export const ClientsList = () => {
   const [clients, setClients] = useState<Client[]>([]);

   useEffect( () => {
      async function load() {
         const data = await getAllClients();
 	 setClients(data);
      }
      load();
}, []);

    async function handleDelete(id:number) {
       await deleteClient(id);
       setClients(prev => prev.filter(c => c.id !== id));
       //filtra de modo que o cliente com o id não está mais incluido no vetor
    }

    return (
       <ul>
	  {clients.map(client => (
	      <li key={client.id}>
		   {client.name}
		   <button onClick={() => handleDelete(client.id)}>
			Excluir
		   </button>
	      </li>
           ))}
       </ul>
     );
};
