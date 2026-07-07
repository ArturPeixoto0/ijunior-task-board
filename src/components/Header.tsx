export function Header() {
    return (
        <header className="h-10">
            <h1 className ="text-amber-100 flex items-center justify-center h-10">iJunior Task Board</h1> 
            {/* tem que ser h-10 no h1, pois é o h do Header, assim o h1 estará verticalmente no meio */}
        </header>
    );
}