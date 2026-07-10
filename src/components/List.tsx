import { ServiceCard } from './ServiceCard'

interface Services {
        titulo: string;
        nomeCliente: string;
        aparelho: string;
        defeito: string;
    }

interface ListProps {
    Services: Services[];
}

export function List({Services}: ListProps) {
    return(
        <div>
            <ul>
                {Services.map((item, index) => {
                    return (
                        <li key={index}>
                            <ServiceCard titulo={item.titulo} 
                                        nomeCliente={item.nomeCliente} 
                                        aparelho={item.aparelho} 
                                        defeito={item.defeito} />
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}