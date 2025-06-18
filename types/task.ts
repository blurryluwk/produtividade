export type TaskPriority = "Baixa" | "Média" | "Alta";

export interface Task {
  id?: number;
  userId: number;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  status: "pending" | "completed";
  xp: number;
  createdAt?: Date;
}
