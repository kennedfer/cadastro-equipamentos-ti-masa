"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      apelido: username,
      senha: password
    });

    if (res.error) {
      alert("Login failed");
    } else {
      router.push("/"); // Redireciona após login
    }
  };

  return (
    <body>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </body>
  );
}
