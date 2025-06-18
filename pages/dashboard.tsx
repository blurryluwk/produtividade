import { useEffect, useState } from "react";
import {
  fetchUserTasks,
  addNewTask,
  removeTask,
  completeTask,
} from "../services/taskService";
import { Task, TaskPriority } from "../types/task";
import { getAuth } from "firebase/auth";
import ProgressBar from "../components/ProgressBar";
import "../app/globals.css";
import StarParticles from "../components/StarParticles";

const priorities: TaskPriority[] = ["Baixa", "Média", "Alta"];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "baixa" as TaskPriority,
    dueDate: "",
  });

  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      fetchUserTasks(user.uid).then(setTasks);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleAddTask() {
    if (!form.title || !form.dueDate || !user) return;

    const task = {
      ...form,
      category: "geral",
    };

    await addNewTask(user.uid, task);
    const updated = await fetchUserTasks(user.uid);
    setTasks(updated);
    setForm({ title: "", description: "", priority: "baixa", dueDate: "" });
  }

  async function handleDelete(taskId: string) {
    await removeTask(taskId);
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  async function handleComplete(taskId: string) {
    await completeTask(taskId);
    const updated = await fetchUserTasks(user!.uid);
    setTasks(updated);
  }

  return (
    <div id="dashboard">
      <StarParticles />
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-left">
          {/* Seção: Nova Tarefa */}
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

          {/* Seção: Minhas Tarefas */}
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
                        ? "Concluída ✅"
                        : "Pendente ⏳"}
                    </span>
                  </div>

                  <div className="task-actions">
                    {task.status === "pending" && (
                      <button
                        className="btn-complete"
                        id={`complete-${task.id}`}
                        onClick={() => handleComplete(task.id!)}
                      >
                        ✔️ Concluir
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

        {/* Seção: Estatísticas */}
        <div className="dashboard-right">
          <section id="dashboard-stats" className="dashboard-stats">
            <h2>Estatísticas</h2>

            <p id="total-tasks">
              Tarefas Concluídas:{" "}
              {tasks.filter((t) => t.status === "completed").length}/
              {tasks.length}
            </p>

            <p id="total-xp">
              XP Total:{" "}
              {tasks.reduce(
                (sum, task) =>
                  task.status === "completed" ? sum + task.xp : sum,
                0
              )}
            </p>

            <ProgressBar
              currentXP={tasks.reduce(
                (sum, task) =>
                  task.status === "completed" ? sum + task.xp : sum,
                0
              )}
            />
          </section>
          <img
              src = "/images/bunny-image-dash.png"
              alt="Coelho astronauta"
              className="floating-image"
          />
        </div>
      </div>
    </div>
  );
}
