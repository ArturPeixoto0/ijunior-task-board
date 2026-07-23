import axios from 'axios';

export const api = axios.create({
   baseURL: 'https://trainee.fidelis.workers.dev/api',
   withCredentials: false,
   headers: {
      //colamos aqui o token pessoal
      'Authorization': 'Bearer bab99411-dc39-4c1d-8901-0a2185b9910f',
      'Content-Type': 'application/json',
   },
});