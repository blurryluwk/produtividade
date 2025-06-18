// pages/api/tasks/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = Number(req.query.userId);

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  if (req.method === "GET") {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(tasks);
  } else if (req.method === "POST") {
    // Criação da tarefa
    const { title, description, priority, dueDate, category, status, xp, userId: bodyUserId } = req.body;

    if (!title || !dueDate || !bodyUserId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        category,
        status,
        xp,
        userId: bodyUserId,
      },
    });

    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
