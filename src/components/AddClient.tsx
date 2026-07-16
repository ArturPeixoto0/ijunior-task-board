import { createClient } from "../services/clientsService";
import { useState } from 'react';
import axios from 'axios';

// o imput cria um CreateServiceOrderData que vai ser usado como parametro do createServiceOrder

interface refreshKey {
   refreshKey() : void,
}

export function AddClient ( {refreshKey}: refreshKey) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    
    const [textoErro, setTextoErro] = useState("");

    async function handleClick() {
        try {
        if(name === "" || phone==="" || email==="") {
            setTextoErro("ERRO: Certifique-se de preencher todos os campos acima corretamente")
            return;
        } 

        const novoCliente= {
            name: name,
            phone: phone,
            email: email,
        };

        await createClient(novoCliente)

        refreshKey();

        setTextoErro("")
        setName("");
        setPhone("");
        setEmail("");

        } catch (error) {
            if (axios.isAxiosError(error)) {
	            console.error('Erro da API: ', error.response?.data);
	            console.error('Status: ', error.response?.status);
            } else {
                console.error('Erro inesperado: ', error);
            }
        }
    }


    return (
        <div>
            <div className="flex justify-center">
                <div className="m-2 grid grid-cols-1">
                    <input type="text"
                    value={ name }
                    onChange ={(e)=> setName(e.target.value)}
                    placeholder="Nome do Cliente" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <input type="text" 
                    value={ phone }
                    onChange ={(e)=> setPhone(e.target.value)}
                    placeholder="Número de Telefone" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

                    <input type="text" 
                    value={ email }
                    onChange ={(e)=> setEmail(e.target.value)}
                    placeholder="E-mail" 
                    className="bg-amber-50 border border-black rounded-sm mb-2" />

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

