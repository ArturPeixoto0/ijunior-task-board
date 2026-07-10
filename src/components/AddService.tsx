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
    
    const [textoErro, setTextoErro] = useState("");
    const [click, setClick] = useState(0);

    function handleClick(): void {
        
        if(titulo==="" || nomeCliente==="" || aparelho==="" || defeito==="" || click===0) {
            setClick(prevClick=>prevClick+1);
            setTextoErro("Certifique-se de preencher todos os campos acima")
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
        <div>
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
            className="bg-amber-100 text-black m-1 p-1 scale-100 hover:scale-110 cursor-pointer rounded-sm object-cover self-center">
                Salvar
            </button>
            </div>
            {/* <h2 className="text-amber-100 flex items-center justify-center">Erro: {textoErro}</h2> */}
        </div>
    );
}