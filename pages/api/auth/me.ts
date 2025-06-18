
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreta';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        nivel: user.nivel,
        xp: user.xp,
      },
    });
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
