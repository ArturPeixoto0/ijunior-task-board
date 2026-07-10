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
            setStatus("Concluído");
            setEscritoBtn("Reabrir Serviço");
        }
        else if (proxConcluída === false) {
            setStatus("Em aberto");
            setEscritoBtn("Concluir Serviço");
        }
    };

    return (
        <div>
            <div className ={`m-10 rounded-md p-3 ${concluida ? "bg-gray-900" : "bg-green-300"}`}>
                <h2 className={`flex justify-center ${concluida ? "text-white":"text-black"}`}>{ titulo }</h2>
                <div className={`ml-2 ${concluida ? "text-white":"text-black"}`}>
                    <h2>Nome do Cliente: {nomeCliente}</h2>
                    <h2>Aparelho: {aparelho}</h2>
                    <h2>Defeito: {defeito}</h2>
                </div>
                <div className ="m-3 flex place-content-between">
                <h2 className={`text-2xl  ${concluida ? "text-green-600 [-webkit-text-stroke:0.2px_white]":"text-red-700 [-webkit-text-stroke:0.2px_black]"}`}>{ status }</h2>
                <button onClick={conclui}  className={`p-1 rounded-lg border border-black place-content-center ${concluida ? "bg-red-600" : "bg-green-600"}`}>{escritoBtn}</button>
                </div>
            </div>
        </div>
    );
}