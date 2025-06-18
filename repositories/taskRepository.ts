import { Task } from "../types/task";
import { db } from "../lib/firebaseConfig"; // supondo que exporta Firestore configurado
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export async function createTask(task: Task): Promise<Task> {
  const docRef = await addDoc(tasksCollection, task);
  return { ...task, id: docRef.id };
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
  const q = query(tasksCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
}

export async function updateTask(taskId: string, data: Partial<Task>): Promise<void> {
  const docRef = doc(tasksCollection, taskId);
  await updateDoc(docRef, data);
}

export async function deleteTask(taskId: string): Promise<void> {
  const docRef = doc(tasksCollection, taskId);
  await deleteDoc(docRef);
}
