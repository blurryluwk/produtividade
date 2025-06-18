# 📋 Sistema de Tarefas com Ganho de XP

Este projeto é uma aplicação web que consiste em uma rotina de produtividade. O usuário pode cadastrar tarefas com suas respectivas prioridades (baixa, média ou alta), exclui-las ou marcar como concluídas e ganhar pontos de experiência (XP) a cada tarefa finalizada. O sistema inclui funcionalidades de autenticação (login e cadastro) e permite o gerenciamento completo de tarefas, podendo assim subir de nível de acordo com o XP ganho à medida que as tarefas são concluídas.

---

## 🚀 Funcionalidades Principais

- ✅ **Login e Cadastro de Usuário**
  - Cadastro de email
  - Cadastro de senha
  - Relacionamento com Banco de Dados para autenticação
- ✅ **Adição de Tarefas com:**
  - Título
  - Descrição
  - Prioridade (Baixa, Média, Alta)
- ✅ **Conclusão de Tarefas para Ganhar XP**
- ✅ **Interface Responsiva e Intuitiva**

---

## 🛠️ Tecnologias Utilizadas

- **Frontend** – HTML5, CSS3, JavaScript e TypeScript
- **Backend** – Node.js
- **Banco de Dados** – MySQL via Prisma ORM
- **ORM** – Prisma

---

## 🎮 Como Funciona a Gamificação?

- O usuário se cadastra ou entra no sistema e cadastra a tarefa de acordo com sua prioridade. Ao concluir uma tarefa, o usuário ganha uma quantidade de **XP** baseada na prioridade da tarefa:
  - 🟢 **Baixa:** +10 XP
  - 🟡 **Média:** +20 XP
  - 🔴 **Alta:** +30 XP
- O progresso de XP é exibido na seção lateral de "Estatísticas", ao lado do nível do usuário, incentivando-o a completar mais tarefas.

---

## 🖥️ Pré-requisitos

Antes de executar o projeto, garante que tenha:
- Node.js instalado [(clique para baixar)](https://nodejs.org/)
- npm ou yarn
- Ter o MySQL rodando (pode usar o XAMPP)
- Prisma CLI instalado

---

## ▶️ Como Executar o Projeto Localmente

### 1. Clone o repositório:
```bash
git clone https://github.com/blurryluwk/produtividade
```
### 2. Instalar as dependências:
```bash
npm install
```
### 3. Configure o Banco de Dados:
- Crie um BD no MySQL
- Atualize a variável ```DATABASE_URL``` no arquivo ```.env``` com as credenciais de acesso
### 4. Rode as migrações do Prisma:
```bash
npx prisma migrate dev
```
### 5. Execute o projeto:
```bash
npm run dev
```
### 6. Acesse no navegador:
```http://localhost:3000```