"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isButtonLoading, setButtonIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setButtonIsLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apelido: username, senha: password })
    });

    const userToken = await res.json();

    if (userToken.error) {
      alert(userToken.error);
      setButtonIsLoading(false);
    } else {
      localStorage.setItem("token", JSON.stringify(userToken));
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          setPassword={setPassword}
          setUsername={setUsername}
          isButtonLoading={isButtonLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
