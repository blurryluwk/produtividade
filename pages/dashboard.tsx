import { useEffect, useState } from "react";
import { Task, TaskPriority } from "../types/task";
import ProgressBar from "../components/ProgressBar";
import "../app/globals.css";
import StarParticles from "../components/StarParticles";

// Prioridades fixas
const priorities: TaskPriority[] = ["Baixa", "Média", "Alta"];

// Funções para chamar a API
const API_BASE = "/api/tasks";

async function fetchUserTasks(userId: number): Promise<Task[]> {
  const res = await fetch(`${API_BASE}?userId=${userId}`);
  if (!res.ok) throw new Error("Falha ao buscar tarefas");
  return res.json();
}

async function addNewTask(userId: number, task: Omit<Task, "id" | "userId">) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, userId }),
  });
  if (!res.ok) throw new Error("Falha ao criar tarefa");
  return res.json();
}

async function removeTask(taskId: number) {
  const res = await fetch(`${API_BASE}/${taskId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao deletar tarefa");
}

async function completeTask(taskId: number) {
  const res = await fetch(`${API_BASE}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" }),
  });
  if (!res.ok) throw new Error("Falha ao concluir tarefa");
  return res.json();
}

// *** Componente Dashboard ***
export default function Dashboard() {
  // Simule o userId autenticado
  const userId = 1; // Aqui você pode integrar sua autenticação real

  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Baixa" as TaskPriority,
    dueDate: "",
  });

  useEffect(() => {
    fetchUserTasks(userId).then(setTasks).catch(console.error);
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleAddTask() {
    if (!form.title || !form.dueDate) return;

    const taskToAdd = {
      ...form,
      dueDate: new Date(form.dueDate).toISOString(),
      category: "geral",
      status: "pending" as const,
      xp: 10, // exemplo XP fixo
    };

    try {
      await addNewTask(userId, taskToAdd);
      const updated = await fetchUserTasks(userId);
      setTasks(updated);
      setForm({ title: "", description: "", priority: "Baixa", dueDate: "" });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(taskId: number) {
    try {
      await removeTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleComplete(taskId: number) {
    try {
      await completeTask(taskId);
      const updated = await fetchUserTasks(userId);
      setTasks(updated);
    } catch (error) {
      console.error(error);
    }
  }

  const totalXP = tasks.reduce(
    (sum, task) => (task.status === "completed" ? sum + task.xp : sum),
    0
  );

  return (
    <div id="dashboard">
      <StarParticles />
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-left">
          <section className="nova-tarefa">
            <h2>Nova Tarefa</h2>

            <label htmlFor="title">Título:</label>
            <br />
            <input
              id="title"
              className="input-title"
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="description">Descrição:</label>
            <br />
            <textarea
              id="description"
              className="input-description"
              name="description"
              placeholder="Descrição"
              value={form.description}
              onChange={handleChange}
            />
            <br />
            <br />

            <label htmlFor="priority">Prioridade:</label>
            <br />
            <select
              id="priority"
              className="input-priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label htmlFor="dueDate">Prazo:</label>
            <br />
            <input
              type="date"
              id="dueDate"
              className="input-due-date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
            <br />
            <br />

            <button
              id="btn-add-task"
              className="btn-submit"
              onClick={handleAddTask}
            >
              Adicionar
            </button>
          </section>

          <section className="minhas-tarefas">
            <h2>Minhas Tarefas</h2>

            <ul id="task-list" className="task-list">
              {tasks.map((task) => (
                <li key={task.id} id={`task-${task.id}`} className="task-item">
                  <div className="task-info">
                    <strong className="task-title">{task.title}</strong>
                    <br />
                    <span className="task-desc">{task.description}</span>
                    <br />
                    <span className="task-priority">
                      Prioridade: {task.priority}
                    </span>
                    <br />
                    <span className="task-due">
                      Prazo: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <br />
                    <span
                      className={`task-status ${
                        task.status === "completed"
                          ? "status-completed"
                          : "status-pending"
                      }`}
                    >
                      {task.status === "completed"
                        ? "✅ Concluída"
                        : "⏳ Pendente"}
                    </span>
                  </div>

                  <div className="task-actions">
                    {task.status === "pending" && (
                      <button
                        className="btn-complete"
                        id={`complete-${task.id}`}
                        onClick={() => handleComplete(task.id!)}
                      >
                        ✅ Concluir
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      id={`delete-${task.id}`}
                      onClick={() => handleDelete(task.id!)}
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="dashboard-right">
          <section id="dashboard-stats" className="dashboard-stats">
            <h2>Estatísticas</h2>

            <p id="total-tasks">
              Tarefas Concluídas: {tasks.filter((t) => t.status === "completed").length}/{tasks.length}
            </p>

            <p id="total-xp">XP Total: {totalXP}</p>

            <ProgressBar currentXP={totalXP} />
          </section>
          <img
            src="/images/bunny-image-dash.png"
            alt="Coelho astronauta"
            className="floating-image"
          />
        </div>
      </div>
    </div>
  );
}