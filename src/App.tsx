import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashBoardPage } from './pages/DashBoardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ServiceOrderPage } from './pages/ServiceOrderPage';
import { MainLayout } from './components/MainLayout'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<MainLayout /> }>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/service-orders" element={<ServiceOrderPage />} />
          <Route path="*" element={<h1>Caminho não encontrado!</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}