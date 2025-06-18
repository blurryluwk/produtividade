import { Task } from "./task";

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  nivel: number;
  xp: number;
  tasks?: Task[]; // Pode ser omitido caso não esteja carregado
}
