import { db } from "../lib/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Task } from "../types/task";

const tasksCollection = collection(db, "tasks");

export async function createTask(taskData: Task) {
  const docRef = await addDoc(tasksCollection, taskData);
  return { id: docRef.id };
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
  const q = query(tasksCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Task));
}
