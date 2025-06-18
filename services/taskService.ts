import { Task, TaskPriority } from "../types/task";
import { taskRepository } from "../repositories/taskRepository";

function mapPrismaTaskToTask(prismaTask: any): Task {
  return {
    id: prismaTask.id,
    userId: prismaTask.userId,
    title: prismaTask.title,
    description: prismaTask.description,
    priority: prismaTask.priority as TaskPriority,
    dueDate: prismaTask.dueDate.toISOString(),
    status: prismaTask.status,
    xp: prismaTask.xp,
    createdAt: prismaTask.createdAt,
  };
}

export async function createTask(task: Task): Promise<Task> {
  const newTask = await taskRepository.create({
    ...task,
    dueDate: new Date(task.dueDate),
    createdAt: task.createdAt || new Date(),
  });
  return mapPrismaTaskToTask(newTask);
}

export async function getTasksByUser(userId: number): Promise<Task[]> {
  const tasks = await taskRepository.findByUser(userId);
  return tasks.map(mapPrismaTaskToTask);
}

export async function updateTask(taskId: number, data: Partial<Task>): Promise<void> {
  await taskRepository.update(taskId, {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
  });
}

export async function deleteTask(taskId: number): Promise<void> {
  await taskRepository.delete(taskId);
}
