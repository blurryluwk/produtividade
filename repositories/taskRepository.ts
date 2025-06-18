import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const taskRepository = {
  create: (data: any) => prisma.task.create({ data }),
  findByUser: (userId: number) =>
    prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  update: (taskId: number, data: any) =>
    prisma.task.update({ where: { id: taskId }, data }),
  delete: (taskId: number) =>
    prisma.task.delete({ where: { id: taskId } }),
};