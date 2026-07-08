import { Header } from './components/Header'
import { ServiceCard } from './components/ServiceCard'

export function App() {
  return (
    <div>
      <Header />
      <main>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <ServiceCard titulo="teste" status="teste" />
      </main>
    </div>
  )
}