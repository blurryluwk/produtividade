export type TaskPriority = "baixa" | "média" | "alta";

export interface Task {
  id?: string;
  userId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  category: string;
  status: "pending" | "completed";
  xp: number;
  createdAt: Date;
}