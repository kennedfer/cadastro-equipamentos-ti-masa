"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsButtonLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apelido: username, senha: password })
      });

      const userToken = await res.json();

      if (!res.ok || userToken.error) {
        toast({
          title: "Erro no Login",
          description: userToken.error || "Credenciais inválidas.",
          variant: "destructive"
        });
        return;
      }

      localStorage.setItem("token", JSON.stringify(userToken));

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
        variant: "success"
      });

      router.push("/");
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um problema ao tentar logar. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsButtonLoading(false);
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
        <Toaster />
      </div>
    </div>
  );
}
