import type { NextApiRequest, NextApiResponse } from "next";
import * as taskService from "../../services/taskService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "userId é obrigatório" });
  }

  switch (req.method) {
    case "GET":
      const tasks = await taskService.fetchUserTasks(userId);
      return res.status(200).json(tasks);

    case "POST":
      try {
        const taskData = req.body;
        const newTask = await taskService.addNewTask(userId, taskData);
        return res.status(201).json(newTask);
      } catch (e) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

    default:
      return res.status(405).json({ error: "Método não permitido" });
  }
}
