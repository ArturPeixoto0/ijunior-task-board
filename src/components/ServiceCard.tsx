import { useState } from 'react'

interface ServiceCardProps {
    titulo: string;
    status: string;
}

export function ServiceCard({ titulo, status}: ServiceCardProps) {

    const [concluida, setConcluida] = useState(false);

    function conclui (): void {
        setConcluida((prevConcluida) => !prevConcluida);
    };

    return (
        <div>
            <div className ={`m-10 rounded-md  ${concluida ? "bg-green-300" : "bg-red-800"}`}>
                <h2 className="text-black flex justify-center">{ titulo }</h2>
                <h2 className="text-gray-400">{ status }</h2>
                <button onClick={conclui}  className={`${concluida ? "bg-red-600" : "bg-green-400"}`}>Completar</button>
            </div>
        </div>
    );
}