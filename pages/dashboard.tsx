import { useEffect, useState } from "react";
import { fetchUserTasks, addNewTask, removeTask, completeTask } from "../services/taskService";
import { Task } from "../types/task";
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      fetchUserTasks(user.uid).then(setTasks);
    }
  }, [user]);

  async function handleAddTask() {
    if (!newTitle || !user) return;
    const task = {
      title: newTitle,
      description: "",
      priority: "baixa" as const,
      dueDate: new Date().toISOString(),
      category: "geral"
    };

    await addNewTask(user.uid, task);
    const updated = await fetchUserTasks(user.uid);
    setTasks(updated);
    setNewTitle("");
  }

  async function handleDelete(taskId: string) {
    await removeTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  }

  async function handleComplete(taskId: string) {
    await completeTask(taskId);
    const updated = await fetchUserTasks(user!.uid);
    setTasks(updated);
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <input
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={handleAddTask}>Adicionar</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> ({task.status})
            <button onClick={() => handleComplete(task.id!)}>✔️</button>
            <button onClick={() => handleDelete(task.id!)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
