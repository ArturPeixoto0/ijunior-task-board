import { useState } from 'react'

interface ServiceCardProps {
    titulo: string;
    nomeCliente: string;
    aparelho: string;
    defeito: string;
    // status: string;
}

export function ServiceCard({ titulo, nomeCliente, aparelho, defeito}: ServiceCardProps) {

    const [concluida, setConcluida] = useState(false);
    const [escritoBtn, setEscritoBtn] = useState("Concluir Serviço")
    const [status, setStatus] = useState("Em andamento");

    function conclui (): void {
        const proxConcluída: boolean = !concluida
        setConcluida(proxConcluída);

        if(proxConcluída === true){
            setStatus("Concluída");
            setEscritoBtn("Reabrir Serviço");
        }
        else if (proxConcluída === false) {
            setStatus("Em andamento");
            setEscritoBtn("Concluir Serviço");
        }
    };

    return (
        <div>
            <div className ={`m-10 rounded-md p-3 ${concluida ? "bg-green-300" : "bg-red-800"}`}>
                <h2 className="text-black flex justify-center">{ titulo }</h2>
                <div className="text-blue-50 ml-2">
                    <h2>{nomeCliente}</h2>
                    <h2>{aparelho}</h2>
                    <h2>{defeito}</h2>
                </div>
                <h2 className="text-gray-400 ml-5">{ status }</h2>
                <button onClick={conclui}  className={`m-2 p-1 rounded-lg border border-black place-content-center ${concluida ? "bg-red-600" : "bg-green-400"}`}>{escritoBtn}</button>
            </div>
        </div>
    );
}