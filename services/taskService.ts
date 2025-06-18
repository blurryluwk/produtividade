import { Task } from "../types/task";

const API_BASE = "/api/tasks";

export async function fetchUserTasks(userId: string): Promise<Task[]> {
  const res = await fetch(`${API_BASE}?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function addNewTask(userId: string, task: Omit<Task, "id" | "userId">): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, userId }),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

export async function removeTask(taskId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${taskId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function completeTask(taskId: string): Promise<Task> {
  const res = await fetch(`${API_BASE}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" }),
  });
  if (!res.ok) throw new Error("Failed to complete task");
  return res.json();
}
