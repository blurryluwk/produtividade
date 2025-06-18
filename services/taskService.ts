import { Task, TaskPriority } from "../types/task";
import { taskRepository } from "../repositories/taskRepository";

// Utilitário para mapear task do Prisma para Task do frontend
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

export const taskService = {
  async create(task: Task): Promise<Task> {
    const newTask = await taskRepository.create({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: new Date(task.dueDate),
      status: task.status,
      xp: task.xp,
      userId: task.userId,
      createdAt: task.createdAt || new Date(),
    });

    return mapPrismaTaskToTask(newTask);
  },

  async getByUser(userId: number): Promise<Task[]> {
    const tasks = await taskRepository.findByUser(userId);
    return tasks.map(mapPrismaTaskToTask);
  },

  async update(taskId: number, data: Partial<Task>): Promise<void> {
    const dataToUpdate = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };

    await taskRepository.update(taskId, dataToUpdate);
  },

  async delete(taskId: number): Promise<void> {
    await taskRepository.delete(taskId);
  },
};
