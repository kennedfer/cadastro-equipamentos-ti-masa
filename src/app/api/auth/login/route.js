import { prisma } from "@/database/prisma";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  const { apelido, senha } = await req.json();

  const user = await prisma.usuario.findFirst({
    where: { apelido }
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "Usuário não encontrado" }), {
      status: 404
    });
  }

  if (user.senha !== senha) {
    return new Response(JSON.stringify({ error: "Senha incorreta" }), {
      status: 401
    });
  }

  // Gere o token JWT
  const token = jwt.sign(
    { id: user.id, apelido: user.apelido },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return new Response(JSON.stringify({ token }), { status: 200 });
}
