import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        nivel: 1,
        xp: 0,
      },
    });

    return res.status(201).json({ message: "Usuário criado com sucesso", userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
