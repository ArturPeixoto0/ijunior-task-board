import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext';  
import { PrivateRoute } from './routes/privateRoutes';
import { Login } from './pages/LoginPage'
import { DashBoardPage } from './pages/DashBoardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ServiceOrderPage } from './pages/ServiceOrderPage';
import { MainLayout } from './components/MainLayout'

export function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element = {<PrivateRoute />} >
        <Route element = {<MainLayout /> }>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/service-orders" element={<ServiceOrderPage />} />
          <Route path="*" element={<h1>Caminho não encontrado!</h1>} />
        </Route>
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  )
}