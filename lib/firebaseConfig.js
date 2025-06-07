// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHO7hEZMwqCxc49ZPTEygoxmtSuWBbJXw",
  authDomain: "produtividade-31437.firebaseapp.com",
  projectId: "produtividade-31437",
  storageBucket: "produtividade-31437.firebasestorage.app",
  messagingSenderId: "101971981056",
  appId: "1:101971981056:web:6947dd914ecf916841f9e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

