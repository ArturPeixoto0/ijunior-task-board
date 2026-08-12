import express from 'express';
import cors from 'cors';

import { authRoutes } from '../domains/auth/auth.routes';  
import { ordensRoutes } from '../domains/service-orders/service-orders.routes';
import { clientRoutes } from '../domains/clients/clients.routes';
import cookieParser from 'cookie-parser'


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}))

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/service-orders', ordensRoutes);
app.use('/clients', clientRoutes)


export { app };