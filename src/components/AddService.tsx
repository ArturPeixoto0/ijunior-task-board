import { ServiceCard } from "./ServiceCard";
import { useState } from 'react';

interface recebeDadosProps {
        recebeDados(tituloEn: string, statusEn: string) : void;
    }



export function AddService ({recebeDados}:recebeDadosProps) {

    const [titulo, setTitulo] = useState("");
    const [status, setStatus] = useState("");
    const [click, setClick] = useState(0);

    function handleClick(): void {
        
        if(titulo==="" || status==="" || click===0) {
            setClick(prevClick=>prevClick+1);
            return;
        }
        setClick(prevClick=>prevClick+1); 
        recebeDados(titulo, status);

        <ServiceCard titulo={titulo} status = {status} />

        setTitulo("");
        setStatus("");
    }


    return (
        <div className="flex justify-center">
            <div className="m-2 grid grid-cols-1">
                <input type="text" 
                value={ titulo }
                onChange ={(e)=> setTitulo(e.target.value)}
                placeholder="Novo Serviço" 
                className="bg-amber-50 border border-black rounded-sm mb-2" />

                <input type="text" 
                value={ status }
                onChange ={(e)=> setStatus(e.target.value)}
                placeholder="Status" 
                className="bg-amber-50 border border-black rounded-sm" />
            </div>
            <button onClick={handleClick} 
            className="bg-amber-100 text-black p-1 rounded-sm object-cover self-center">
                Adicionar
            </button>

        </div>
    );
}