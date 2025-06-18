import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function tableUsers(nome, email, senha) {
    const db = await open({
        filename: 'db/database.db',
        driver: sqlite3.Database,
    })

    db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    level INTENGER NOT NULL,
    xp INTENGER NOT NULL
  )
`);
    }

    async function tableTasks(title, priority, due_date) {
    const db = await open({
        filename: 'db/database.db',
        driver: sqlite3.Database,
    })

    db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK (priority IN ('baixa', 'media', 'alta')) NOT NULL,
    due_date TEXT,
    status TEXT CHECK (status IN ('pendente', 'concluida')) NOT NULL DEFAULT 'pendente',
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
    }

    async function tableLevels() {
    const db = await open({
        filename: 'db/database.db',
        driver: sqlite3.Database,
    })

    db.run(`
  CREATE TABLE IF NOT EXISTS users_levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    xp INTENGER,
    level INTENGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
    }

tableUsers();
tableTasks();
tableLevels();