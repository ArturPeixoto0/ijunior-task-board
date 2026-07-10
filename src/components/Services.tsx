import { AddService } from './AddService'
import { List } from './List'
import { useState } from 'react'

interface Services {
        titulo: string;
        nomeCliente: string;
        aparelho: string;
        defeito: string;
    }

export function Services() {
    const [auxServices, setAuxServices] = useState<Services>({
        titulo: "",
        nomeCliente: "",
        aparelho: "",
        defeito: "",
    });
    const [servicesList, setServiceList] = useState<Services[]>([]);

    function CriaLista(T: string, NC: string, A: string, D: string): void {
        const servico: Services = {
            titulo:T,
            nomeCliente:NC,
            aparelho:A,
            defeito:D,
        };
        setServiceList((prevServiceList) => [...prevServiceList, servico]);
        //cria um novo elemento no vetor
    }

    function recebeDados(tituloAux: string,nomeClienteAux: string, aparelhoAux: string, defeitoAux: string): void {
        setAuxServices({
            titulo : tituloAux,
            nomeCliente: nomeClienteAux,
            aparelho: aparelhoAux,
            defeito: defeitoAux
        });
        CriaLista(tituloAux, nomeClienteAux, aparelhoAux, defeitoAux);
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