import { ServiceCard } from "./ServiceCard";
import { useState } from 'react';

interface recebeDadosProps {
        recebeDados(tituloEn: string, nomeClienteEn:string, aparelhoEn:string, defeitoEn:string) : void;
    }



export function AddService ({recebeDados}:recebeDadosProps) {

    const [titulo, setTitulo] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [aparelho, setAparelho] = useState("");
    const [defeito, setDefeito] = useState("");
    // const [status, setStatus] = useState("");
    const [click, setClick] = useState(0);

    function handleClick(): void {
        
        if(titulo==="" || nomeCliente==="" || aparelho==="" || defeito==="" || click===0) {
            setClick(prevClick=>prevClick+1);
            return;
        }
        setClick(prevClick=>prevClick+1); 
        recebeDados(titulo, nomeCliente, aparelho, defeito);

        <ServiceCard titulo={titulo} nomeCliente={nomeCliente} aparelho={aparelho} defeito={defeito} />

        setTitulo("");
        setNomeCliente("");
        setAparelho("");
        setDefeito("");
    }


    return (
        <div className="flex justify-center">
            <div className="m-2 grid grid-cols-1">
                <input type="text" 
                value={ titulo }
                onChange ={(e)=> setTitulo(e.target.value)}
                placeholder="Serviço" 
                className="bg-amber-50 border border-black rounded-sm mb-2" />

                <input type="text" 
                value={ nomeCliente }
                onChange ={(e)=> setNomeCliente(e.target.value)}
                placeholder="Nome do Cliente" 
                className="bg-amber-50 border border-black rounded-sm mb-2" />

                <input type="text" 
                value={ aparelho }
                onChange ={(e)=> setAparelho(e.target.value)}
                placeholder="Modelo do Aparelho" 
                className="bg-amber-50 border border-black rounded-sm mb-2" />

                <input type="text" 
                value={ defeito }
                onChange ={(e)=> setDefeito(e.target.value)}
                placeholder="Defeito" 
                className="bg-amber-50 border border-black rounded-sm" />

            </div>
            <button onClick={handleClick} 
            className="bg-amber-100 text-black p-1 rounded-sm object-cover self-center">
                Adicionar
            </button>

        </div>
    );
}