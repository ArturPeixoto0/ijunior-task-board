import { Link } from 'react-router';

export function Header() {
    return (
        <header className="h-10">
            <h1 className ="text-amber-100 flex items-center justify-center h-10">iRepair</h1> 
            {/* tem que ser h-10 no h1, pois é o h do Header, assim o h1 estará verticalmente no meio */}
            <div>
                <nav>
                <Link to="/">DahBoard</Link>
                <Link to="/clients">Clientes</Link>
                <Link to="/service-orders">Ordens de Serviço</Link>
                </nav>
            </div>
        </header>
    );
}