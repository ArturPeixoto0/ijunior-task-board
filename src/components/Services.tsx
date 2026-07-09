import { AddService } from './AddService'
import { List } from './List'
import { useState } from 'react'

interface Services {
        titulo: string;
        status: string;
    }

export function Services() {
    const [auxServices, setAuxServices] = useState<Services>({
        titulo: "",
        status: "",
    });
    const [servicesList, setServiceList] = useState<Services[]>([]);

    function CriaLista(T: string, S:string): void {
        const servico: Services = {
            titulo:T,
            status:S,
        };
        setServiceList((prevServiceList) => [...prevServiceList, servico]);
        //cria um novo elemento no vetor
    }

    function recebeDados(tituloAux: string, statusAux: string): void {
        setAuxServices({
            titulo : tituloAux,
            status : statusAux
        });
        CriaLista(tituloAux, statusAux);
    }


    return(
        <div>
            <AddService recebeDados={recebeDados} />

            <ul>
                <List Services= {servicesList}/>
            </ul>
        </div>
    );
}