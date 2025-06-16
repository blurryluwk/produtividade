import { NextApiRequest, NextApiResponse } from "next";
import { addNewTask, fetchUserTasks } from "../services/taskService";

export async function handleCreateTask(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { userId, ...taskData } = req.body;

  try {
    const result = await addNewTask(userId, taskData);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar tarefa" });
  }
}

export async function handleGetTasks(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const userId = req.query.userId as string;
  try {
    const tasks = await fetchUserTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar tarefas" });
  }
}

