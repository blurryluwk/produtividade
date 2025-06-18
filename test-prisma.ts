
// test-prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Testa uma consulta simples (pode trocar por outra tabela se quiser)
    const users = await prisma.user.findMany();
    console.log("✅ Conexão com o banco funcionando!");
    console.log("Usuários encontrados:", users.length);
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
