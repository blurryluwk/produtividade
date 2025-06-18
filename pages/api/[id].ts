import type { NextApiRequest, NextApiResponse } from "next";
import * as taskService from "../../services/taskService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const taskId = req.query.id as string;

  if (!taskId) {
    return res.status(400).json({ error: "taskId é obrigatório" });
  }

  switch (req.method) {
    case "GET":
      return res.status(200).json({ message: "Implementar get task by id" });

    case "PUT":
    case "PATCH":
      try {
        await taskService.editTask(taskId, req.body);
        return res.status(200).json({ message: "Tarefa atualizada com sucesso" });
      } catch (e) {
        return res.status(400).json({ error: "Erro ao atualizar tarefa" });
      }

    case "DELETE":
      try {
        await taskService.removeTask(taskId);
        return res.status(200).json({ message: "Tarefa removida com sucesso" });
      } catch (e) {
        return res.status(400).json({ error: "Erro ao remover tarefa" });
      }

    default:
      return res.status(405).json({ error: "Método não permitido" });
  }
}
