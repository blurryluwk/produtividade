import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = Number(req.query.userId);
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description, priority, dueDate, status, xp, userId } = req.body;

    if (!title || !dueDate || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        status,
        xp,
        userId: Number(userId),
      },
    });

    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
