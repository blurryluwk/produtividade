// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDibRpWoBMQCVh7JpRARjPD8Uo1-I-tbs0",
  authDomain: "produtividade-f8a98.firebaseapp.com",
  projectId: "produtividade-f8a98",
  storageBucket: "produtividade-f8a98.firebasestorage.app",
  messagingSenderId: "358128343887",
  appId: "1:358128343887:web:34df3c3fb7dea9ec23033a"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };
