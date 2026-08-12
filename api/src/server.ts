import 'dotenv/config' 
import { app } from './config/expressConfig'
import cors from 'cors'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido nas variáveis de ambiente')
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definido nas variáveis de ambiente')
}

app.use(cors());
const PORTA: number = Number(process.env.PORT);

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});