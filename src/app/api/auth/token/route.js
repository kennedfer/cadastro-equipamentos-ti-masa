import jwt from "jsonwebtoken";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Token não fornecido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({ message: "Rota protegida acessada!", user: decoded }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Token inválido" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
