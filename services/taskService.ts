import { Task, TaskPriority } from "../types/task";
import { createTask, getTasksByUser, deleteTaskById, updateTaskStatus } from "../repositories/taskRepository";

function calculateXP(priority: TaskPriority): number {
  switch (priority) {
    case "alta": return 30;
    case "média": return 20;
    case "baixa": return 10;
  }
}

export async function addNewTask(userId: string, data: Omit<Task, "userId" | "xp" | "status" | "createdAt">) {
  const task: Task = {
    ...data,
    userId,
    status: "pending",
    xp: calculateXP(data.priority),
    createdAt: new Date()
  };
  return await createTask(task);
}

export async function fetchUserTasks(userId: string): Promise<Task[]> {
  return await getTasksByUser(userId);
}

export async function removeTask(taskId: string) {
  return await deleteTaskById(taskId);
}

export async function completeTask(taskId: string) {
  return await updateTaskStatus(taskId, "completed");
}
