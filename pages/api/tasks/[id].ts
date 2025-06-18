// pages/api/tasks/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const taskId = Number(req.query.id);

  if (!taskId) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  if (req.method === "PUT") {
    // Atualizar tarefa (exemplo para marcar como concluída)
    const data = req.body;

    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate);
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data,
    });

    return res.status(200).json(updatedTask);
  } else if (req.method === "DELETE") {
    await prisma.task.delete({ where: { id: taskId } });
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
