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
            setTextoErro("ERRO: Certifique-se de preencher todos os campos acima")
            return;
        }
        setClick(prevClick=>prevClick+1); 
        recebeDados(titulo, nomeCliente, aparelho, defeito);

        <ServiceCard titulo={titulo} nomeCliente={nomeCliente} aparelho={aparelho} defeito={defeito} />

        setTextoErro("")
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
                    className="bg-amber-50 border border-black rounded-sm mb-4" />


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