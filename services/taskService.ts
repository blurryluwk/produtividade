import { Task, TaskPriority } from "../types/task";
import * as taskRepo from "../repositories/taskRepository";

function calculateXP(priority: TaskPriority): number {
  switch (priority) {
    case "Alta": return 30;
    case "Média": return 20;
    case "Baixa": return 10;
  }
}

export async function addNewTask(userId: string, data: Omit<Task, "userId" | "xp" | "status" | "createdAt" | "id">): Promise<Task> {
  const task: Task = {
    ...data,
    userId,
    status: "pending",
    xp: calculateXP(data.priority),
    createdAt: new Date().toISOString(),
  };
  return taskRepo.createTask(task);
}

export async function fetchUserTasks(userId: string): Promise<Task[]> {
  return taskRepo.getTasksByUser(userId);
}

export async function editTask(taskId: string, data: Partial<Task>): Promise<void> {
  if (data.priority) {
    data.xp = calculateXP(data.priority);
  }
  await taskRepo.updateTask(taskId, data);
}

export async function removeTask(taskId: string): Promise<void> {
  await taskRepo.deleteTask(taskId);
}

export async function completeTask(taskId: string) {
  return await taskRepo.updateTask(taskId, { status: 'completed' });
}
