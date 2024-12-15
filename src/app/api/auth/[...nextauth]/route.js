import { prisma } from "@/database/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        apelido: { label: "apelido", type: "text" },
        senha: { label: "senha", type: "password" }
      },
      async authorize(credentials) {
        // const user = { id: 1, name: "User", email: "user@example.com" }; // Substitua com sua lógica

        const { apelido } = credentials;

        const user = await prisma.usuario.findUnique({
          where: {
            apelido: apelido
          }
        });

        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  }
});

export { handler as GET, handler as POST };
