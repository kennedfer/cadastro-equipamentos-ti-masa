"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

import { RegisterDeviceForm } from "../../components/forms/RegisterDeviceForm";
import { useRouter } from "next/navigation";
import { prismaErrorMessages } from "@/components/forms/form.config";

export default function DeviceRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async data => {
    setLoading(true);

    try {
      const response = await fetch("/api/device", {
        method: "POST",
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (result.error) {
        console.log(result.error);

        toast({
          title: "Erro:",
          description:
            prismaErrorMessages[result.error.code] || "Erro inesperado.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso:",
        description: "Cadastro realizado!",
        variant: "success"
      });

      // resetForm();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast({
        title: "Erro:",
        description: "Erro ao enviar dados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async function() {
      const localToken = localStorage.getItem("token");

      if (!localToken) {
        return router.push("/login");
      }

      const { token } = JSON.parse(localToken);

      const res = await fetch("/api/auth/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
        }
      });

      const tokenValidation = await res.json();

      if (tokenValidation.error) {
        toast({
          title: "Erro:",
          description: "Você não está logado",
          variant: "destructive"
        });

        return router.push("/login");
      }
    })();
  }, []);

  return (
    <main className="">
      <div className="flex flex-col items-center p-4 lg:p-16">
        <h1 className="font-bold text-2xl">Cadastro de Dispositivos</h1>
        <RegisterDeviceForm onSubmit={onSubmit} loading={loading} />
      </div>
    </main>
  );
}
