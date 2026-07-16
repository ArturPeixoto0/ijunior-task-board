import { useEffect, useState } from 'react';
import type { ServiceOrder } from "../types";
import { getAllServiceOrders } from '../services/serviceOrdersService';
import { getEspecificClient } from '../services/clientsService';
import type { ServiceOrderStatus } from '../types'

function ClientName({id}: {id:number}) {
   const [name, setName] = useState("");

   useEffect ( () => {
      async function IdToName() {
         try {
            const dataNome = await getEspecificClient(id);
            console.log(`Dados brutos recebidos para o ID ${id}:`, dataNome);
            setName(`Nome do Cliente: ${dataNome.name}`);
         } catch (error) {
            setName("Cliente não encontrado")
         } 
      } 
      IdToName();
   }, [id]);
   return <p>{name}</p>;
}

function TipoStatus (status:ServiceOrderStatus): string {
   if (status === 'open'){
      return "Aberto";
   }
   if (status === 'in_progress'){
      return "Em Progresso";
   }
    else {
      return "Concluído";
   }  
}


export const ServicesDashBoard = () => {
   const [serviceOrder, setServiceOrder] = useState<ServiceOrder[]>([]);
   const [carregando, setCarregando] = useState(true)

   useEffect( () => {
      async function load() {
         try{
            setCarregando(true)
         console.log("1. entrei no useEffect");
         const data = await getAllServiceOrders();
         console.log("2. Dados recebidos da API: ", data);
 	      setServiceOrder(data);
         } catch {

         } finally {
            setCarregando(false);
         }
      }
      load();
      }, []);

      if (carregando) {
      return (
         <div className="flex justify-center items-center p-8">
            <p className="text-amber-100 text-xl font-semibold animate-pulse">
               Carregando ordens de serviço...
            </p>
         </div>
      );
   }

    return (
       <ul>
	  {serviceOrder.map(serviceOrder => (
	      <li key={serviceOrder.id}
         className="bg-amber-100 m-2 p-2 border border-black rounded-sm">
         <ClientName id={serviceOrder.client_id ?? serviceOrder.clientId ?? 0} />
		   <p>Aparelho: {serviceOrder.device} </p>
         <p>Problema: {serviceOrder.issue} </p>
         <p>Status: {TipoStatus(serviceOrder.status)} </p>
         <p>ID do Serviço: {serviceOrder.id} </p>
	      </li>
           ))}
       </ul>
     );
};
