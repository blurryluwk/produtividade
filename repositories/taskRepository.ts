import { Task, TaskPriority } from "../types/task";
import prisma from "../lib/prisma";

// Converte o tipo do retorno do Prisma para Task
function mapPrismaTaskToTask(prismaTask: any): Task {
  return {
    id: prismaTask.id,
    userId: prismaTask.userId,
    title: prismaTask.title,
    description: prismaTask.description,
    priority: prismaTask.priority as TaskPriority,
    dueDate: prismaTask.dueDate.toISOString(), // converte Date para string ISO
    category: prismaTask.category,
    status: prismaTask.status,
    xp: prismaTask.xp,
    createdAt: prismaTask.createdAt,
  };
}

// Cria uma nova tarefa
export async function createTask(task: Task): Promise<Task> {
  const newTask = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: new Date(task.dueDate),
      category: task.category,
      status: task.status,
      xp: task.xp,
      userId: task.userId,
      createdAt: task.createdAt || new Date(),
    },
  });

  return mapPrismaTaskToTask(newTask);
}

// Busca todas as tarefas de um usuário
export async function getTasksByUser(userId: number): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tasks.map(mapPrismaTaskToTask);
}

// Atualiza uma tarefa por ID
export async function updateTask(taskId: number, data: Partial<Task>): Promise<void> {
  // Se 'dueDate' estiver presente em data, converta para Date
  const dataToUpdate = {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
  };

  await prisma.task.update({
    where: { id: taskId },
    data: dataToUpdate,
  });
}

// Deleta uma tarefa por ID
export async function deleteTask(taskId: number): Promise<void> {
  await prisma.task.delete({
    where: { id: taskId },
  });
}
