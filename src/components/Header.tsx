import { Link, useNavigate } from 'react-router-dom';

export function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-amber-100">
            <h1 className ="text-red-800 flex items-center justify-center h-10">iRepair</h1> 
            <div className=" p-1 flex items-center justify-center">
                <nav>
                    <Link to="/" className="text-red-800 m-2">DahBoard</Link>
                    <Link to="/clients" className="text-red-800 m-2">Clientes</Link>
                    <Link to="/service-orders" className="text-red-800 m-2">Ordens de Serviço</Link>
                </nav>
                <button onClick={() => navigate(-1)} className="bg-red-800 p-1 border border-black rounded-lg cursor-pointer">Voltar</button>
            </div>
        </header>
    );
}