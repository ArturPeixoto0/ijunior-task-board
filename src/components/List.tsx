import { ServiceCard } from './ServiceCard'

interface Services {
        titulo: string;
        status: string;
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
                            <ServiceCard titulo={item.titulo} status={item.status}/>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    );
}