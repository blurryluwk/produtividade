import { db } from "../lib/firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Task } from "../types/task";

export async function createTask(task: Task) {
  await addDoc(collection(db, "tasks"), task);
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
  const q = query(collection(db, "tasks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[];
}

export async function deleteTaskById(taskId: string) {
  await deleteDoc(doc(db, "tasks", taskId));
}

export async function updateTaskStatus(taskId: string, status: "pending" | "completed") {
  await updateDoc(doc(db, "tasks", taskId), { status });
}
