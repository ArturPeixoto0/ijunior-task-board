import express from 'express';
import cors from 'cors';
import { authRoutes } from '../domains/auth/auth.routes';  
import cookieParser from 'cookie-parser'


const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use(cookieParser())

export { app };