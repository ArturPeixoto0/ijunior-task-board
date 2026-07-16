import { useEffect, useState } from 'react';
import type { ServiceOrder } from "../types";
import { getAllServiceOrders, deleteServiceOrder } from '../services/serviceOrdersService';

export const ServiceOrderList = () => {
   const [serviceOrder, setServiceOrder] = useState<ServiceOrder[]>([]);

   useEffect( () => {
      async function load() {
         console.log("1. entrei no useEffect");
         const data = await getAllServiceOrders();
         console.log("2. Dados recebidos da API: ", data);
 	 setServiceOrder(data);
      }
      load();
}, []);

async function handleDelete(id:number) {
       await deleteServiceOrder(id);
       setServiceOrder(prev => prev.filter(c => c.id !== id));
    }


    return (
       <ul>
	  {serviceOrder.map(serviceOrder => (
	      <li key={serviceOrder.id}>
		   {serviceOrder.device}
           {serviceOrder.issue}
           {serviceOrder.status}
		   <button onClick={() => handleDelete(serviceOrder.id)}>
			Excluir
		   </button>
	      </li>
           ))}
       </ul>
     );
};
