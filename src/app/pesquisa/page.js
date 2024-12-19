"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useToast } from "@/hooks/use-toast";

export default function SearchPage() {
  const searchRef = useRef(null);
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function searchDevice() {
    const patrimonio = searchRef.current.value.trim();

    if (!patrimonio) {
      toast({
        title: "Campo vazio",
        description: "Por favor, informe um número de série válido.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setDevice(null); // Reseta o card do dispositivo

    try {
      const response = await fetch(`/api/device/${patrimonio}`);

      if (response.status == 404) {
        throw new Error("Dispositivo não encontrado");
      }

      const data = await response.json();

      if (data.error || !data) {
        toast({
          title: "Dispositivo não encontrado",
          description: "Nenhum dispositivo encontrado com o número informado.",
          variant: "destructive"
        });
        return;
      }

      setDevice(data);
    } catch (error) {
      console.error("Erro ao buscar dispositivo:", error);
      toast({
        title: "Erro na busca",
        description:
          error.message || "Ocorreu um erro ao buscar o dispositivo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid p-4 sm:p-8 md:p-16 overflow-auto h-screen">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Pesquisa de Dispositivos
        </h1>

        <Label htmlFor="busca">Número de Série para buscar:</Label>

        <Input
          ref={searchRef}
          placeholder="Ex.: 988213, 182123"
          className="w-full sm:w-[300px]"
          id="busca"
          type="text"
        />

        <LoadingButton
          loading={loading}
          onClick={searchDevice}
          label="Pesquisar"
        />

        {device && <DeviceCard device={device} />}
      </div>
    </main>
  );
}
