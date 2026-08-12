import type { ServiceOrderStatus } from "../types";
import { createServiceOrder } from "../services/serviceOrdersService";
import { useState } from 'react';
import axios from 'axios';
// o imput cria um CreateServiceOrderData que vai ser usado como parametro do createServiceOrder

interface refreshKey {
   refreshKey() : void,
}

export function AddServiceOrder ( {refreshKey}: refreshKey) {
    const [idClient, setIdClient] = useState<number | string> ("");
    const [device, setDevice] = useState("");
    const [issue, setIssue] = useState("");
    const [status, setStatus] = useState<ServiceOrderStatus | null>(null);
    const [carregando, setCarregando] = useState(false)

    const [textoErro, setTextoErro] = useState("");

    async function handleClick() {
        try {
            setCarregando(true);
        if(idClient === "" || device==="" || issue==="" || status===null) {
            setTextoErro("ERRO: Certifique-se de preencher todos os campos acima corretamente")
            setCarregando(false);
            return;
        } 

        const novoElemento= {
            clientId: Number(idClient),
            device: device,
            issue: issue,
            status: status
        };

        await createServiceOrder(novoElemento)

        refreshKey();

        setTextoErro("")
        setIdClient("");
        setDevice("");
        setIssue("");
        setStatus(null);

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

    if (carregando) {
      return (
         <div className="flex justify-center items-center p-8">
            <p className="text-amber-100 text-xl font-semibold animate-pulse">
               Carregando...
            </p>
         </div>
      );
   }

    return (
        <div>
            <div className="flex justify-center">
                <div className="m-2 grid grid-cols-1">
                    <input type="number"
                    value={ idClient }
                    onChange ={(e)=> setIdClient(Number(e.target.value))}
                    placeholder="ID Cliente" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <input type="text" 
                    value={ device }
                    onChange ={(e)=> setDevice(e.target.value)}
                    placeholder="Aparelho" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <input type="text" 
                    value={ issue }
                    onChange ={(e)=> setIssue(e.target.value)}
                    placeholder="Problema" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <select 
                    value={status || ""}
                    onChange={(e) => setStatus(e.target.value as ServiceOrderStatus)}
                    className="bg-amber-50 border border-black rounded-sm mb-2" >
                        <option value="" disabled>Status</option>
                        <option value = 'open'>Aberto</option>
                        <option value = 'in_progress'>Em Progresso</option>
                        <option value = 'done'>Concluído</option>
                    </select>


                    <button onClick={handleClick} 
                        className="bg-amber-100 text-black m-1 p-1 border scale-100 hover:scale-110 cursor-pointer rounded-sm place-self-center">
                        Salvar
                    </button>
                </div>
            </div>
            <h2 className="text-amber-100 flex items-center justify-center">{textoErro}</h2>
        </div>
    );
}