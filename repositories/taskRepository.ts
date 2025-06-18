import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const taskRepository = {
  create: async (data: any) => {
    return await prisma.task.create({ data });
  },

  findByUser: async (userId: number) => {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  update: async (taskId: number, data: any) => {
    return await prisma.task.update({
      where: { id: taskId },
      data,
    });
  },

  delete: async (taskId: number) => {
    return await prisma.task.delete({
      where: { id: taskId },
    });
  },
};
