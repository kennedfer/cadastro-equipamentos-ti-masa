"use client"

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster"

import { RegisterDeviceForm } from '../../components/forms/RegisterDeviceForm'

export default function DeviceRegistrationPage() {

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/device", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.error) {
        toast({
          title: "Erro:",
          description: prismaErrorMessages[result.error.code] || "Erro inesperado.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso:",
        description: "Cadastro realizado!",
        variant: "success",
      });
      window.location.reload();
    } catch (error) {
      toast({ title: "Erro:", description: "Erro ao enviar dados.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <body>
      <main className="">
        <div className="flex flex-col items-center v-screen overflow-auto p-16 h-screen">
          <h1 className="font-bold text-2xl">Cadastro de Dispositivos</h1>
          <RegisterDeviceForm onSubmit={onSubmit} loading={loading}/>

        </div>
      </main>
      <Toaster />
    </body>

  );
}
